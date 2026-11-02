import * as S from './story.js';

const $ = id => document.getElementById(id);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const range = (p, a, b) => clamp((p - a) / (b - a));
const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// ───────── scroll map (progress 0..1) ─────────
//  0.00 – 0.36  title → main board → about text (the original intro)
//  0.36 – 0.74  experience timeline
//  0.72 – 0.94  achievements (scroll through the cards, then they fade out)
//  0.95 – 1.00  empty space + "click anywhere to continue"
const P1 = 0.36;
const SCROLL_VH = 10;                 // how many screen heights of scrolling the whole intro takes
const JUMP = [0.30, 0.66, 0.88];      // where the About / Experience / Achievements chips jump to
const LABELS = ['About', 'Experience', 'Achievements'];

// is the guestbook open? (dock.js adds this class; scrolling/typing in it must not move the intro)
const busy = () => document.body.classList.contains('gb-open');

// split a beat into reveal units: loose words become one unit each, an element (like a .ln line) is one unit
function wrapWords(el) {
  const frag = document.createDocumentFragment();
  el.childNodes.forEach(n => {
    if (n.nodeType === 3) {
      n.textContent.split(/\s+/).filter(Boolean).forEach(t => {
        const s = document.createElement('span');
        s.className = 'w'; s.textContent = t;
        frag.append(s, ' ');
      });
    } else {
      const s = document.createElement('span');
      s.className = 'w'; s.append(n.cloneNode(true));
      frag.append(s, ' ');
    }
  });
  el.replaceChildren(frag);
}

// ───────── panels built from story.js ─────────
function buildTimeline() {
  const el = document.createElement('section');
  el.className = 'panel tl';
  el.setAttribute('aria-label', 'Experience');
  el.innerHTML = `
    <h2 class="pnl-h">Experience</h2>
    <div class="tl-view"><ol class="tl-list">${S.EXPERIENCE.map(x => `
      <li class="tl-item">
        <i class="tl-dot"></i>
        <small class="tl-when">${esc(x.when)}</small>
        <h3>${esc(x.role)}</h3>
        <span class="tl-org">${esc(x.org)}</span>
        <p>${esc(x.desc)}</p>
        ${x.tags && x.tags.length ? `<div class="tl-tags">${x.tags.map(t => `<em>${esc(t)}</em>`).join('')}</div>` : ''}
      </li>`).join('')}</ol></div>`;
  return { el, view: el.querySelector('.tl-view'), list: el.querySelector('.tl-list'), items: [...el.querySelectorAll('.tl-item')] };
}

function buildAchievements() {
  const el = document.createElement('section');
  el.className = 'panel ach';
  el.setAttribute('aria-label', 'Achievements');
  el.innerHTML = `
    <h2 class="pnl-h">Achievements</h2>
    <div class="ach-view"><div class="ach-list">
      <div class="ach-grid">${S.ACHIEVEMENTS.map(a => `
        <article class="ach-card">
          <span class="ach-ico" aria-hidden="true">${esc((a.by || '?').slice(0, 1))}<img src="${esc(a.logo || '')}" alt="" onerror="this.remove()"></span>
          <div><h3>${esc(a.title)}</h3><small>${esc(a.meta)}</small>${a.note ? `<p>${esc(a.note)}</p>` : ''}</div>
        </article>`).join('')}</div>
    </div></div>`;
  const items = [...el.querySelectorAll('.ach-card')];
  return { el, items, view: el.querySelector('.ach-view'), list: el.querySelector('.ach-list') };
}

export function initIntro({ onEnter, onWait }) {
  const load = $('load'), hero = $('hero'), base = $('heroBase');
  const sceneA = $('sceneA'), sceneB = $('sceneB');
  const bgB = $('bgB');
  const hint = $('hint'), status = $('status'), skip = $('skip'), cta = $('cta');
  const caption = sceneB.querySelector('.caption');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch = matchMedia('(pointer: coarse)').matches;

  // [start, end] of scroll progress (inside the first phase) for the about text
  const RANGES = [[0.50, 1.0]];
  const beats = [...sceneB.querySelectorAll('.beat')].map(el => {
    wrapWords(el);
    return { el, words: [...el.querySelectorAll('.w')] };
  });

  // ───── extra phases: timeline + achievements + jump chips ─────
  const tl = buildTimeline();
  const ac = buildAchievements();
  const steps = document.createElement('nav');
  steps.id = 'steps';
  steps.setAttribute('aria-label', 'Jump to section');
  steps.innerHTML = LABELS.map((t, i) => `<button type="button" data-i="${i}">${t}</button>`).join('');
  sceneB.append(tl.el, ac.el, steps);
  const chips = [...steps.querySelectorAll('button')];
  let curStep = -1;

  // ───── hover (or tap) a bold word → show its fun fact ─────
  const fact = sceneB.querySelector('.fact');
  const DEFAULT = touch ? '(tap the bold stuff)' : '(hover over the bold stuff)';
  fact.textContent = DEFAULT;
  const showFact = b => {
    fact.textContent = b ? b.dataset.fact : DEFAULT;
    fact.classList.toggle('on', !!b);
  };
  sceneB.addEventListener('pointerover', e => { if (e.pointerType === 'mouse') showFact(e.target.closest('b[data-fact]')); });
  sceneB.addEventListener('pointerout',  e => { if (e.pointerType === 'mouse') showFact(null); });
  sceneB.addEventListener('click', e => { const b = e.target.closest('b[data-fact]'); if (b) showFact(b); });

  // start decoding the images early (no half-loaded flash)
  base.decode().catch(() => {});
  hero.decode().catch(() => {});

  let ready = false, entered = false, raf = 0;
  let waiting = false;
  let wantGo = false, skipped = false;   // wantGo = user clicked to continue, skipped = pressed "skip intro"
  let target = 0, cur = 0, drawn = -1;   // scroll progress 0..1 (target = input, cur = smoothed)

  // ───── input: wheel / touch / keys all just move `target` ─────
  const nudge = d => { target = clamp(target + d); };
  const onWheel = e => { if (!busy()) nudge(e.deltaY / (innerHeight * SCROLL_VH)); };
  let ty = null;
  const onTouchStart = e => { ty = busy() ? null : e.touches[0].clientY; };
  const onTouchMove = e => {
    if (ty == null || busy()) return;
    const y = e.touches[0].clientY;
    nudge((ty - y) / (innerHeight * 3.4));
    ty = y;
  };

  const requestGo = () => { wantGo = true; target = 1; cta.style.opacity = 0; };

  const onKey = e => {
    if (busy()) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') nudge(0.05);
    else if (e.key === 'ArrowUp' || e.key === 'PageUp') nudge(-0.05);
    else if (e.key === 'End') target = 1;
    else if (e.key === 'Home') target = 0;
    else if (e.key === 'Enter') { if (cur >= 0.97) requestGo(); else target = 1; }
  };
  addEventListener('wheel', onWheel, { passive: true });
  addEventListener('touchstart', onTouchStart, { passive: true });
  addEventListener('touchmove', onTouchMove, { passive: true });
  addEventListener('keydown', onKey);

  skip.onclick = () => { target = 1; skipped = true; };
  steps.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (b && !wantGo && !skipped) target = JUMP[+b.dataset.i];
  });

  // click anywhere (once everything is shown) → enter the room
  load.addEventListener('click', e => {
    if (cur < 0.97 || e.target.closest('#skip, #steps, a, b[data-fact]')) return;   // links + bold words stay clickable
    requestGo();
  });

  // panels fade as a whole; `live` = its links are clickable
  const setPanel = (pn, a) => {
    pn.el.style.opacity = a;
    pn.el.style.visibility = a > 0 ? 'visible' : 'hidden';
    pn.el.classList.toggle('live', a > 0.6);
  };

  // ───── one frame for progress p (only opacity/transform, so it stays on the GPU) ─────
  function render(p) {
    const p1 = clamp(p / P1);   // progress inside the original intro

    // A: title first, then the full board fades in on top
    const r = ease(range(p1, 0.04, 0.40));   // 0 = title only, 1 = full board
    hero.style.opacity = r;
    base.style.visibility = r >= 1 ? 'hidden' : 'visible';

    // crossfade A → B, and stop painting whatever is hidden
    const b = ease(range(p1, 0.40, 0.56));
    sceneB.style.opacity = b;
    sceneB.style.visibility = b > 0 ? 'visible' : 'hidden';
    sceneA.style.visibility = b >= 1 ? 'hidden' : 'visible';
    if (caption) caption.style.opacity = range(p1, 0.52, 0.6);

    hint.style.opacity = 1 - range(p, 0.94, 0.98);
    skip.style.opacity = 1 - range(p, 0.94, 0.98);
    skip.style.pointerEvents = p > 0.95 ? 'none' : 'auto';

    // B background: main.png goes from sharp to blurry as you scroll through the text
    const blur = ease(range(p1, 0.40, 0.70)) * 16;                 // 0 → 16px
    bgB.style.filter = `blur(${blur.toFixed(1)}px)`;
    bgB.style.transform = `scale(${(1 + blur * 0.006).toFixed(3)})`;   // slight zoom so blurred edges don't show through

    // B: line-by-line / word-by-word reveals, then the text fades out for the timeline
    const introOut = 1 - range(p, P1, P1 + 0.05);
    beats.forEach((bt, i) => {
      const [s] = RANGES[i];
      const t = range(p1, s, RANGES[i][1]);
      bt.el.style.opacity = t > 0 ? introOut : 0;
      bt.el.classList.toggle('live', t > 0.05 && introOut > 0.5);   // bold words are hoverable only while visible
      const reveal = clamp(t / 0.4);
      const n = bt.words.length;
      bt.words.forEach((w, k) => {
        const v = clamp(reveal * (n + 2) - k);
        w.style.opacity = v;
        w.style.transform = `translateY(${((1 - v) * 0.35).toFixed(2)}em)`;
      });
    });

    // experience timeline: items appear one by one while the list scrolls up
    const tlA = range(p, 0.38, 0.44) * (1 - range(p, 0.69, 0.74));
    setPanel(tl, tlA);
    if (tlA > 0) {
      const n = tl.items.length;
      const k = range(p, 0.42, 0.66) * (n + 0.6);
      tl.items.forEach((it, i) => {
        const v = clamp(k - i);
        it.style.opacity = v;
        it.style.transform = `translateY(${((1 - v) * 18).toFixed(1)}px)`;
      });
      const f = clamp(k / (n + 0.6));
      tl.list.style.setProperty('--tp', f.toFixed(3));
      const over = Math.max(0, tl.list.offsetHeight - tl.view.clientHeight);
      tl.list.style.transform = `translateY(${(-over * f).toFixed(1)}px)`;
    }

    // achievements: cards pop in while the list scrolls up, then the whole panel fades out
    const acA = range(p, 0.72, 0.78) * (1 - range(p, 0.90, 0.94));
    setPanel(ac, acA);
    if (acA > 0) {
      const n = ac.items.length;
      const k = range(p, 0.76, 0.88) * (n + 0.4);
      ac.items.forEach((it, i) => {
        const v = clamp(k - i);
        it.style.opacity = v;
        it.style.transform = `translateY(${((1 - v) * 16).toFixed(1)}px)`;
      });
      const over = Math.max(0, ac.list.offsetHeight - ac.view.clientHeight);
      ac.list.style.transform = `translateY(${(-over * clamp(k / (n + 0.4))).toFixed(1)}px)`;
    }

    // jump chips fade out too, so the empty space is really empty
    const tail = range(p, 0.93, 0.96);
    steps.style.opacity = 1 - tail;
    steps.style.pointerEvents = tail > 0.5 ? 'none' : '';

    // which jump chip is lit
    const step = p < 0.40 ? 0 : p < 0.72 ? 1 : 2;
    if (step !== curStep) { curStep = step; chips.forEach((c, i) => c.classList.toggle('on', i === step)); }

    // "click anywhere to continue" appears only after the cards are gone
    cta.style.opacity = (wantGo || skipped) ? 0 : range(p, 0.95, 0.975);
    load.style.cursor = p >= 0.97 ? 'pointer' : '';
  }

  function tick(now) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - tick.last) / 1000 || 0.016, 0.05);
    tick.last = now;
    cur = reduce ? target : cur + (target - cur) * (1 - Math.exp(-dt * 7));
    if (Math.abs(target - cur) < 0.0004) cur = target;
    if (cur !== drawn) { render(cur); drawn = cur; }   // idle = zero work

    if (cur >= 0.995 && (wantGo || skipped)) {
      if (ready) go();
      else if (!waiting) { waiting = true; if (onWait) onWait(); }   // halftone loader takes over
    }
  }
  tick.last = 0;
  raf = requestAnimationFrame(tick);

  // ───── enter the 3D room ─────
  function go() {
    if (!ready || entered || cur < 0.995) return;
    entered = true;
    cancelAnimationFrame(raf);
    removeEventListener('wheel', onWheel);
    removeEventListener('touchstart', onTouchStart);
    removeEventListener('touchmove', onTouchMove);
    removeEventListener('keydown', onKey);
    status.style.opacity = 0;
    load.style.cursor = '';
    onEnter();                         // 3D starts rendering + camera fly-in starts NOW
    load.classList.add('out');         // text zooms, background fades (CSS)
    setTimeout(() => (load.style.display = 'none'), 1500);
  }

  return {
    setReady() {                       // called by main.js once the .glb models are in
      ready = true;
      status.style.opacity = 0;        // if the user already clicked, tick() calls go() on the next frame
    },
  };
}