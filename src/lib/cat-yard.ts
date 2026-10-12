import type { CatYardCopy } from './cat-yard-copy';
type Point = { x: number; y: number };
type Mode = 'idle' | 'walk' | 'follow' | 'yarn' | 'ball' | 'eat' | 'pet';
export function initCatYard(root: HTMLElement) {
  const svg = root.querySelector<SVGSVGElement>('svg')!;
  const find = (name: string) => svg.querySelector<SVGElement>(`[data-${name}]`)!;
  const catNode = find('cat'), body = find('cat-body'), head = find('head');
  const yarnNode = find('yarn'), ballNode = find('ball'), spin = find('ball-spin');
  const heart = find('heart'), eyes = find('eyes'), happyEyes = find('happy-eyes');
  const frontLeg = find('front-leg'), backLeg = find('back-leg'), tail = find('tail');
  const status = root.querySelector<HTMLElement>('[data-status]')!;
  const foodMeter = root.querySelector<HTMLMeterElement>('meter')!;
  const pauseButton = root.querySelector<HTMLButtonElement>('[data-action="pause"]')!;
  const copy: CatYardCopy = JSON.parse(root.dataset.copy!);
  const cat = { x: 470, y: 375, facing: 1 };
  const yarn = { x: 345, y: 419 }, ball = { x: 590, y: 450, vx: 0, vy: 0, angle: 0 };
  const bowl = { x: 750, y: 395 };
  let mode: Mode = 'idle', target: Point = { ...cat }, age = 0, dwell = 0, clock = 0, food = 1;
  let arrival = false, paused = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let frame = 0, last = 0, visible = false, pointerAge = 10, manualUntil = 0, autoIndex = 0;
  let drag: 'yarn' | 'ball' | null = null, dragId = -1;
  let ballHug = 0;
  let pointer: Point | null = null;
  const bound = (p: Point) => ({ x: Math.max(100, Math.min(850, p.x)), y: Math.max(305, Math.min(515, p.y)) });
  const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
  function setMode(next: Mode, goal?: Point) {
    if (mode === 'yarn' && arrival) yarn.y = cat.y + 3;
    if (ballHug > 0) { ball.y = cat.y + 3; ballHug = 0; }
    mode = next; age = dwell = 0; arrival = false;
    target = bound(goal ?? cat);
    status.textContent = paused ? copy.statuses.paused : copy.statuses[next];
    root.dataset.state = next;
  }
  function command(next: Mode, goal?: Point) { manualUntil = clock + 7; setMode(next, goal); }
  function feed() { food = 1; command('eat', bowl); render(); }
  function playBall() {
    const direction = cat.x > ball.x ? -1 : 1;
    ball.vx = direction * 100; ball.vy = 35;
    command('ball', ball);
  }
  function autoChoose() {
    // Give every activity a turn, so the cat never forgets its toys or its lunch.
    const activities: Mode[] = ['walk', 'yarn', 'idle', 'ball', 'eat', 'walk', 'idle'];
    const next = activities[autoIndex++ % activities.length];
    if (next === 'yarn') setMode(next, yarn);
    else if (next === 'ball') setMode(next, ball);
    else if (next === 'eat' && food > .02) setMode(next, bowl);
    else if (next === 'walk') setMode(next, { x: 170 + Math.random() * 600, y: 335 + Math.random() * 150 });
    else setMode('idle');
  }
  function move(dt: number) {
    const gap = distance(cat, target), speed = mode === 'ball' ? 135 : mode === 'follow' ? 110 : 75;
    if (gap > 4) {
      const step = Math.min(gap, dt * speed);
      const dx = target.x - cat.x;
      cat.x += dx / gap * step; cat.y += (target.y - cat.y) / gap * step;
      if (Math.abs(dx) > 2) cat.facing = dx > 0 ? 1 : -1;
      arrival = false;
    } else { arrival = true; dwell += dt; }
  }
  function step(dt: number) {
    clock += dt; age += dt; pointerAge += dt;
    if (!drag && ballHug <= 0) {
      ball.x += ball.vx * dt; ball.y += ball.vy * dt;
      ball.angle += ball.vx * dt * 2;
      ball.vx *= Math.exp(-1.2 * dt); ball.vy *= Math.exp(-1.2 * dt);
      if (ball.x < 110 || ball.x > 835) { ball.vx *= -.75; ball.x = Math.max(110, Math.min(835, ball.x)); }
      if (ball.y < 310 || ball.y > 505) { ball.vy *= -.75; ball.y = Math.max(310, Math.min(505, ball.y)); }
    }
    if (clock > manualUntil && pointer && pointerAge < 1.8 && pointer.y > 280 && distance(cat, pointer) > 70 && !drag) {
      if (mode !== 'follow') setMode('follow', pointer);
      target = bound(pointer);
    }
    if (mode === 'ball') target = bound({ x: ball.x - cat.facing * 35, y: ball.y + 5 });
    if (mode === 'yarn' && !arrival) target = bound({ x: yarn.x - cat.facing * 18, y: yarn.y + 10 });
    if (mode !== 'idle' && mode !== 'pet' && ballHug <= 0) move(dt); else { arrival = true; dwell += dt; }
    if (mode === 'yarn' && arrival && !drag) { yarn.x = cat.x + cat.facing * 22; yarn.y = cat.y - 20; }
    if (mode === 'ball' && distance(cat, ball) < 65 && !drag && Math.abs(ball.vx) < 25) {
      if (ballHug <= 0) ballHug = 1.4;
      ball.x = cat.x + cat.facing * 22; ball.y = cat.y - 20;
      ballHug -= dt;
      if (ballHug <= 0) {
        ball.x = cat.x + cat.facing * 45; ball.y = cat.y + 3;
        ball.vx = cat.facing * (95 + Math.random() * 55); ball.vy = (Math.random() - .5) * 90;
      }
    }
    if (mode === 'eat' && arrival) {
      food = Math.max(0, food - dt * .12);
      if (food === 0) status.textContent = copy.statuses.empty;
    }
    const done = mode === 'ball' ? age > 7 : mode === 'yarn' ? dwell > 4.5 : mode === 'eat' ? dwell > 4 : mode === 'pet' ? dwell > 2.6 : mode === 'follow' ? pointerAge > 2.5 : dwell > 2.4;
    if (done && !drag) {
      if (mode === 'yarn') yarn.y = cat.y + 3;
      autoChoose();
    }
    render();
  }
  function render() {
    const walking = !arrival && mode !== 'idle' && mode !== 'pet';
    const yarnHug = mode === 'yarn' && arrival;
    const hug = yarnHug || ballHug > 0;
    const pet = mode === 'pet';
    const eat = mode === 'eat' && arrival;
    const bounce = walking ? Math.sin(clock * 12) * 2 : hug ? Math.sin(clock * 4) * 2 : 0;
    catNode.setAttribute('transform', `translate(${cat.x} ${cat.y})`);
    body.setAttribute('transform', `translate(0 ${bounce}) scale(${cat.facing} 1) rotate(${hug ? Math.sin(clock * 4) * 7 : 0})`);
    frontLeg.setAttribute('transform', hug ? 'translate(-4 -20) rotate(-38 23 -25)' : `rotate(${walking ? Math.sin(clock * 12) * 18 : 0} 23 -25)`);
    backLeg.setAttribute('transform', `rotate(${walking ? -Math.sin(clock * 12) * 18 : 0} -24 -24)`);
    tail.setAttribute('transform', `rotate(${Math.sin(clock * 3) * (pet ? 15 : 7)} -35 -28)`);
    head.setAttribute('transform', eat ? `translate(8 ${19 + Math.sin(clock * 8) * 3}) rotate(18 29 -65)` : `rotate(${pet ? Math.sin(clock * 3) * 6 : 0} 29 -65)`);
    const blink = clock % 4.8 > 4.6;
    eyes.setAttribute('opacity', pet || hug || eat || blink ? '0' : '1');
    happyEyes.setAttribute('opacity', pet || hug || eat || blink ? '1' : '0');
    heart.setAttribute('opacity', pet || hug ? '.9' : '0');
    heart.setAttribute('transform', `translate(0 ${Math.sin(clock * 3) * 5})`);
    yarnNode.setAttribute('transform', `translate(${yarn.x} ${yarn.y}) rotate(${yarnHug ? Math.sin(clock * 4) * 16 : 0})`);
    yarnNode.setAttribute('opacity', yarnHug ? '0' : '1');
    find('held-yarn').setAttribute('opacity', yarnHug ? '1' : '0');
    ballNode.setAttribute('opacity', ballHug > 0 ? '0' : '1');
    find('held-ball').setAttribute('opacity', ballHug > 0 ? '1' : '0');
    ballNode.setAttribute('transform', `translate(${ball.x} ${ball.y})`);
    spin.setAttribute('transform', `rotate(${ball.angle})`);
    find('kibble').setAttribute('opacity', String(food));
    foodMeter.value = food;
  }
  function tick(now: number) { frame = 0; const dt = Math.min(.04, (now - last) / 1000); last = now; step(dt); schedule(); }
  function stop() { cancelAnimationFrame(frame); frame = 0; }
  function schedule() {
    if (!paused && visible && !document.hidden && !frame) { last = performance.now(); frame = requestAnimationFrame(tick); }
  }
  function syncPause() {
    pauseButton.textContent = paused ? copy.play : copy.pause;
    pauseButton.setAttribute('aria-pressed', String(paused));
    status.textContent = paused ? copy.statuses.paused : copy.statuses[mode];
    root.dataset.paused = String(paused);
  }
  function point(event: PointerEvent): Point {
    const matrix = svg.getScreenCTM();
    const result = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix?.inverse());
    return { x: result.x, y: result.y };
  }
  svg.addEventListener('pointermove', (event) => {
    pointer = point(event); pointerAge = 0;
    if (drag && event.pointerId === dragId) {
      const toy = drag === 'yarn' ? yarn : ball; Object.assign(toy, bound(pointer));
      if (drag === 'ball') { ball.vx = ball.vy = 0; }
      if (!paused) { manualUntil = clock + 7; target = bound(pointer); }
      render();
    }
  });
  svg.addEventListener('pointerleave', () => { if (!drag) pointer = null; });
  svg.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    const node = event.target instanceof Element ? event.target : null;
    const p = point(event); pointerAge = 0;
    if (node?.closest('[data-yarn], [data-ball]')) {
      drag = node.closest('[data-yarn]') ? 'yarn' : 'ball'; dragId = event.pointerId;
      svg.setPointerCapture(event.pointerId);
      if (!paused) command(drag, p);
    } else if (!paused) {
      if (node?.closest('[data-cat]')) command('pet');
      else if (node?.closest('[data-bowl]')) feed();
      else if (p.y > 280) command('walk', p);
    }
  });
  function release(event: PointerEvent) {
    if (event.pointerId !== dragId) return;
    if (drag && !paused) command(drag, drag === 'yarn' ? yarn : ball);
    if (svg.hasPointerCapture(event.pointerId)) svg.releasePointerCapture(event.pointerId);
    drag = null; dragId = -1;
    if (event.pointerType !== 'mouse') pointer = null;
  }
  svg.addEventListener('pointerup', release);
  svg.addEventListener('pointercancel', release);
  svg.addEventListener('lostpointercapture', () => { drag = null; dragId = -1; });
  const actions: Record<string, () => void> = {
    call: () => command('follow', { x: 480, y: 460 }), feed,
    yarn: () => command('yarn', yarn), ball: playBall, pet: () => command('pet'),
  };
  root.querySelectorAll<HTMLButtonElement>('[data-action]').forEach(button => button.addEventListener('click', () => {
    if (button.dataset.action === 'pause') { paused = !paused; syncPause(); if (paused) stop(); else schedule(); }
    else if (!paused) actions[button.dataset.action!]?.();
  }));
  [[catNode, 'pet'], [yarnNode, 'yarn'], [ballNode, 'ball'], [find('bowl'), 'feed']].forEach(([node, action]) => {
    (node as SVGElement).addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); if (!paused) actions[action as string](); }
    });
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else schedule(); });
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  preference.addEventListener('change', () => { paused = preference.matches; syncPause(); if (paused) stop(); else schedule(); });
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) schedule(); else stop(); }).observe(svg);
  syncPause(); render();
}
