import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import sources from '../src/lib/photography-sources.json' with { type: 'json' };

const root = path.resolve(import.meta.dirname, '..');
const output = path.join(root, 'public/images/photography');
const manifestPath = path.join(root, 'src/lib/photography-assets.json');
const widths = [320, 640, 960];
const processing = 'oss-webp-quality75-v1';
await fs.mkdir(output, { recursive: true });
const prior = await fs.readFile(manifestPath, 'utf8').then(JSON.parse).catch(() => []);
const assets = new Array(sources.filenames.length);
let cursor = 0;
let generated = 0;
let reused = 0;

async function inspect(bytes, width) {
  const metadata = await sharp(bytes).metadata();
  if (metadata.format !== 'webp' || metadata.width !== width || !metadata.height) {
    throw new Error(`Expected a ${width}px WebP, received ${metadata.format} ${metadata.width}×${metadata.height}`);
  }
  // Decode the complete file so a valid header alone cannot pass validation.
  await sharp(bytes).stats();
  return { width: metadata.width, height: metadata.height, bytes: bytes.length };
}

async function download(original, width) {
  const url = new URL(original);
  url.searchParams.set('x-oss-process', `image/resize,w_${width},limit_1/format,webp/quality,Q_75`);
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      if (!response.headers.get('content-type')?.includes('image/webp')) throw new Error('Non-WebP response');
      const bytes = Buffer.from(await response.arrayBuffer());
      await inspect(bytes, width);
      return bytes;
    } catch (error) {
      if (attempt === 2) throw new Error(`Photo ${original}, ${width}px: ${error.message}`);
      await new Promise(resolve => setTimeout(resolve, 500 * (attempt + 1)));
    }
  }
}

async function prepare(index) {
  const id = index + 1;
  const original = sources.baseUrl + sources.filenames[index];
  const old = prior.find(photo => photo.id === id);
  const variants = {};
  for (const width of widths) {
    const file = `${id}-${width}.webp`;
    const target = path.join(output, file);
    let metadata;
    if (old?.original === original && old.processing === processing) {
      try { metadata = await inspect(await fs.readFile(target), width); } catch { /* Regenerate invalid or absent files. */ }
    }
    if (metadata) {
      reused++;
    } else {
      const bytes = await download(original, width);
      metadata = await inspect(bytes, width);
      // Only fully validated images replace the destination.
      const temporary = `${target}.tmp`;
      await fs.writeFile(temporary, bytes);
      await fs.rename(temporary, target);
      generated++;
    }
    variants[width] = { src: `/images/photography/${file}`, ...metadata };
  }
  assets[index] = { id, original, processing, variants };
  console.log(`Validated photo ${id}/${sources.filenames.length}`);
}

const workers = await Promise.allSettled(Array.from({ length: 4 }, async () => {
  while (cursor < sources.filenames.length) await prepare(cursor++);
}));
const failure = workers.find(result => result.status === 'rejected');
if (failure) throw failure.reason;
await fs.writeFile(`${manifestPath}.tmp`, JSON.stringify(assets, null, 2) + '\n');
await fs.rename(`${manifestPath}.tmp`, manifestPath);
const totals = widths.map(width => ({ width, bytes: assets.reduce((sum, photo) => sum + photo.variants[width].bytes, 0) }));
console.log(JSON.stringify({ photos: assets.length, generated, reused, totals }, null, 2));
