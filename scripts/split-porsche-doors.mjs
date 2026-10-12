import fs from 'node:fs';
import * as THREE from 'three';
const g = JSON.parse(fs.readFileSync('/private/tmp/joey-porsche-source/scene.gltf'));
const bin = fs.readFileSync('/private/tmp/joey-porsche-source/scene.bin');
const mat = new Map();
function visit(i, p) { const n = g.nodes[i], l = n.matrix ? new THREE.Matrix4().fromArray(n.matrix) : new THREE.Matrix4().compose(new THREE.Vector3(...(n.translation ?? [0, 0, 0])), new THREE.Quaternion(...(n.rotation ?? [0, 0, 0, 1])), new THREE.Vector3(...(n.scale ?? [1, 1, 1]))); const w = p.clone().multiply(l); mat.set(i, w); for (const c of n.children ?? [])
    visit(c, w); }
for (const i of g.scenes[0].nodes)
    visit(i, new THREE.Matrix4());
function read(id) { const a = g.accessors[id], b = g.bufferViews[a.bufferView], n = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 }[a.type], s = { 5126: 4, 5125: 4, 5123: 2, 5121: 1 }[a.componentType], step = b.byteStride ?? n * s, off = (b.byteOffset ?? 0) + (a.byteOffset ?? 0); const f = { 5126: 'readFloatLE', 5125: 'readUInt32LE', 5123: 'readUInt16LE', 5121: 'readUInt8' }[a.componentType]; return Array.from({ length: a.count }, (_, i) => Array.from({ length: n }, (_, j) => bin[f](off + i * step + j * s))); }
const optimized = JSON.parse(fs.readFileSync('public/models/porsche-911/scene.gltf'));
const output = { asset: g.asset, scene: 0, scenes: [{ nodes: [0, 1, 2] }], nodes: [{ name: 'Body', children: [] }, { name: 'DoorLeft', translation: [-.82, .82, .97], children: [] }, { name: 'DoorRight', translation: [.82, .82, .97], children: [] }], meshes: [], materials: optimized.materials, textures: optimized.textures, images: optimized.images, samplers: optimized.samplers, accessors: [], bufferViews: [], buffers: [{ uri: 'car.bin', byteLength: 0 }] };
const chunks = [];
let total = 0;
function accessor(values, components, kind = 'float') {
    const typed = kind === 'index' ? new Uint32Array(values.flat()) : new Float32Array(values.flat());
    const bytes = Buffer.from(typed.buffer);
    const view = output.bufferViews.length;
    output.bufferViews.push({ buffer: 0, byteOffset: total, byteLength: bytes.length });
    chunks.push(bytes);
    total += bytes.length;
    const a = { bufferView: view, componentType: kind === 'index' ? 5125 : 5126, count: values.length, type: { 1: 'SCALAR', 2: 'VEC2', 3: 'VEC3', 4: 'VEC4' }[components] };
    if (components === 3) {
        a.min = [0, 1, 2].map(k => Math.min(...values.map(v => v[k])));
        a.max = [0, 1, 2].map(k => Math.max(...values.map(v => v[k])));
    }
    const id = output.accessors.length;
    output.accessors.push(a);
    return id;
}
const selected = new Map([[26, new Set([0, 1, 3, 4])], [113, new Set([7, 12, 14, 15])], [93, new Set([0, 1])], [115, new Set([0, 1])], [105, new Set([3, 19, 20, 25, 37, 38, 42, 43, 58, 59, 67, 68, 79, 80, 85, 86, 88, 89])]]);
const doorCounts = [0, 0];
for (const [ni, node] of g.nodes.entries()) {
    if (node.mesh === undefined)
        continue;
    for (const prim of g.meshes[node.mesh].primitives) {
        const pos = read(prim.attributes.POSITION).map(v => new THREE.Vector3(...v).applyMatrix4(mat.get(ni)));
        const idx = read(prim.indices).flat();
        const parent = pos.map((_, i) => i);
        function root(i) { while (parent[i] !== i) {
            parent[i] = parent[parent[i]];
            i = parent[i];
        } return i; }
        function join(a, b) { parent[root(a)] = root(b); }
        const map = new Map();
        pos.forEach((p, i) => { const k = p.toArray().map(v => Math.round(v * 100000)).join(','); if (map.has(k))
            join(i, map.get(k));
        else
            map.set(k, i); });
        for (let j = 0; j < idx.length; j += 3) {
            join(idx[j], idx[j + 1]);
            join(idx[j], idx[j + 2]);
        }
        const comps = new Map();
        for (let j = 0; j < idx.length; j += 3) {
            const r = root(idx[j]);
            let c = comps.get(r);
            if (!c) {
                c = { triangles: [], box: new THREE.Box3() };
                comps.set(r, c);
            }
            c.triangles.push(j);
            for (let k = 0; k < 3; k++)
                c.box.expandByPoint(pos[idx[j + k]]);
        }
        if (ni === 32 || ni === 140)
            continue;
        const sets = [[], [], []];
        let ci = 0;
        for (const c of comps.values()) {
            const isDoor = selected.get(ni)?.has(ci++);
            const side = isDoor ? (c.box.getCenter(new THREE.Vector3()).x < 0 ? 1 : 2) : 0;
            sets[side].push(...c.triangles);
            if (side)
                doorCounts[side - 1] += c.triangles.length;
        }
        for (const [side, triangles] of sets.entries()) {
            if (!triangles.length)
                continue;
            const ids = [...new Set(triangles.flatMap(j => [idx[j], idx[j + 1], idx[j + 2]]))];
            const remap = new Map(ids.map((v, i) => [v, i]));
            const attrs = {};
            const normalMatrix = new THREE.Matrix3().getNormalMatrix(mat.get(ni));
            for (const [name, sourceId] of Object.entries(prim.attributes)) {
                const data = read(sourceId);
                let vals = ids.map(i => data[i]);
                if (name === 'POSITION')
                    vals = ids.map(i => { const v = pos[i].clone(); if (side)
                        v.sub(new THREE.Vector3(...output.nodes[side].translation)); return v.toArray(); });
                if (name === 'NORMAL')
                    vals = vals.map(v => new THREE.Vector3(...v).applyMatrix3(normalMatrix).normalize().toArray());
                if (name === 'TANGENT')
                    vals = vals.map(v => [...new THREE.Vector3(...v.slice(0, 3)).applyMatrix3(normalMatrix).normalize().toArray(), v[3]]);
                attrs[name] = accessor(vals, vals[0].length);
            }
            const indices = triangles.flatMap(j => { const tri = [remap.get(idx[j]), remap.get(idx[j + 1]), remap.get(idx[j + 2])]; return mat.get(ni).determinant() < 0 ? [tri[0], tri[2], tri[1]] : tri; });
            const meshId = output.meshes.length;
            output.meshes.push({ primitives: [{ attributes: attrs, indices: accessor(indices.map(i => [i]), 1, 'index'), material: prim.material }] });
            const nodeId = output.nodes.length;
            output.nodes.push({ name: `${side ? 'DoorPart' : 'BodyPart'}_${ni}`, mesh: meshId });
            output.nodes[side].children.push(nodeId);
        }
    }
}
output.buffers[0].byteLength = total;
fs.writeFileSync('public/models/porsche-911/car.bin', Buffer.concat(chunks));
fs.writeFileSync('public/models/porsche-911/car.gltf', JSON.stringify(output));
fs.rmSync('public/models/porsche-911/scene.bin');
fs.rmSync('public/models/porsche-911/scene.gltf');
console.log('Separated door triangles:', doorCounts, '; geometry MB:', (total / 1048576).toFixed(2));
