import { buildRoom } from './room.js';
import { flappy } from './flappy.js';
import * as C from './content.js';
import { loadModels } from './models.js';
import { initIntro } from './intro.js';
import { initLoader } from './loader.js';
import { show, isOpen, term } from './ui.js';
import { openDesktop, isDesktopOpen } from './desktop.js';
import { initDock } from './dock.js';

const T = THREE;
const $ = id => document.getElementById(id);
const canvas = $('c');
const tag = $('tag');
initDock();

// ───────────── loading screen (scroll intro lives in intro.js) ─────────────
let loaded = false;
let needsFrame = true;

// HUD hidden during the intro, fades in once the 3D room starts
const hud = $('hud');
hud.style.opacity = 0;
hud.style.transition = 'opacity 0.8s ease';
hud.style.pointerEvents = 'none';

const LOADER_SRC = 'textures/cat-small.mp4';
const loadEl = $('load');

// cat loader at page start
let loader = initLoader({ src: LOADER_SRC });
loader.show();

// let the cat paint its first frame before the heavy room build starts
const CAP = innerWidth < 600 ? 1800 : 3000;   // phones give up waiting sooner
await Promise.race([loader.ready, new Promise(r => setTimeout(r, CAP))]);
await new Promise(r => setTimeout(r, 300));

const MIN_BOOT = 1200;   // ms the cat is always visible
const MAX_BOOT = 5000;   // ms hard cap

const titleReady = Promise.all(
  [$('heroBase'), $('hero')].map(img => img.decode().catch(() => {}))
);
const minTime = loader.ready.then(() => new Promise(r => setTimeout(r, MIN_BOOT)));
const maxTime = new Promise(r => setTimeout(r, MAX_BOOT));

Promise.race([Promise.all([titleReady, minTime]), maxTime]).then(() => {
  loader.hide(null, () => {
    // fresh instance for the later "click before room is ready" wait
    loader = initLoader({ src: LOADER_SRC });
  });
});

// camera "flies in" from slightly behind/above and lands on its start position
const fly = { on: false, t0: 0, dur: 2200, back: 2.2, up: 0.9 };
const intro = initIntro({
  // user clicked/skipped before the room was ready
  onWait: () => loader.show(() => { loadEl.style.visibility = 'hidden'; }),

  onEnter: () => {
    canvas.style.visibility = 'visible';
    loaded = true;
    hud.style.opacity = '';
    fly.on = true;
    fly.t0 = performance.now() + 1e9;   // camera waits at the fly-in start until the dots begin to leave
    loader.hide(wasShown => {
      fly.t0 = performance.now() + (wasShown ? 350 : 0);   // start when the dots are about half gone
    });
  },
});

// ───────────── renderer, scene, camera ─────────────
const coarse = matchMedia('(pointer: coarse)').matches;
const renderer = new T.WebGLRenderer({ canvas, antialias: !coarse });
renderer.setPixelRatio(Math.min(devicePixelRatio, coarse ? 1.25 : 1.5));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = T.PCFSoftShadowMap;

const scene = new T.Scene();
scene.background = new T.Color(0xffd9b0);
scene.fog = new T.Fog(0xffd9b0, 8, 20);

const camera = new T.PerspectiveCamera(70, 1, 0.1, 50);
camera.position.set(0.5, 1.6, 2.8);

function resize() {
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}
addEventListener('resize', resize);
resize();

// ───────────── room + clickable furniture ─────────────
const clickables = [];
const on = (mesh, label, fn) => {
  mesh.userData = { label, fn };
  clickables.push(mesh);
};

const { col, motes } = buildRoom(scene, on, {
  about: () => show(term('whoami',
    `<fieldset><legend>About</legend><p>${C.ABOUT}</p></fieldset>`), null, 'about.txt'),

  projects: () => show(term('ls .\\projects',
    `<fieldset><legend>Projects</legend><dl>${C.PROJECTS.map(p => {
      const [name, ...rest] = p.split(' — ');
      return `<dt>${name}</dt><dd>${rest.join(' — ')}</dd>`;
    }).join('')}</dl></fieldset>`), null, 'projects'),

  paper: () => show(term('cat paper.md',
    `<fieldset><legend>${C.PAPER.title}</legend>
       <p><i>${C.PAPER.venue}</i></p><p>${C.PAPER.abs}</p>
       <a class="btn" href="${C.PAPER.link}" target="_blank" rel="noopener">Read the paper</a>
     </fieldset>`), null, 'paper.md'),

  contact: () => show(term('start .\\links',
    `<fieldset><legend>Find me</legend>${C.CONTACT.map(([n, u]) =>
      `<a class="btn" href="${u}" target="_blank" rel="noopener">${n}</a>`).join('')}</fieldset>`), null, 'links'),

  game: () => openDesktop(),
});

// ───────────── state (declared early: warmUp uses yaw / pitch) ─────────────
let yaw = 0.35, pitch = -0.12;
let drag = null;        // set while a finger/mouse is down on the canvas
let walkTarget = null;  // where tap-to-move is heading
const keys = {};

// ───────────── .glb models + warm-up ─────────────
const nextFrame = () => new Promise(r => requestAnimationFrame(() => r()));

// first render happens now, hidden behind the intro/loader, not in front of the user
async function warmUp() {
  camera.rotation.set(pitch, yaw, 0, 'YXZ');
  renderer.compile(scene, camera);
  if (renderer.initTexture) {            // upload textures even for things outside the first view
    scene.traverse(o => {
      if (!o.isMesh) return;
      (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => {
        if (m && m.map && m.map.image) renderer.initTexture(m.map);
      });
    });
  }
  renderer.render(scene, camera);        // shadow map + first draw
  await nextFrame();
  await nextFrame();
}

loadModels(scene, col)
  .catch(e => console.warn(e))
  .then(warmUp)
  .catch(e => console.warn(e))
  .finally(() => intro.setReady());
setTimeout(() => intro.setReady(), 8000);   // safety net

// ───────────── collision ─────────────
const ROOM_LIMIT = 2.0;
const BODY = 0.3; // how close you can get to furniture

const inRoom = (x, z) => Math.abs(x) < ROOM_LIMIT && Math.abs(z) < ROOM_LIMIT;
const inNook = (x, z) => x > -0.4 && x < 1.4 && z >= ROOM_LIMIT - 0.1 && z < 3.1; // matches the doorway

const canStandAt = (x, z) =>
  (inRoom(x, z) || inNook(x, z)) &&
  !col.some(([x0, x1, z0, z1]) => x > x0 - BODY && x < x1 + BODY && z > z0 - BODY && z < z1 + BODY);

// ───────────── keyboard ─────────────
addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
addEventListener('keyup',   e => keys[e.key.toLowerCase()] = false);

// ───────────── picking (raycasting) ─────────────
const raycaster = new T.Raycaster();
const pointer = new T.Vector2();

function aimRayAt(e) {
  pointer.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
}

// returns the clickable object under the pointer, or undefined
function clickableAt(e) {
  aimRayAt(e);
  const hit = raycaster.intersectObjects(clickables, true)[0];
  if (!hit) return;
  let o = hit.object;
  while (o && !o.userData.fn) o = o.parent;
  return o || undefined;
}

// ───────────── tap to move ─────────────
const floorPlane = new T.Plane(new T.Vector3(0, 1, 0), -0.05); // floor top is at y≈0.05

const marker = new T.Mesh(
  new T.RingGeometry(0.12, 0.18, 24),
  new T.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 })
);
marker.rotation.x = -Math.PI / 2;
marker.visible = false;
scene.add(marker);

function walkTo(e) {
  aimRayAt(e);
  const p = raycaster.ray.intersectPlane(floorPlane, new T.Vector3()); // null if you tap the ceiling
  if (p && canStandAt(p.x, p.z)) {
    walkTarget = p;
    marker.position.set(p.x, 0.07, p.z);
    marker.visible = true;
  }
}

function stopWalking() {
  walkTarget = null;
  marker.visible = false;
}

// ───────────── subtle hover lift ─────────────
const HOVER_SCALE = 1.03;
let hovered = null, teased = null;
const animated = new Set();

const hoverTargetOf = thing => {
  const t = thing && (thing.userData.hoverTarget || thing);
  return t && t.isGroup ? t : null;   // only model holders; flat things like posters are skipped
};

function updateHover(dt) {
  const active = hovered || teased;
  if (active) animated.add(active);
  animated.forEach(o => {
    const goal = o === active ? HOVER_SCALE : 1;
    const s = o.scale.x + (goal - o.scale.x) * (1 - Math.exp(-dt * 12));
    o.scale.setScalar(s);
    if (o !== active && Math.abs(s - 1) < 0.0005) { o.scale.setScalar(1); animated.delete(o); }
  });
}

// one small pulse per clickable object, once, right after the fly-in lands
function teaseClickables() {
  const list = [...new Set(clickables.map(c => c.userData.hoverTarget || c))].filter(o => o.isGroup);
  list.forEach((o, i) => setTimeout(() => {
    teased = o;
    setTimeout(() => { if (teased === o) teased = null; }, 450);
  }, 400 + i * 350));
}

// ───────────── pointer input: look, hover, click, tap ─────────────
canvas.addEventListener('pointerdown', e => {
  drag = { x: e.clientX, y: e.clientY, moved: 0 };
});

addEventListener('pointermove', e => {
  if (drag) {
    hovered = null;
    // dragging = looking around
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    drag.moved += Math.abs(dx) + Math.abs(dy);
    yaw -= dx * 0.005;
    pitch = Math.max(-1.2, Math.min(1.2, pitch - dy * 0.005));
    drag.x = e.clientX;
    drag.y = e.clientY;
  } else if (loaded && !isDesktopOpen()) {
    // hovering = show label (desktop only)
    const thing = clickableAt(e);
    hovered = hoverTargetOf(thing);
    canvas.style.cursor = thing ? 'pointer' : 'default';
    tag.style.display = thing ? 'block' : 'none';
    if (thing) tag.textContent = thing.userData.label;
  }
});

addEventListener('pointerup', e => {
  const wasTap = drag && drag.moved < 6;
  drag = null;
  if (!wasTap || !loaded || fly.on || isOpen() || isDesktopOpen()) return;

  const thing = clickableAt(e);
  if (thing) thing.userData.fn(); // tapped furniture → open it
  else walkTo(e);                 // tapped floor → walk there
});

// ───────────── movement ─────────────
const WALK_SPEED = 2.4;

// WASD / arrows → how far to move this frame, or null if no key is held
function keyboardMove(dt) {
  const forward = (keys.w || keys.arrowup ? 1 : 0) - (keys.s || keys.arrowdown ? 1 : 0);
  const strafe  = (keys.d || keys.arrowright ? 1 : 0) - (keys.a || keys.arrowleft ? 1 : 0);
  if (!forward && !strafe) return null;
  const step = WALK_SPEED * dt;
  return {
    dx: (-Math.sin(yaw) * forward + Math.cos(yaw) * strafe) * step,
    dz: (-Math.cos(yaw) * forward - Math.sin(yaw) * strafe) * step,
  };
}

// tap target → how far to move this frame, or null if we've arrived
function targetMove(dt) {
  if (!walkTarget) return null;
  const dx = walkTarget.x - camera.position.x;
  const dz = walkTarget.z - camera.position.z;
  const dist = Math.hypot(dx, dz);
  if (dist < 0.08) { stopWalking(); return null; }
  const step = Math.min(WALK_SPEED * dt, dist);
  return { dx: (dx / dist) * step, dz: (dz / dist) * step };
}

// move each axis separately so you slide along furniture instead of sticking
function tryMove({ dx, dz }) {
  const p = camera.position;
  let moved = false;
  if (canStandAt(p.x + dx, p.z)) { p.x += dx; moved = true; }
  if (canStandAt(p.x, p.z + dz)) { p.z += dz; moved = true; }
  return moved;
}

function updatePlayer(dt) {
  if (!loaded || fly.on || isOpen() || isDesktopOpen()) return;

  let move = keyboardMove(dt);
  if (move) stopWalking();            // pressing a key cancels tap-to-move
  else move = targetMove(dt);

  if (move && !tryMove(move) && walkTarget) stopWalking(); // blocked → give up
}

// ───────────── touch devices ─────────────
if (matchMedia('(pointer: coarse)').matches) {
  $('hud').textContent = 'Tap the floor to walk · drag to look · tap things to explore';
}

// ───────────── main loop (kept last) ─────────────
let lastTime = 0;
function loop(t) {
  requestAnimationFrame(loop);
  const dt = Math.min((t - lastTime) / 1000, 0.05);
  lastTime = t;

  updatePlayer(dt);
  updateHover(dt);
  motes.rotation.y += dt * 0.02;
  camera.rotation.set(pitch, yaw, 0, 'YXZ');

  // temporary fly-in offset: applied only for this render, then removed (real camera position never changes)
  let off = null;
  if (fly.on) {
    const k = Math.min(1, Math.max(0, (performance.now() - fly.t0) / fly.dur));   // clamped at 0 while waiting
    const d = Math.pow(1 - k, 3);                         // ease-out: fast at the start, soft landing
    const dir = new T.Vector3();
    camera.getWorldDirection(dir);
    off = dir.multiplyScalar(-fly.back * d);              // back away from the view direction...
    off.y += fly.up * d;                                  // ...and slightly up
    camera.position.add(off);
    if (k >= 1) { fly.on = false; teaseClickables(); }
  }
  if (loaded || needsFrame) { renderer.render(scene, camera); needsFrame = false; }
  if (off) camera.position.sub(off);
}
loop(0);