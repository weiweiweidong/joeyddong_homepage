import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import type { PorscheCopy } from './porsche-copy';
export async function initPorscheGarage(root: HTMLElement) {
    const canvas = root.querySelector('canvas')!;
    const stage = root.querySelector<HTMLElement>('.garage-stage')!;
    const overlay = root.querySelector<HTMLElement>('.garage-loading')!;
    const loading = root.querySelector<HTMLElement>('[data-loading]')!;
    const status = root.querySelector<HTMLElement>('[data-status]')!;
    const retry = root.querySelector<HTMLButtonElement>('[data-retry]')!;
    const auto = root.querySelector<HTMLButtonElement>('[data-auto]')!;
    const copy: PorscheCopy = JSON.parse(root.dataset.copy!);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let renderer: THREE.WebGLRenderer | undefined;
    try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
        renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#161b20');
        scene.fog = new THREE.Fog('#161b20', 18, 35);
        const camera = new THREE.PerspectiveCamera(38, 1, .1, 60);
        const controls = new OrbitControls(camera, canvas);
        controls.enablePan = false;
        controls.enableDamping = !reduced.matches;
        controls.dampingFactor = .09;
        controls.minDistance = 5.5;
        controls.maxDistance = 14;
        controls.minPolarAngle = .25;
        controls.maxPolarAngle = Math.PI / 2 - .035;
        controls.rotateSpeed = .65;
        controls.autoRotateSpeed = .65;
        controls.target.set(0, .75, 0);
        const pmrem = new THREE.PMREMGenerator(renderer);
        const room = new RoomEnvironment();
        const environment = pmrem.fromScene(room, .04);
        scene.environment = environment.texture;
        room.dispose();
        pmrem.dispose();
        scene.add(new THREE.HemisphereLight('#e4eeff', '#353029', .8));
        const key = new THREE.DirectionalLight('#fff2db', 2.5);
        key.position.set(3, 7, 4);
        key.castShadow = true;
        key.shadow.mapSize.set(1024, 1024);
        key.shadow.camera.left = key.shadow.camera.bottom = -5;
        key.shadow.camera.right = key.shadow.camera.top = 5;
        key.shadow.normalBias = .025;
        scene.add(key);
        const rim = new THREE.DirectionalLight('#bacdff', 2.5);
        rim.position.set(-5, 3, -3);
        scene.add(rim);
        const floor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshStandardMaterial({ color: '#252b30', roughness: .8, metalness: .15 }));
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -.09;
        floor.receiveShadow = true;
        scene.add(floor);
        const plinth = new THREE.Mesh(new THREE.CylinderGeometry(3.65, 3.65, .1, 96), new THREE.MeshStandardMaterial({ color: '#3a4145', roughness: .62, metalness: .2 }));
        plinth.position.y = -.045;
        plinth.receiveShadow = true;
        scene.add(plinth);
        const ring = new THREE.Mesh(new THREE.TorusGeometry(3.5, .008, 8, 120), new THREE.MeshBasicMaterial({ color: '#78848a' }));
        ring.rotation.x = Math.PI / 2;
        ring.position.y = .008;
        scene.add(ring);
        const gltf = await new GLTFLoader().loadAsync('/models/porsche-911/car.gltf');
        const car = gltf.scene;
        car.position.set(0, .04, -.22);
        scene.add(car);
        const paintMaterials = new Set<THREE.MeshStandardMaterial>();
        car.traverse(node => {
            if (!(node instanceof THREE.Mesh))
                return;
            node.castShadow = true;
            node.receiveShadow = false;
            for (const material of Array.isArray(node.material) ? node.material : [node.material]) {
                if (!(material instanceof THREE.MeshStandardMaterial))
                    continue;
                if (material.name === 'paint') {
                    material.color.set('#e6bc35');
                    material.metalness = .65;
                    material.roughness = .26;
                    paintMaterials.add(material);
                }
                if (material.name === 'glass') {
                    material.transparent = true;
                    material.opacity = .38;
                    material.depthWrite = false;
                    material.metalness = .2;
                    material.roughness = .08;
                    material.side = THREE.DoubleSide;
                }
            }
        });
        const doors = {
            left: { pivot: car.getObjectByName('DoorLeft')!, open: false, sign: -1, button: root.querySelector<HTMLButtonElement>('[data-door="left"]')! },
            right: { pivot: car.getObjectByName('DoorRight')!, open: false, sign: 1, button: root.querySelector<HTMLButtonElement>('[data-door="right"]')! },
        };
        // A dark inner trim makes the reverse side of the original exterior panels readable.
        for (const door of Object.values(doors)) {
            const lining = new THREE.Mesh(new THREE.BoxGeometry(.025, .43, 1.13), new THREE.MeshStandardMaterial({ color: '#242326', roughness: .9 }));
            lining.position.set(door.sign * .025, -.065, -.64);
            door.pivot.add(lining);
        }
        let frame = 0, visible = false, disposed = false, last = 0, activeUntil = 0;
        function render() { renderer!.render(scene, camera); }
        function tick(now: number) {
            frame = 0;
            const dt = Math.min(.05, (now - last) / 1000);
            last = now;
            let moving = false;
            for (const door of Object.values(doors)) {
                const target = door.open ? -door.sign * 1.08 : 0;
                const delta = target - door.pivot.rotation.y;
                if (Math.abs(delta) > .001) {
                    moving = true;
                    door.pivot.rotation.y += reduced.matches ? delta : delta * (1 - Math.exp(-8 * dt));
                }
                else
                    door.pivot.rotation.y = target;
            }
            controls.update(dt);
            render();
            if (moving || controls.autoRotate || now < activeUntil)
                schedule();
        }
        function schedule() {
            if (!disposed && visible && !document.hidden && !frame) {
                last = performance.now();
                frame = requestAnimationFrame(tick);
            }
        }
        function wake() { activeUntil = performance.now() + 1500; schedule(); }
        function syncAuto() { auto.setAttribute('aria-pressed', String(controls.autoRotate)); }
        function toggleDoor(side: keyof typeof doors) {
            const door = doors[side];
            door.open = !door.open;
            door.button.setAttribute('aria-pressed', String(door.open));
            root.dataset[side + 'Door'] = door.open ? 'open' : 'closed';
            status.textContent = `${side === 'left' ? copy.leftDoor : copy.rightDoor} · ${door.open ? copy.opened : copy.closed}`;
            wake();
        }
        function resetCamera() {
            camera.position.set(5.8, 3.1, 6.2);
            if (stage.clientWidth < 700)
                camera.position.multiplyScalar(1.23);
            controls.target.set(0, .75, 0);
            controls.update();
            controls.saveState();
            wake();
        }
        root.querySelectorAll<HTMLButtonElement>('[data-door]').forEach(button => button.addEventListener('click', () => toggleDoor(button.dataset.door as keyof typeof doors)));
        root.querySelector('[data-reset]')!.addEventListener('click', () => { controls.autoRotate = false; syncAuto(); resetCamera(); });
        auto.addEventListener('click', () => { controls.autoRotate = !controls.autoRotate; syncAuto(); wake(); });
        const paints = ['#e6bc35', '#b32b2c', '#c5c9ca', '#304e68'];
        root.querySelectorAll<HTMLButtonElement>('[data-paint]').forEach((button, i) => button.addEventListener('click', () => {
            paintMaterials.forEach(material => material.color.set(paints[i]));
            root.querySelectorAll('[data-paint]').forEach((item, j) => item.setAttribute('aria-pressed', String(i === j)));
            render();
        }));
        controls.addEventListener('change', wake);
        controls.addEventListener('start', () => { controls.autoRotate = false; syncAuto(); wake(); });
        const raycaster = new THREE.Raycaster();
        function picked(event: PointerEvent): keyof typeof doors | undefined {
            const rect = canvas.getBoundingClientRect();
            const mouse = new THREE.Vector2((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
            raycaster.setFromCamera(mouse, camera);
            const hit = raycaster.intersectObject(car, true)[0];
            if (!hit)
                return;
            let object: THREE.Object3D | null = hit.object;
            while (object) {
                if (object === doors.left.pivot)
                    return 'left';
                if (object === doors.right.pivot)
                    return 'right';
                object = object.parent;
            }
        }
        const pointers = new Set<number>();
        let down: {
            x: number;
            y: number;
            id: number;
            dragged: boolean;
        } | undefined;
        canvas.addEventListener('pointerdown', event => { pointers.add(event.pointerId); if (pointers.size > 1) {
            if (down)
                down.dragged = true;
        }
        else
            down = { x: event.clientX, y: event.clientY, id: event.pointerId, dragged: event.button !== 0 }; });
        canvas.addEventListener('pointermove', event => {
            if (down && Math.hypot(event.clientX - down.x, event.clientY - down.y) > 5)
                down.dragged = true;
            if (!pointers.size)
                canvas.style.cursor = picked(event) ? 'pointer' : 'grab';
        });
        canvas.addEventListener('pointerup', event => {
            if (down?.id === event.pointerId && !down.dragged) {
                const side = picked(event);
                if (side)
                    toggleDoor(side);
            }
            pointers.delete(event.pointerId);
            if (!pointers.size)
                down = undefined;
        });
        canvas.addEventListener('pointercancel', event => { pointers.delete(event.pointerId); down = undefined; });
        canvas.addEventListener('keydown', event => {
            if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '+', '-'].includes(event.key)) {
                event.preventDefault();
                controls.autoRotate = false;
                syncAuto();
                if (event.key === 'ArrowLeft' || event.key === 'ArrowRight')
                    controls.rotateLeft(event.key === 'ArrowLeft' ? .15 : -.15);
                else if (event.key === 'ArrowUp' || event.key === 'ArrowDown')
                    controls.rotateUp(event.key === 'ArrowUp' ? .12 : -.12);
                else if (event.key === '+')
                    controls.dollyIn(1.1);
                else
                    controls.dollyOut(1.1);
                wake();
            }
        });
        const resize = new ResizeObserver(() => { const w = stage.clientWidth, h = stage.clientHeight; renderer!.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); render(); });
        resize.observe(stage);
        const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible)
            wake();
        else {
            cancelAnimationFrame(frame);
            frame = 0;
        } });
        observer.observe(stage);
        document.addEventListener('visibilitychange', () => { if (document.hidden) {
            cancelAnimationFrame(frame);
            frame = 0;
        }
        else
            wake(); });
        reduced.addEventListener('change', () => { controls.enableDamping = !reduced.matches; if (reduced.matches) {
            controls.autoRotate = false;
            syncAuto();
        } wake(); });
        window.addEventListener('pagehide', event => {
            cancelAnimationFrame(frame);
            frame = 0;
            if (event.persisted)
                return;
            disposed = true;
            resize.disconnect();
            observer.disconnect();
            controls.dispose();
            environment.dispose();
            renderer!.dispose();
        });
        window.addEventListener('pageshow', event => { if (event.persisted)
            wake(); });
        canvas.addEventListener('webglcontextlost', () => {
            disposed = true;
            cancelAnimationFrame(frame);
            frame = 0;
            overlay.hidden = false;
            loading.textContent = copy.error;
            status.textContent = copy.error;
            retry.hidden = false;
            retry.addEventListener('click', () => window.location.reload(), { once: true });
        });
        renderer.setSize(stage.clientWidth, stage.clientHeight, false);
        camera.aspect = stage.clientWidth / stage.clientHeight;
        camera.updateProjectionMatrix();
        resetCamera();
        render();
        overlay.hidden = true;
        root.dataset.ready = 'true';
        status.textContent = copy.ready;
        root.querySelectorAll<HTMLButtonElement>('button:disabled').forEach(button => button.disabled = false);
    }
    catch (error) {
        renderer?.dispose();
        loading.textContent = copy.error;
        status.textContent = copy.error;
        retry.hidden = false;
        retry.addEventListener('click', () => window.location.reload(), { once: true });
        console.error('Porsche garage:', error);
    }
}
