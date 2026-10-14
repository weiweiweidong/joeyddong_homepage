import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chooseHighResolutionEdge, highResolutionUrl, createPhotoLoader } from '../src/lib/photography-loader.ts';

function delayedRequests() {
  const calls = [];
  const request = (url, signal) => new Promise((resolve, reject) => {
    calls.push({ url, signal, resolve, reject: () => reject(new Error('offline')) });
  });
  return { calls, loader: createPhotoLoader(request) };
}
const settle = () => new Promise(resolve => setImmediate(resolve));

test('portrait sizing uses contained height, caps DPR, and never asks for more than 2560px', () => {
  assert.equal(chooseHighResolutionEdge(960, 2027, 800, 500, 1), 960);
  assert.equal(chooseHighResolutionEdge(960, 2027, 800, 500, 3), 1440);
  assert.equal(chooseHighResolutionEdge(960, 2027, 800, 700, 2), 1440);
  assert.equal(chooseHighResolutionEdge(960, 2027, 4000, 4000, 2), 2560);
  const url = new URL(highResolutionUrl('https://example.com/photo 69.jpg', 1440));
  assert.equal(url.pathname, '/photo%2069.jpg');
  assert.equal(url.searchParams.get('x-oss-process'), 'image/resize,l_1440,limit_1/format,webp/quality,Q_85');
});

test('only the selected URL is requested; slow previous results cannot replace it', async () => {
  const { calls, loader } = delayedRequests();
  const shown = [];
  let failed = 0;
  loader.load('photo1', url => shown.push(url), () => failed++);
  assert.equal(calls.length, 1);
  loader.load('photo69', url => shown.push(url), () => failed++);
  assert.equal(calls.length, 2);
  assert.equal(calls[0].signal.aborted, true);
  calls[0].resolve('photo1');
  await settle();
  assert.deepEqual(shown, []);
  calls[1].resolve('photo69');
  await settle();
  assert.deepEqual(shown, ['photo69']);
  assert.equal(failed, 0);
});

test('closing invalidates pending results, errors are recoverable, and decoded URLs are reused', async () => {
  const { calls, loader } = delayedRequests();
  let shown = 0;
  let failed = 0;
  const ready = () => shown++;
  const error = () => failed++;
  loader.load('photo1', ready, error);
  loader.invalidate();
  calls[0].resolve('photo1');
  await settle();
  assert.equal(shown, 0);
  loader.load('photo1', ready, error);
  calls[1].reject();
  await settle();
  assert.equal(failed, 1);
  loader.load('photo1', ready, error);
  calls[2].resolve('photo1');
  await settle();
  loader.load('photo1', ready, error);
  assert.equal(calls.length, 3);
  assert.equal(shown, 2);
});
