export const highResolutionEdges = [960, 1440, 1920, 2560] as const;

export function highResolutionUrl(original: string, longEdge: number) {
  const url = new URL(original);
  url.searchParams.set('x-oss-process', `image/resize,l_${longEdge},limit_1/format,webp/quality,Q_85`);
  return url.href;
}

export function chooseHighResolutionEdge(width: number, height: number, boxWidth: number, boxHeight: number, pixelRatio: number) {
  const scale = Math.min(boxWidth / width, boxHeight / height);
  const needed = Math.max(width, height) * scale * Math.min(Math.max(pixelRatio, 1), 2);
  return highResolutionEdges.find(edge => edge >= needed) ?? 2560;
}

export type ImageRequest = (url: string, signal: AbortSignal) => Promise<string>;

// Image requests do not require cross-origin fetch permission. Abort removes the
// pending source and handlers; generation checks also guard completed decodes.
const requestImage: ImageRequest = (url, signal) => new Promise((resolve, reject) => {
  const image = new Image();
  image.decoding = 'async';
  const clean = () => {
    image.onload = null;
    image.onerror = null;
    signal.removeEventListener('abort', abort);
  };
  const abort = () => {
    clean();
    image.removeAttribute('src');
    reject(new DOMException('Cancelled', 'AbortError'));
  };
  image.onload = async () => {
    try {
      await image.decode();
      if (signal.aborted) return;
      clean();
      resolve(url);
    } catch (error) { clean(); reject(error); }
  };
  image.onerror = () => { clean(); reject(new Error('High-resolution image failed to load')); };
  if (signal.aborted) return abort();
  signal.addEventListener('abort', abort, { once: true });
  if (import.meta.env?.DEV) console.debug('[Photography HD request]', url);
  image.src = url;
});

export function createPhotoLoader(request: ImageRequest = requestImage) {
  let generation = 0;
  let pending: AbortController | undefined;
  const ready = new Set<string>();
  const invalidate = () => {
    generation++;
    pending?.abort();
    pending = undefined;
  };
  return {
    invalidate,
    load(url: string, onReady: (url: string) => void, onError: () => void) {
      invalidate();
      const token = generation;
      if (ready.has(url)) { onReady(url); return; }
      pending = new AbortController();
      request(url, pending.signal).then(result => {
        if (generation !== token) return;
        pending = undefined;
        ready.add(url);
        onReady(result);
      }, () => {
        if (generation !== token) return;
        pending = undefined;
        onError();
      });
    },
  };
}
