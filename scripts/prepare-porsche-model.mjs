/** Download the CC BY 4.0 model, bake transforms, isolate its doors, and optimize textures. */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import * as THREE from 'three';
const repo = 'UtkarshPathrabe/Porche-911-930-Turbo-1975-3D-Model';
const rawDir = '/private/tmp/joey-porsche-source';
const output = 'public/models/porsche-911';
await fs.mkdir(rawDir, { recursive: true });
await fs.mkdir(output, { recursive: true });
// Pin topology: the door component selection is tied to this exact model revision.
const commit = { sha: '68212641044e54ca04de3a0cfb7e609c814aff15' };
const base = `https://raw.githubusercontent.com/${repo}/${commit.sha}/`;
async function download(file) {
    const dest = path.join(rawDir, file);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    try {
        await fs.access(dest);
        return;
    }
    catch { }
    const response = await fetch(base + file);
    if (!response.ok)
        throw Error(`${file}: ${response.status}`);
    await fs.writeFile(dest, new Uint8Array(await response.arrayBuffer()));
}
await download('scene.gltf');
const gltf = JSON.parse(await fs.readFile(path.join(rawDir, 'scene.gltf'), 'utf8'));
const files = [...gltf.buffers.map(b => b.uri), ...gltf.images.map(i => i.uri)];
let cursor = 0;
await Promise.all(Array.from({ length: 5 }, async () => { while (cursor < files.length)
    await download(files[cursor++]); }));
const sourceBuffer = await fs.readFile(path.join(rawDir, 'scene.bin'));
// Bake node transforms so the door pivots use one common coordinate system.
const matrices = new Map();
function visit(i, parent) {
    const n = gltf.nodes[i];
    const local = n.matrix ? new THREE.Matrix4().fromArray(n.matrix) : new THREE.Matrix4().compose(new THREE.Vector3(...(n.translation ?? [0, 0, 0])), new THREE.Quaternion(...(n.rotation ?? [0, 0, 0, 1])), new THREE.Vector3(...(n.scale ?? [1, 1, 1])));
    const world = parent.clone().multiply(local);
    matrices.set(i, world);
    for (const child of n.children ?? [])
        visit(child, world);
}
for (const root of gltf.scenes[gltf.scene ?? 0].nodes)
    visit(root, new THREE.Matrix4());
const summary = gltf.nodes.flatMap((n, i) => n.mesh === undefined ? [] : gltf.meshes[n.mesh].primitives.map(p => {
    const a = gltf.accessors[p.attributes.POSITION];
    const box = new THREE.Box3(new THREE.Vector3(...a.min), new THREE.Vector3(...a.max)).applyMatrix4(matrices.get(i));
    return { node: i, name: n.name, mesh: n.mesh, material: gltf.materials[p.material].name, min: box.min.toArray().map(x => +x.toFixed(3)), max: box.max.toArray().map(x => +x.toFixed(3)) };
}));
await fs.writeFile(path.join(rawDir, 'bounds.json'), JSON.stringify(summary, null, 2));
console.log('Downloaded source at', commit.sha, '; bounds at', path.join(rawDir, 'bounds.json'));
for (const [i, img] of gltf.images.entries()) {
    const image = sharp(path.join(rawDir, img.uri));
    const metadata = await image.metadata();
    const name = `texture-${i}.${metadata.hasAlpha ? 'png' : 'jpg'}`;
    const resized = image.resize({ width: 1024, height: 1024, fit: 'inside', withoutEnlargement: true });
    await (metadata.hasAlpha ? resized.png({ compressionLevel: 9 }) : resized.jpeg({ quality: 83 })).toFile(path.join(output, name));
    img.uri = name;
}
await fs.writeFile(path.join(output, 'scene.bin'), sourceBuffer);
await fs.writeFile(path.join(output, 'scene.gltf'), JSON.stringify(gltf));
await fs.writeFile(path.join(output, 'LICENSE.txt'), `FREE 1975 Porsche 911 (930) Turbo\nModel by Karol Miklas / Lionsharp Studios\nLicense: Creative Commons Attribution 4.0\nhttps://creativecommons.org/licenses/by/4.0/\nhttps://sketchfab.com/3d-models/free-1975-porsche-911-930-turbo-8568d9d14a994b9cae59499f0dbed21e\nVehicle design: Porsche AG.\nSource mirror: https://github.com/${repo}/tree/${commit.sha}\nChanges: textures resized and compressed; doors separated for animation.\n`);
await import('./split-porsche-doors.mjs');
