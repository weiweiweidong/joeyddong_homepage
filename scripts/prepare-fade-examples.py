"""Generate static examples with fade_py's original inputs (no resizing).

Run using the fade_py demo environment:
  PYTHONDONTWRITEBYTECODE=1 /path/to/fade_py/.venv/bin/python \
    scripts/prepare-fade-examples.py --source /path/to/fade_py
"""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import sys
import warnings

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--source", type=Path, required=True)
args = parser.parse_args()
source = args.source.resolve()
root = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(source / "src"))
import numpy as np
from PIL import Image
from fade import fade_with_map

commit = subprocess.check_output(["git", "-C", str(source), "rev-parse", "HEAD"], text=True).strip()
if subprocess.check_output(["git", "-C", str(source), "status", "--porcelain"], text=True).strip():
    raise SystemExit("Use a clean fade_py checkout so the source commit identifies the computation.")
inputs = [("test_image1.png", 0.9113), ("test_image2.JPG", 2.7122), ("test_image3.jpg", 5.7674)]
computed = []
for filename, expected in inputs:
    path = source / "test_image" / filename
    with Image.open(path) as image:
        rgb = np.array(image.convert("RGB"))
    with warnings.catch_warnings():
        warnings.simplefilter("ignore", RuntimeWarning)
        score, density = fade_with_map(rgb)
    if not np.isfinite(score) or round(score, 4) != expected:
        raise SystemExit(f"Unexpected score for {filename}: {score}")
    assert density.shape == (rgb.shape[0] // 8, rgb.shape[1] // 8)
    computed.append((path, rgb, score, density))

maximum = float(max(np.max(density[np.isfinite(density)]) for _, _, _, density in computed))
output = root / "public/images/fade-py"
output.mkdir(parents=True, exist_ok=True)
examples = []
for index, (path, rgb, score, density) in enumerate(computed, 1):
    original_name = f"sample-{index}{path.suffix.lower()}"
    map_name = f"density-{index}.png"
    shutil.copyfile(path, output / original_name)
    valid = np.isfinite(density)
    # Each pixel corresponds to one 8x8 patch. All examples share this scale.
    gray = np.rint(np.clip(np.where(valid, density, 0) / maximum, 0, 1) * 255).astype(np.uint8)
    pixels = np.repeat(gray[:, :, None], 3, axis=2)
    pixels[~valid] = [207, 76, 147]
    Image.fromarray(pixels).save(output / map_name, optimize=True)
    examples.append({
        "id": f"sample-{index}", "sourceFile": path.name,
        "original": f"/images/fade-py/{original_name}",
        "map": f"/images/fade-py/{map_name}", "score": score,
        "width": int(rgb.shape[1]), "height": int(rgb.shape[0]),
        "mapWidth": int(density.shape[1]), "mapHeight": int(density.shape[0]),
        "invalidPatches": int(np.count_nonzero(~valid)),
        "sourceSha256": hashlib.sha256(path.read_bytes()).hexdigest(),
        "mapSha256": hashlib.sha256((output / map_name).read_bytes()).hexdigest(),
    })
manifest = {"sourceCommit": commit, "scaleMin": 0, "scaleMax": maximum,
            "invalidColor": "#cf4c93", "examples": examples}
(root / "src/lib/fade-examples.json").write_text(json.dumps(manifest, indent=2) + "\n")
print(json.dumps(manifest, indent=2))
