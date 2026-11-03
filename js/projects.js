import * as C from './content.js';

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function projectCards() {
  return `<div class="pjs">${C.PROJECTS.map(p => `
    <article class="pj">
      ${p.img ? `<img class="pj-img" src="${esc(p.img)}" alt="" loading="lazy" onerror="this.remove()">` : ''}
      <div class="pj-body">
        <h4>${esc(p.title)}</h4>
        <p>${esc(p.desc)}</p>
        ${p.tags?.length ? `<div class="pj-tags">${p.tags.map(t => `<em>${esc(t)}</em>`).join('')}</div>` : ''}
        ${p.links?.length ? `<div class="pj-links">${p.links.map(l =>
          `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join('')}</div>` : ''}
      </div>
    </article>`).join('')}</div>`;
}

export function paperBrief() {
  const P = C.PAPER;
  return `<div class="pp">
    <small>${esc(P.type).toUpperCase()} · ${esc(P.date)}</small>
    <h4>${esc(P.title)}</h4>
    <p class="pp-venue"><i>${esc(P.venue)}</i></p>
    <p class="pp-au">${P.authors.map(a => a.me ? `<b>${esc(a.name)}</b>` : esc(a.name)).join(', ')}</p>
    <div class="pp-chips">${P.highlights.map(([v, t]) => `<div><b>${esc(v)}</b><small>${esc(t)}</small></div>`).join('')}</div>
    <p>${esc(P.abs.slice(0, 420).replace(/\s+\S*$/, ''))}…</p>
    <div class="pj-links">
      <a href="${esc(P.link)}" target="_blank" rel="noopener">Read the paper ↗</a>
      ${P.alt ? `<a href="${esc(P.alt.url)}" target="_blank" rel="noopener">${esc(P.alt.label)} ↗</a>` : ''}
    </div>
  </div>`;
}