// Bottom-left dock: CV download + guestbook.
// Call initDock() once from main.js.
//
// ───────── making the guestbook shared (so every visitor sees every note) ─────────
// 1. Create a free project at supabase.com
// 2. SQL editor → run:
//
//    create table guestbook (
//      id bigint generated always as identity primary key,
//      name text not null check (char_length(name) between 1 and 40),
//      message text not null check (char_length(message) between 1 and 300),
//      created_at timestamptz not null default now()
//    );
//    alter table guestbook enable row level security;
//    create policy "anyone can read" on guestbook for select using (true);
//    create policy "anyone can sign" on guestbook for insert with check (true);
//    grant select, insert on guestbook to anon;
//
// 3. Project settings → API: paste the Project URL and the *anon public* key below.
//    (The anon key is meant to be public. The policies above only allow reading and adding notes.)
// 4. To remove a rude note: Table editor → delete the row.
//
// Until url + anonKey are filled in, notes are saved only in the visitor's own browser.
import { CV_FILE } from './story.js';

const CV = { icon: 'textures/cv.png', file: CV_FILE, saveAs: 'Almira-Raisa-Izzatina-CV.pdf' };

const GUESTBOOK = {
  url: 'https://pxntcijijjpyvsifqidl.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4bnRjaWppampweXZzaWZxaWRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM1ODEyMTYsImV4cCI6MjEwOTE1NzIxNn0.goTS7SQPBsWnLh8g-FXZUlEzxbVjmZOAjzBI6kfyS_U',
  table: 'guestbook',
  limit: 60,
};

const LIVE = !!(GUESTBOOK.url && GUESTBOOK.anonKey);
const LS_NOTES = 'gb:notes', LS_LAST = 'gb:last';
const COOLDOWN = 30000;   // ms between two notes from the same browser

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const when = iso => {
  const d = new Date(iso);
  return isNaN(d) ? '' : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

// ───────── storage ─────────
const readLocal = () => { try { return JSON.parse(localStorage.getItem(LS_NOTES)) || []; } catch { return []; } };
const writeLocal = v => { try { localStorage.setItem(LS_NOTES, JSON.stringify(v.slice(0, 100))); } catch {} };

const endpoint = LIVE ? `${GUESTBOOK.url.replace(/\/$/, '')}/rest/v1/${GUESTBOOK.table}` : '';
const headers = LIVE ? {
  apikey: GUESTBOOK.anonKey,
  Authorization: `Bearer ${GUESTBOOK.anonKey}`,
  'Content-Type': 'application/json',
} : {};

async function loadNotes() {
  if (!LIVE) return readLocal();
  const r = await fetch(`${endpoint}?select=id,name,message,created_at&order=created_at.desc&limit=${GUESTBOOK.limit}`, { headers });
  if (!r.ok) throw new Error('load ' + r.status);
  return r.json();
}

async function saveNote(name, message) {
  if (!LIVE) {
    const note = { id: Date.now(), name, message, created_at: new Date().toISOString() };
    writeLocal([note, ...readLocal()]);
    return note;
  }
  const r = await fetch(endpoint, {
    method: 'POST',
    headers: { ...headers, Prefer: 'return=representation' },
    body: JSON.stringify({ name, message }),
  });
  if (!r.ok) throw new Error('save ' + r.status);
  return (await r.json())[0];
}

// ───────── dock + book ─────────
export function initDock() {
  if (!LIVE) console.warn('[guestbook] no database configured (see the top of dock.js). Notes are saved in this browser only.');

  const dock = document.createElement('nav');
  dock.id = 'dockL';
  dock.setAttribute('aria-label', 'CV and guestbook');
  dock.innerHTML = `
    <a href="${esc(CV.file)}" download="${esc(CV.saveAs)}" aria-label="Download CV" data-tip="Download CV">
      <img src="${esc(CV.icon)}" alt="" draggable="false" onerror="this.outerHTML='<b>CV</b>'">
    </a>
    <button type="button" class="gb-open" aria-label="Open guestbook" data-tip="Guestbook">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>
    </button>`;
  document.body.appendChild(dock);

  const gb = document.createElement('div');
  gb.id = 'gb';
  gb.hidden = true;
  gb.tabIndex = -1;
  gb.setAttribute('role', 'dialog');
  gb.setAttribute('aria-modal', 'true');
  gb.setAttribute('aria-label', 'Guestbook');
  gb.innerHTML = `
    <div class="gb-book">
      <button type="button" class="gb-x" aria-label="Close guestbook">✕</button>

      <section class="gb-page gb-read">
        <h2>Guestbook</h2>
        <p class="gb-sub">Notes from people who stopped by${LIVE ? '' : ' (saved on this device only)'}</p>
        <ul class="gb-list" aria-live="polite"></ul>
      </section>

      <i class="gb-spine" aria-hidden="true"></i>

      <section class="gb-page gb-write">
        <h2>Leave a note</h2>
        <p class="gb-sub">Say hi, share feedback, or just leave a doodle in words.</p>
        <form class="gb-form" autocomplete="off">
          <label>Your name<input name="who" maxlength="40" placeholder="Anonymous"></label>
          <label>Your note<textarea name="note" rows="6" maxlength="300" placeholder="Write something nice…" required></textarea></label>
          <input class="gb-hp" name="website" tabindex="-1" aria-hidden="true">
          <div class="gb-row">
            <button type="submit" class="gb-send">Sign the book ✒︎</button>
            <small class="gb-count">0/300</small>
          </div>
          <p class="gb-msg" role="status" aria-live="polite"></p>
        </form>
      </section>
    </div>`;
  document.body.appendChild(gb);

  const list = gb.querySelector('.gb-list');
  const form = gb.querySelector('.gb-form');
  const msg = gb.querySelector('.gb-msg');
  const count = gb.querySelector('.gb-count');
  const send = gb.querySelector('.gb-send');
  let notes = [], lastFocus = null;

  const paint = () => {
    list.innerHTML = notes.length
      ? notes.map(n => `<li><p>${esc(n.message)}</p><small>— ${esc(n.name)}${n.created_at ? ', ' + when(n.created_at) : ''}</small></li>`).join('')
      : '<li class="gb-empty">No notes yet. Be the first to sign!</li>';
  };

  async function refresh() {
    list.innerHTML = '<li class="gb-empty">Opening the book…</li>';
    try { notes = await loadNotes(); paint(); }
    catch (e) { console.warn('[guestbook]', e); list.innerHTML = '<li class="gb-empty">Could not load the notes right now.</li>'; }
  }

  function open() {
    lastFocus = document.activeElement;
    gb.hidden = false;
    document.body.classList.add('gb-open');
    requestAnimationFrame(() => gb.classList.add('on'));
    gb.focus({ preventScroll: true });
    refresh();
  }

  function close() {
    gb.classList.remove('on');
    document.body.classList.remove('gb-open');
    setTimeout(() => { if (!gb.classList.contains('on')) gb.hidden = true; }, 260);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  dock.querySelector('.gb-open').addEventListener('click', open);
  gb.querySelector('.gb-x').addEventListener('click', close);
  gb.addEventListener('pointerdown', e => { if (e.target === gb) close(); });

  // keep keys (WASD, space, arrows, Esc) from reaching the intro / 3D room while the book is open
  gb.addEventListener('keydown', e => { if (e.key === 'Escape') close(); e.stopPropagation(); });
  gb.addEventListener('pointermove', e => e.stopPropagation());

  form.elements.note.addEventListener('input', () => { count.textContent = form.elements.note.value.length + '/300'; });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (form.elements.website.value) return;   // honeypot: only bots fill this
    const name = form.elements.who.value.trim().slice(0, 40) || 'Anonymous';
    const message = form.elements.note.value.trim().slice(0, 300);
    if (message.length < 2) { msg.textContent = 'Write a little more first :)'; return; }

    let last = 0;
    try { last = +localStorage.getItem(LS_LAST) || 0; } catch {}
    if (Date.now() - last < COOLDOWN) { msg.textContent = 'Nice enthusiasm! Please wait a few seconds before signing again.'; return; }

    send.disabled = true;
    msg.textContent = 'Signing…';
    try {
      const note = await saveNote(name, message);
      try { localStorage.setItem(LS_LAST, String(Date.now())); } catch {}
      notes = [note, ...notes];
      paint();
      form.elements.note.value = '';
      count.textContent = '0/300';
      msg.textContent = 'Signed! Thank you ♥';
      list.scrollTop = 0;
    } catch (err) {
      console.warn('[guestbook]', err);
      msg.textContent = 'Could not save your note. Please try again later.';
    } finally {
      send.disabled = false;
    }
  });
}