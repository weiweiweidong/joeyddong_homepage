import { spawnSync, execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  access,
  cp,
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const homepage = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const args = process.argv.slice(2);
if (args.length !== 2 || args[0] !== "--source") {
  console.error("Usage: npm run nook:sync -- --source ../home_simulator");
  process.exit(1);
}
const source = path.resolve(process.cwd(), args[1]);
const parent = path.join(homepage, "public/demos");
const target = path.join(parent, "nook");
let stage;
let backup;
let installed = false;
try {
  if (source === homepage || source.startsWith(target + path.sep))
    throw new Error("Choose the separate Nook source repository.");
  for (const file of [
    "package.json",
    "docs/EMBEDDING.md",
    "src/app/embed/protocol.ts",
    "src/app/i18n/i18n.service.ts",
    "examples/host.js",
  ]) {
    await access(path.join(source, file));
  }
  const pkg = JSON.parse(
    await readFile(path.join(source, "package.json"), "utf8"),
  );
  for (const script of ["check", "test", "build"]) {
    if (typeof pkg.scripts?.[script] !== "string")
      throw new Error(`Missing Nook npm script: ${script}`);
  }
  try {
    await access(path.join(source, "node_modules/.bin/ng"));
  } catch {
    throw new Error(
      `Install Nook dependencies first: cd "${source}" && npm ci`,
    );
  }
  const sourceCommit = execFileSync(
    "git",
    ["-C", source, "rev-parse", "HEAD"],
    { encoding: "utf8" },
  ).trim();
  const sourceDirty = !!execFileSync(
    "git",
    ["-C", source, "status", "--porcelain"],
    { encoding: "utf8" },
  ).trim();
  for (const script of ["check", "test", "build"]) {
    const result = spawnSync("npm", ["run", script], {
      cwd: source,
      stdio: "inherit",
    });
    if (result.error || result.status !== 0)
      throw new Error(
        `Nook ${script} failed; existing homepage bundle was kept.`,
      );
  }
  const output = path.join(source, "dist/nook/browser");
  const index = await readFile(path.join(output, "index.html"), "utf8");
  if (!/<base\s+href=["']\.\/["']/.test(index))
    throw new Error('Nook must retain its relative base href="./".');
  await access(path.join(source, "dist/nook/3rdpartylicenses.txt"));
  await mkdir(parent, { recursive: true });
  // Only script-created staging/backup paths and this fixed destination are replaced.
  stage = await mkdtemp(path.join(parent, ".nook-stage-"));
  await cp(output, stage, { recursive: true });
  await cp(
    path.join(source, "dist/nook/3rdpartylicenses.txt"),
    path.join(stage, "3rdpartylicenses.txt"),
  );
  const files = {};
  async function hashFiles(dir, prefix = "") {
    for (const entry of (await readdir(dir, { withFileTypes: true })).sort(
      (a, b) => a.name.localeCompare(b.name, "en"),
    )) {
      const full = path.join(dir, entry.name);
      const name = prefix + entry.name;
      if (entry.isSymbolicLink())
        throw new Error(`Unexpected symlink in build: ${name}`);
      if (entry.isDirectory()) await hashFiles(full, name + "/");
      else
        files[name] = createHash("sha256")
          .update(await readFile(full))
          .digest("hex");
    }
  }
  await hashFiles(stage);
  const manifest = {
    repository: "https://github.com/weiweiweidong/home_simulator",
    sourceCommit,
    sourceDirty,
    bundleSha256: createHash("sha256")
      .update(JSON.stringify(files))
      .digest("hex"),
    files,
  };
  await writeFile(
    path.join(stage, "source-manifest.json"),
    JSON.stringify(manifest, null, 2) + "\n",
  );
  try {
    const existing = await lstat(target);
    if (!existing.isDirectory() || existing.isSymbolicLink())
      throw new Error("Nook destination must be a regular directory.");
    backup = path.join(parent, `.nook-backup-${process.pid}`);
    await rename(target, backup);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  try {
    await rename(stage, target);
    stage = undefined;
    installed = true;
  } catch (error) {
    if (backup) {
      await rename(backup, target);
      backup = undefined;
    }
    throw error;
  }
  if (backup) {
    await rm(backup, { recursive: true });
    backup = undefined;
  }
  console.log(
    `Nook synchronized: ${Object.keys(files).length} files, source ${sourceCommit}${sourceDirty ? " (working tree changes included)" : ""}.`,
  );
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  if (stage) await rm(stage, { recursive: true, force: true });
  if (backup && installed) await rm(backup, { recursive: true, force: true });
}
