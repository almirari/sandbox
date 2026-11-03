import { flappy } from './flappy.js';
import * as C from './content.js';
import { projectCards } from './projects.js';

// ───────── edit me ─────────
const LINKS = {
  linkedin:  'https://www.linkedin.com/in/almira-ri',
  github:    'https://github.com/almirari',
  instagram: 'https://www.instagram.com/almirarizzatina/',
};
const EMAIL       = 'almirari004@gmail.com';
const NOW_PLAYING = { title: 'Misteryoso', artist: 'Cup of Joe' };   // decoration only
const WEATHER     = { city: 'Surabaya', temp: '31°', text: 'Partly cloudy' };   // decoration only
const PHOTOS      = ['textures/photo1.jpg', 'textures/photo2.jpg', 'textures/photo3.jpg',
                     'textures/photo4.jpg', 'textures/photo5.jpg', 'textures/photo6.jpg'];
const PINNED      = ['chrome', 'files', 'flappy', 'notes'];   // taskbar icons

// ───────── LinkedIn tab (edit by hand when your profile changes) ─────────
const LINKEDIN = {
  name: 'Almira Raisa Izzatina', pronouns: 'She/Her',
  headline: 'Final Year Student @ IF ITS | Ex-Intern @ Accenture',
  place: 'Jakarta Metropolitan Area',
  connections: '500+ connections', followers: '596 followers',
  photo: 'textures/me.jpeg', banner: 'textures/li-banner.jpeg',
  posts: [
    { when: '9mo', likes: 106, comments: 6, img: 'textures/li-post1.jpeg', slides: 7,
      text: 'It has been a couple of days since I returned from the Grow Beyond Yourself study trip in Singapore and I am honestly still buzzing!…' },
    { when: '11mo', likes: 58, comments: 4, img: 'textures/li-post2.jpeg', slides: 3,
      text: 'Looking back on what a fantastic experience it was presenting at the 15th International Conference on Information, Communication Technology and…' },
  ],
  jobs: [
    { role: 'Research Assistant', org: 'Institut Teknologi Sepuluh Nopember (ITS)', when: 'Mar 2025 – Present · 1 yr 9 mos', logo: 'textures/li-its.jpeg',
      attach: 'Knowledge Distillation for Efficient Ordinal Classification of Oil Palm Ripeness Level' },
    { role: 'Technology & Consulting Intern', org: 'Accenture Southeast Asia · Internship', when: 'Jan 2026 – Sep 2026 · 9 mos', where: 'Central Jakarta, Jakarta, Indonesia', logo: 'textures/li-accenture.jpeg' },
    { role: 'Laboratory Administrator', org: 'Laboratorium Komputasi Cerdas dan Visi · Contract', when: 'May 2024 – Aug 2026 · 2 yrs 4 mos', where: 'Surabaya, East Java, Indonesia', logo: 'textures/li-kcv.jpeg',
      attach: 'Lab Based Education 2024' },
    { role: 'Head of Visual Media', org: 'ANARGYA ITS TEAM · Contract', when: 'Mar 2024 – Dec 2025 · 1 yr 10 mos', logo: 'textures/li-anargya.jpeg',
      attach: 'FSAE Australasia' },
    { role: 'Data Analyst Intern', org: 'PT Bank Syariah Indonesia Tbk. · Internship', when: 'Jul 2025 – Sep 2025 · 3 mos', where: 'Central Jakarta, Jakarta, Indonesia', logo: 'textures/li-bsi.jpeg' },
  ],
  edu: [{ school: 'Institut Teknologi Sepuluh Nopember (ITS)', deg: "Bachelor's degree, Informatics Engineering", when: 'Jul 2022 – Oct 2026',
          extra: 'Activities and societies: Anargya ITS Formula EV Team, HMTC, Tennis Club', logo: 'textures/li-its.jpeg' }],
  pubs: [{ title: 'Knowledge Distillation for Efficient Ordinal Classification of Oil Palm Ripeness Level',
           venue: '2025 15th International Conference on Information, Communication Technology and System (ICTS) · Feb 5, 2026' }],
  honorsTotal: 6,
  honors: [
    { title: 'Honorable Mention in The ICT Scientific Writing Division at GEMASTIK XVIII 2025',
      by: 'Issued by The Ministry of Education, Culture, Research and Technology (MoECRT) · Oct 2025', note: 'Top 4 of 386 teams' },
    { title: '3rd Place of Presentation Event Formula SAE Japan 2024',
      by: 'Issued by Formula Society of Automotive Engineers · Sep 2024' },
    { title: 'Top 10 Team at VWO UI 2023 UI/UX Competition',
      by: 'Issued by University of Indonesia Vocational Student Executive Board · Nov 2023' },
    { title: '3rd Place of Presentation Event Formula SAE Japan 2023',
      by: 'Issued by Formula Society of Automotive Engineers · Sep 2023', note: 'Top 3 of 77 teams' },
    { title: 'Most Innovative Paper at Youth Idea Competition NBRI 2023',
      by: 'Issued by National Battery Research Institute · Aug 2023' },
    { title: '1st Place of Overall Event of Formula Bharat Pi-EV',
      by: 'Issued by Formula Bharat India · Jul 2023' },
  ],
  orgs: [
    { name: 'Himpunan Mahasiswa Teknik Computer (HMTC) ITS', role: 'Staff of External Affairs · Mar 2024 – Nov 2024' },
    { name: 'Schematics ITS', role: 'Expert Staff of Creative Division · Jan 2024 – Nov 2024' },
  ],
  interests: [
    { name: 'Laboratorium Komputasi Cerdas dan Visi', followers: '194 followers', logo: 'textures/li-kcv.jpeg' },
    { name: 'Institut Teknologi Sepuluh Nopember (ITS)', followers: '128,688 followers', logo: 'textures/li-its.jpeg' },
  ],
};

// ───────── GitHub tab ─────────
// the contribution graph + total are fetched live, nothing to update here
const GITHUB = {
  name: 'Almira Raisa Izzatina', user: 'almirari', pronouns: 'she/her',
  followers: 22, following: 23, repos: 30, stars: 10,
  pinned: [
    { name: 'dr-classification',     lang: 'Jupyter Notebook', color: '#da5b0b' },
    { name: 'ffb-classification',    lang: 'Jupyter Notebook', color: '#da5b0b' },
    { name: 'kd-audio-spectrograms', lang: 'Python', color: '#3572A5', stars: 1 },
    { name: 'TanyaRasa-Chatbot',     lang: 'Jupyter Notebook', color: '#da5b0b', stars: 1, forks: 2 },
    { name: 'sandbox',               lang: 'JavaScript', color: '#f1e05a' },
  ],
};

// ───────── Instagram tab ─────────
// ADD POSTS HERE: drop images into textures/ and list them. A plain path is enough,
// or { img: 'textures/ig2.jpg', url: 'https://www.instagram.com/p/XXXX/' } to link a specific post.
const INSTAGRAM = {
  user: 'almirarizzatina',
  avatar: 'textures/ig-avatar.jpg',
  postCount: 1, followers: '1,105', following: '1,016',
  bio: '',   // optional
  highlights: [
    { label: '', img: 'textures/ig-hl1.jpg' },
    { label: '', img: 'textures/ig-hl2.jpg' },
  ],
  posts: [
    'textures/ig1.jpg',
    // 'textures/ig2.jpg',
    // { img: 'textures/ig3.jpg', url: 'https://www.instagram.com/p/XXXX/' },
  ],
};

// ───────── apps ─────────
// img = file in textures/ (any extension). If it is missing, the emoji is shown instead.
const stub = (name, appId) => () => openWin({
  id: 'stub-' + name, app: appId, title: name, ico: '⏳', w: 340, h: 170,
  body: `<p class="center"><b>${name}</b> is busy updating.<br><small>(it has been since 2023)</small></p>`,
});

const APPS = [
  { id: 'chrome',  name: 'Chrome',      ico: '🌐', img: 'chrome.png',      open: openChrome },
  { id: 'flappy',  name: 'Flappy',      ico: '🐤', img: 'flappybird.png',  open: openFlappy },
  { id: 'files',   name: 'Projects',    ico: '📁', img: 'files.png',       open: openFiles },
  { id: 'notes',   name: 'About.txt',   ico: '📝', img: 'notes.png',       open: openNotes },
  { id: 'term',    name: 'Terminal',    ico: '⌨️', img: 'terminal.webp',   open: openTerm },
  { id: 'photos',  name: 'Photos',      ico: '🖼️', img: 'photos.png',      open: openPhotos },
  { id: 'mail',    name: 'Mail',        ico: '✉️', img: 'mail.png',        open: () => { location.href = 'mailto:' + EMAIL; } },
  { id: 'spotify', name: 'Spotify',     ico: '🎧', img: 'spotify.webp',    open: () => window.open('https://open.spotify.com', '_blank', 'noopener') },
  { id: 'code',    name: 'VS Code',     ico: '🧑‍💻', img: 'code.webp',       open: stub('VS Code', 'code') },
  { id: 'figma',   name: 'Figma',       ico: '🎨', img: 'figma.png',       open: stub('Figma', 'figma') },
  { id: 'discord', name: 'Discord',     ico: '💬', img: 'discord.webp',    open: stub('Discord', 'discord') },
  { id: 'steam',   name: 'Steam',       ico: '🎮', img: 'steam.webp',      open: stub('Steam', 'steam') },
  { id: 'bin',     name: 'Recycle Bin', ico: '🗑️', img: 'bin.webp',        open: openBin },
];

// real icon from textures/, falls back to the emoji if the file is missing
const ic = a => a.img
  ? `<img class="ico" src="textures/${a.img}" alt="" draggable="false" data-e="${a.ico}" onerror="this.outerHTML=this.dataset.e">`
  : a.ico;

// ───────── state ─────────
let root, layer, clockTimer, hintTimer;
let z = 10;
const wins = new Map();   // id → { el, stop }
const q = s => root.querySelector(s);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export const isDesktopOpen = () => !!root && root.classList.contains('on');

// "Press Esc" tip, fades out after a few seconds
function showHint() {
  const el = q('.d-hint');
  const coarse = matchMedia('(pointer: coarse)').matches;
  el.innerHTML = coarse
    ? 'Tap <b>← Back to room</b> to leave the computer'
    : 'Press <kbd>Esc</kbd> to go back to the room';
  el.classList.add('show');
  clearTimeout(hintTimer);
  hintTimer = setTimeout(() => el.classList.remove('show'), 4500);
}

export function openDesktop() {
  if (isDesktopOpen()) return;
  if (!root) build();
  renderCalendar();
  tick();
  clockTimer = setInterval(tick, 1000);
  root.classList.add('on');
  document.body.classList.add('desk-open');
  showHint();
}

function closeDesktop() {
  [...wins.keys()].forEach(closeWin);
  closeStart();
  root.classList.remove('on');
  document.body.classList.remove('desk-open');
  clearInterval(clockTimer);
  clearTimeout(hintTimer);
  q('.d-hint').classList.remove('show');
}

// ───────── build the desktop ─────────
function build() {
  root = document.createElement('div');
  root.id = 'desktop';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-label', 'Desktop');
  root.innerHTML = `
  <button class="d-exit" data-off aria-label="Leave the computer">← Back to room <kbd>Esc</kbd></button>
  <div class="d-hint" role="status"></div>

  <div class="d-main">
    <div class="d-left">
      <div class="clock"><div class="date" id="dDate"></div><div class="time" id="dTime"></div></div>
      <div class="row">
        <div class="pic g" style="--img:url('textures/widget1.jpg')"></div>
        <div class="pic g" style="--img:url('textures/widget2.jpg')"></div>
      </div>
      <div class="row">
        <div class="sys g">${[['⚙️', 72], ['⌨️', 45], ['🔋', 88], ['🌐', 30]]
          .map(([i, p]) => `<span class="ring" style="--p:${p}"><span>${i}</span></span>`).join('')}</div>
        <div class="calw g" id="dCal"></div>
      </div>
    </div>

    <div class="d-icons">${APPS.map(a =>
      `<button class="ic" data-app="${a.id}"><span class="tile">${ic(a)}</span>${a.name}</button>`).join('')}</div>

    <div class="d-right">
      <div class="music g">
        <div class="art" style="--img:url('textures/album.jpg')"></div>
        <div class="mt"><b>${NOW_PLAYING.title}</b><small>${NOW_PLAYING.artist}</small>
          <div class="ctl"><button aria-label="Previous">⏮</button><button data-play aria-label="Play/pause">⏸</button><button aria-label="Next">⏭</button></div>
        </div>
      </div>
      <div class="photo g" style="--img:url('textures/widget3.jpg')"></div>
      <div class="weather g"><small>${WEATHER.city}</small><b>${WEATHER.temp}</b><span>${WEATHER.text}</span></div>
    </div>
  </div>

  <div id="dwin"></div>

  <div id="startmenu" hidden>
    <div class="sm-grid">${APPS.map(a =>
      `<button class="ic" data-app="${a.id}"><span class="tile">${ic(a)}</span>${a.name}</button>`).join('')}</div>
    <button class="sm-off" data-off>⏻ Shut down</button>
  </div>

  <footer class="tb">
    <div class="tb-l">${WEATHER.temp} ${WEATHER.text}</div>
    <div class="tb-c">
      <button id="startbtn" aria-label="Start">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="#4f77ff"><rect x="2" y="2" width="9.3" height="9.3" rx="1"/><rect x="12.7" y="2" width="9.3" height="9.3" rx="1"/><rect x="2" y="12.7" width="9.3" height="9.3" rx="1"/><rect x="12.7" y="12.7" width="9.3" height="9.3" rx="1"/></svg>
      </button>
      <div class="search">🔍 Search</div>
      ${PINNED.map(id => {
        const a = APPS.find(x => x.id === id);
        return `<button class="tb-app" data-app="${id}" aria-label="${a.name}">${ic(a)}</button>`;
      }).join('')}
    </div>
    <div class="tb-r"><span class="tray">⌃ 📶 🔊 🔋</span><span class="dt"><b id="tTime"></b><br><small id="tDate"></small></span>
      <button class="tb-off" data-off aria-label="Shut down" title="Shut down">⏻</button></div>
  </footer>`;
  document.body.appendChild(root);
  layer = q('#dwin');

  root.addEventListener('click', e => {
    if (e.target.closest('#startbtn')) { q('#startmenu').hidden = !q('#startmenu').hidden; return; }
    if (e.target.closest('[data-off]')) { closeDesktop(); return; }
    const p = e.target.closest('[data-play]');
    if (p) p.textContent = p.textContent === '⏸' ? '▶' : '⏸';
    const app = e.target.closest('[data-app]');
    if (app) launch(app.dataset.app, app.classList.contains('tb-app'));
    if (!e.target.closest('#startmenu')) closeStart();
    else if (app) closeStart();
  });

  addEventListener('keydown', e => {
    if (e.key !== 'Escape' || !isDesktopOpen()) return;
    if (!q('#startmenu').hidden) return closeStart();
    const id = topWin();
    id ? closeWin(id) : closeDesktop();
  });
}

const closeStart = () => { if (root) q('#startmenu').hidden = true; };

function tick() {
  const d = new Date();
  q('#dDate').textContent = d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  q('#dTime').textContent = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  q('#tTime').textContent = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }).toLowerCase();
  q('#tDate').textContent = d.toLocaleDateString('en-GB');
}

function renderCalendar() {
  const d = new Date(), y = d.getFullYear(), m = d.getMonth();
  const first = (new Date(y, m, 1).getDay() + 6) % 7;   // Monday = 0
  const days = new Date(y, m + 1, 0).getDate();
  let cells = '';
  for (let i = 0; i < first; i++) cells += '<i></i>';
  for (let n = 1; n <= days; n++) cells += `<i class="${n === d.getDate() ? 'today' : ''}">${n}</i>`;
  q('#dCal').innerHTML =
    `<b>${d.toLocaleString('en-GB', { month: 'long' }).toUpperCase()}</b>
     <div class="cal">${[...'MTWTFSS'].map(c => `<em>${c}</em>`).join('')}${cells}</div>`;
}

// ───────── window manager ─────────
function launch(id, toggle) {
  const r = wins.get(id);
  if (r) {
    const isTop = !r.el.hidden && r.el.classList.contains('top');
    if (toggle && isTop) { r.el.hidden = true; syncTaskbar(); }
    else { r.el.hidden = false; focus(id); }
    return;
  }
  const app = APPS.find(a => a.id === id);
  if (app) app.open();
}

function focus(id) {
  const r = wins.get(id);
  if (!r) return;
  r.el.style.zIndex = ++z;
  wins.forEach(v => v.el.classList.toggle('top', v === r));
  syncTaskbar();
}

function topWin() {
  let best = null, bz = -1;
  wins.forEach((r, id) => { if (!r.el.hidden && +r.el.style.zIndex >= bz) { bz = +r.el.style.zIndex; best = id; } });
  return best;
}

function closeWin(id) {
  const r = wins.get(id);
  if (!r) return;
  try { r.stop && r.stop(); } catch (e) { console.warn(e); }
  r.el.remove();
  wins.delete(id);
  syncTaskbar();
}

function syncTaskbar() {
  if (!root) return;
  root.querySelectorAll('.tb-app').forEach(b => {
    const r = wins.get(b.dataset.app);
    b.classList.toggle('run', !!r);
    b.classList.toggle('act', !!r && !r.el.hidden && r.el.classList.contains('top'));
  });
}

function openWin({ id, app, title, ico, w = 520, h = 380, body, init, dark, flush }) {
  if (wins.has(id)) { wins.get(id).el.hidden = false; focus(id); return; }

  const pr = layer.getBoundingClientRect();
  const small = innerWidth < 700;
  if (small) { w = pr.width - 16; h = pr.height - 16; }
  const n = wins.size;

  const appDef = APPS.find(a => a.id === (app || id));
  const icoHtml = appDef ? ic(appDef) : ico;

  const el = document.createElement('section');
  el.className = 'win' + (dark ? ' dark' : '');
  el.style.width = w + 'px';
  el.style.height = h + 'px';
  el.style.left = (small ? 8 : Math.max(8, (pr.width - w) / 2 + n * 26 - 40)) + 'px';
  el.style.top  = (small ? 8 : Math.max(8, (pr.height - h) / 2 + n * 22 - 30)) + 'px';
  el.innerHTML = `
    <header class="wbar">
      <span class="wt">${icoHtml} ${title}</span>
      <button data-w="min" aria-label="Minimize">–</button>
      <button data-w="max" aria-label="Maximize">▢</button>
      <button data-w="x" aria-label="Close">✕</button>
    </header>
    <div class="wbody${flush ? ' flush' : ''}">${body}</div>`;
  layer.appendChild(el);

  const rec = { el, stop: null };
  wins.set(id, rec);
  rec.stop = init ? init(el.querySelector('.wbody')) : null;

  const bar = el.querySelector('.wbar');
  bar.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.w === 'min') { el.hidden = true; syncTaskbar(); }
    else if (b.dataset.w === 'max') el.classList.toggle('max');
    else closeWin(id);
  });

  el.addEventListener('pointerdown', () => focus(id));
  bar.addEventListener('pointerdown', e => {
    if (small || e.target.closest('button') || el.classList.contains('max')) return;
    const r = el.getBoundingClientRect(), p = layer.getBoundingClientRect();
    const dx = e.clientX - r.left, dy = e.clientY - r.top;
    bar.setPointerCapture(e.pointerId);
    const move = ev => {
      el.style.left = clamp(ev.clientX - dx - p.left, 80 - r.width, p.width - 80) + 'px';
      el.style.top  = clamp(ev.clientY - dy - p.top, 0, p.height - 36) + 'px';
    };
    const up = () => { bar.removeEventListener('pointermove', move); bar.removeEventListener('pointerup', up); };
    bar.addEventListener('pointermove', move);
    bar.addEventListener('pointerup', up);
  });

  focus(id);
}

// ───────── chrome tab pages ─────────
const logo = (src, letter) =>
  `<div class="lg">${esc((letter || '?').slice(0, 1))}<img src="${esc(src || '')}" alt="" onerror="this.remove()"></div>`;
const cover = src => `style="--img:url('${esc(src)}')"`;

function linkedinPage() {
  const L = LINKEDIN;
  const card = (title, inner, foot) =>
    `<section class="li-card"><h3>${title}</h3>${inner}${foot ? `<div class="li-foot">${foot}</div>` : ''}</section>`;

  const posts = `
    <div class="li-tabs"><i class="on">Posts</i><i>Comments</i><i>Images</i></div>
    <div class="li-posts">${L.posts.map(p => `
      <article class="li-post">
        <div class="li-who"><div class="av sm" ${cover(L.photo)}></div>
          <div><b>${esc(L.name)} <em>· You</em></b><small>${esc(L.headline)}<br>${esc(p.when)} · Edited</small></div></div>
        <p>${esc(p.text)} <span class="more">more</span></p>
        ${p.img ? `<div class="li-img" ${cover(p.img)}>${p.slides ? `<span class="badge">1/${p.slides}</span>` : ''}</div>` : ''}
        <div class="li-react"><span>👍 ${p.likes}</span><span>💬 ${p.comments}</span><span>🔁</span><span>➤</span></div>
        ${p.impressions ? `<div class="li-ana"><span>▮ ${esc(p.impressions)} impressions</span><a>View analytics</a></div>` : ''}
      </article>`).join('')}</div>`;

  const jobs = L.jobs.map(j => `
    <div class="li-row">${logo(j.logo, j.org)}
      <div><b>${esc(j.role)}</b><span>${esc(j.org)}</span><small>${esc(j.when)}</small>
        ${j.where ? `<small>${esc(j.where)}</small>` : ''}
        ${j.attach ? `<div class="li-attach">📎 ${esc(j.attach)}</div>` : ''}</div></div>`).join('');

  const edu = L.edu.map(e => `
    <div class="li-row">${logo(e.logo, e.school)}
      <div><b>${esc(e.school)}</b><span>${esc(e.deg)}</span><small>${esc(e.when)}</small>
        ${e.extra ? `<p>${esc(e.extra)}</p>` : ''}</div></div>`).join('');

  const pubs = L.pubs.map(p => `<div class="li-row"><div><b>${esc(p.title)}</b><span>${esc(p.venue)}</span></div></div>`).join('');

  const honors = L.honors.map(h => `
    <div class="li-row"><div><b>${esc(h.title)}</b><span>${esc(h.by)}</span>
      ${h.note ? `<small>${esc(h.note)}</small>` : ''}</div></div>`).join('');

  const orgs = L.orgs.map(o => `<div class="li-row"><div><b>${esc(o.name)}</b><span>${esc(o.role)}</span></div></div>`).join('');

  const interests = `<div class="li-int">${L.interests.map(i => `
    <div class="li-row">${logo(i.logo, i.name)}<div><b>${esc(i.name)}</b><small>${esc(i.followers)}</small></div></div>`).join('')}</div>`;

  return `<div class="li">
    <section class="li-card li-top">
      <div class="li-banner" ${cover(L.banner)}></div>
      <div class="av xl" ${cover(L.photo)}></div>
      <h2>${esc(L.name)} <small>${esc(L.pronouns)}</small></h2>
      <p>${esc(L.headline)}</p>
      <small>${esc(L.place)}</small>
      <small class="blue">${esc(L.connections)}</small>
      <a class="go" href="${LINKS.linkedin}" target="_blank" rel="noopener">View on LinkedIn ↗</a>
    </section>
    ${card('Activity <small>' + esc(L.followers) + '</small>', posts, 'Show all →')}
    ${card('Experience', jobs)}
    ${card('Education', edu)}
    ${card('Publications', pubs)}
    ${card(`Honors & awards (${L.honorsTotal})`, honors, L.honors.length < L.honorsTotal ? `Show all ${L.honorsTotal} honors & awards →` : '')}
    ${card('Organizations (' + L.orgs.length + ')', orgs)}
    ${card('Interests', interests)}
  </div>`;
}

async function githubPage() {
  const G = GITHUB;
  const pins = G.pinned.map(r => `
    <a class="gh-pin" href="${LINKS.github}/${esc(r.name)}" target="_blank" rel="noopener">
      <div><b>${esc(r.name)}</b><i>Public</i></div>
      <small><span class="dot" style="background:${r.color}"></span>${esc(r.lang)}
        ${r.stars ? ` &nbsp;☆ ${r.stars}` : ''}${r.forks ? ` &nbsp;⑂ ${r.forks}` : ''}</small>
    </a>`).join('');

  // contribution graph: drawn from live data so it can be dark themed and never goes stale
  let graph = '';
  try {
    const r = await fetch(`https://github-contributions-api.jogruber.de/v4/${G.user}?y=last`);
    const days = (await r.json()).contributions;
    const total = days.reduce((s, d) => s + d.count, 0);
    const pad = new Date(days[0].date + 'T00:00').getDay();   // Sunday = 0
    const cells = '<i style="visibility:hidden"></i>'.repeat(pad) +
      days.map(d => `<i data-l="${d.level}" title="${d.count} contributions on ${d.date}"></i>`).join('');
    graph = `<h3>${total} contributions in the last year</h3>
             <div class="gh-graph"><div class="gh-heat">${cells}</div></div>`;
  } catch (e) { /* offline or API down: just skip the graph */ }

  return `<div class="gh">
    <aside>
      <img class="gh-av" src="https://github.com/${esc(G.user)}.png" alt="" onerror="this.style.visibility='hidden'">
      <h2>${esc(G.name)}</h2>
      <p class="muted">${esc(G.user)} · ${esc(G.pronouns)}</p>
      <a class="gh-btn" href="${LINKS.github}" target="_blank" rel="noopener">View on GitHub ↗</a>
      <p class="muted"><b>${G.followers}</b> followers · <b>${G.following}</b> following</p>
      <p class="muted">${G.repos} repositories · ${G.stars} stars</p>
    </aside>
    <main>
      <h3>Pinned</h3>
      <div class="gh-pins">${pins}</div>
      ${graph}
    </main>
  </div>`;
}

function instagramPage() {
  const I = INSTAGRAM;
  const posts = I.posts.map(p => typeof p === 'string' ? { img: p } : p);
  // a highlight whose image fails to load removes itself instead of showing a blank circle
  const hl = I.highlights.map(h => `
    <div class="ig-hl">
      <div class="ring" ${cover(h.img)}>
        <img src="${esc(h.img)}" alt="" style="display:none" onerror="this.closest('.ig-hl').remove()">
      </div>
      ${h.label ? `<small>${esc(h.label)}</small>` : ''}
    </div>`).join('');
  const grid = posts.map(p => `
    <a class="ig-post" href="${esc(p.url || LINKS.instagram)}" target="_blank" rel="noopener" ${cover(p.img)}></a>`).join('');
  return `<div class="ig">
    <header>
      <div class="ig-av" ${cover(I.avatar)}></div>
      <div>
        <h2>${esc(I.user)}</h2>
        <p class="ig-stats"><b>${Math.max(I.postCount || 0, posts.length)}</b> posts <b>${esc(I.followers)}</b> followers <b>${esc(I.following)}</b> following</p>
        ${I.bio ? `<p>${esc(I.bio)}</p>` : ''}
        <a class="ig-btn" href="${LINKS.instagram}" target="_blank" rel="noopener">View on Instagram ↗</a>
      </div>
    </header>
    ${hl ? `<div class="ig-hls">${hl}</div>` : ''}
    <div class="ig-tab"><span>▦ POSTS</span></div>
    <div class="ig-grid">${grid}</div>
  </div>`;
}

function paperPage() {
  const P = C.PAPER;
  const initials = n => n.split(' ').filter(Boolean).map(w => w[0]).slice(0, 2).join('').toUpperCase();
  const short = n => {
    const p = n.split(' ');
    return p.slice(0, -1).map(w => w[0] + '.').join(' ') + ' ' + p[p.length - 1];
  };
  const names = P.authors.map(a => short(a.name));
  const cite = `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}, “${P.title},” in ${P.venue}, 2025, doi: ${P.doi}.`;

  return `<div class="doc">
    <small class="kicker">${esc(P.type).toUpperCase()}</small>
    <h2>${esc(P.title)}</h2>
    <p class="p-meta"><span>${esc(P.date)}</span>
      <span>DOI: <a href="${esc(P.link)}" target="_blank" rel="noopener">${esc(P.doi)}</a></span></p>
    <p class="venue"><i>${esc(P.venue)}</i></p>

    <div class="p-authors">${P.authors.map(a => `
      <div class="p-au${a.me ? ' me' : ''}">
        <span class="p-av">${esc(initials(a.name))}</span>
        <div><b>${esc(a.name)}</b><small>${esc(a.org)}</small></div>
      </div>`).join('')}</div>

    <div class="p-chips">${P.highlights.map(([v, t]) =>
      `<div><b>${esc(v)}</b><small>${esc(t)}</small></div>`).join('')}</div>

    <h3>Abstract</h3>
    <p>${esc(P.abs)}</p>
    <div class="p-kw">${P.keywords.map(k => `<em>${esc(k)}</em>`).join('')}</div>

    <h3>Cite this paper</h3>
    <p class="p-cite">${esc(cite)}</p>

    <a class="go" href="${esc(P.link)}" target="_blank" rel="noopener">Read the paper ↗</a>
    ${P.alt ? `<a class="go alt" href="${esc(P.alt.url)}" target="_blank" rel="noopener">${esc(P.alt.label)} ↗</a>` : ''}
  </div>`;
}

// ───────── app windows ─────────
function openChrome() {
  const TABS = [
    { title: 'LinkedIn',  ico: '💼', img: 'tab-linkedin.png',  url: LINKS.linkedin,  render: linkedinPage,  theme: 'li-page' },
    { title: 'GitHub',    ico: '🐙', img: 'tab-github.png',    url: LINKS.github,    render: githubPage,    theme: 'gh-page' },
    { title: 'Instagram', ico: '📸', img: 'tab-instagram.png', url: LINKS.instagram, render: instagramPage, theme: 'ig-page' },
    { title: 'Paper',     ico: '📄', img: 'tab-paper.png',     url: C.PAPER.link && C.PAPER.link !== '#' ? C.PAPER.link : 'scholar.google.com', render: paperPage },
  ];
  const tico = t => t.img
    ? `<img class="tico" src="textures/${t.img}" alt="" draggable="false" data-e="${t.ico}" onerror="this.outerHTML=this.dataset.e">`
    : t.ico;
  openWin({
    id: 'chrome', title: 'Google Chrome', ico: '🌐',
    w: Math.min(980, innerWidth - 60),
    h: Math.min(640, innerHeight - 110),
    flush: true,
    body: `<div class="tabs">${TABS.map((t, i) =>
            `<button data-i="${i}" class="${i ? '' : 'on'}">${tico(t)} ${t.title}</button>`).join('')}</div>
           <div class="addr"><span></span></div>
           <div class="page"></div>`,
    init: el => {
      const page = el.querySelector('.page');
      let token = 0;
      const showTab = async i => {
        const t = TABS[i], my = ++token;
        el.querySelectorAll('.tabs button').forEach((b, k) => b.classList.toggle('on', k === i));
        el.querySelector('.addr span').textContent = '🔒 ' + t.url.replace(/^https?:\/\//, '');
        page.className = 'page ' + (t.theme || '');
        page.innerHTML = '<p class="note">Loading…</p>';
        const html = await t.render();
        if (my === token) {
          page.innerHTML = html; page.scrollTop = 0;
          const g = page.querySelector('.gh-graph');
          if (g) g.scrollLeft = g.scrollWidth;   // graph starts at the newest weeks
        }
      };
      el.querySelector('.tabs').addEventListener('click', e => {
        const b = e.target.closest('button');
        if (b) showTab(+b.dataset.i);
      });
      showTab(0);
    },
  });
}

function openFlappy() {
  openWin({
    id: 'flappy', title: 'flappy.exe', ico: '🐤', w: 380, h: 520, dark: true,
    body: `<div class="game"><canvas width="320" height="400"></canvas><p>[space / click] flap</p></div>`,
    init: el => flappy(el.querySelector('canvas')),   // returns stop(), called when the window closes
  });
}

function openFiles() {
  openWin({ id: 'files', title: 'Projects', ico: '📁', w: 640, h: 480, body: projectCards() });
}

function openNotes() {
  openWin({ id: 'notes', title: 'About.txt', ico: '📝', w: 460, h: 320, body: `<p>${esc(C.ABOUT)}</p>` });
}

function openTerm() {
  openWin({
    id: 'term', title: 'Terminal', ico: '⌨️', w: 460, h: 280, dark: true,
    body: `<pre class="term">sasya@room
-----------
OS       Windows 11
Host     ITS, Surabaya
Focus    tiny AI · APIs
Status   caffeinated</pre>`,
  });
}

function openPhotos() {
  openWin({
    id: 'photos', title: 'Photos', ico: '🖼️', w: 500, h: 360,
    body: `<div class="photos">${PHOTOS.map(p => `<div style="--img:url('${p}')"></div>`).join('')}</div>`,
  });
}

function openBin() {
  openWin({
    id: 'bin', title: 'Recycle Bin', ico: '🗑️', w: 420, h: 280,
    body: `<ul class="files">
      <li><span>📄</span><div><b>final_final_v7.docx</b></div></li>
      <li><span>📄</span><div><b>thesis_draft_NEW (2).pdf</b></div></li>
      <li><span>🖼️</span><div><b>untitled.png</b></div></li>
    </ul><p class="center"><small>3 items</small></p>`,
  });
}