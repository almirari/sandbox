const modal = document.getElementById('modal');
const mc = document.getElementById('mc');
const tabTitle = document.getElementById('tabTitle');
let onClose = null;

export const isOpen = () => modal.style.display === 'flex';

// wraps content in the terminal layout (the cmd argument is ignored, so existing calls still work)
export const term = (cmd, body) =>
  `${body}<p class="dots" aria-hidden="true"><i></i><i></i><i></i><i></i></p>`;

// init runs after the HTML is in the page and may return a stop() function
export function show(html, init, title = 'pwsh') {
  mc.innerHTML = html;
  if (tabTitle) tabTitle.textContent = title;
  modal.style.display = 'flex';
  onClose = init ? init() : null;
}

export function closeModal() {
  modal.style.display = 'none';
  mc.innerHTML = '';
  if (onClose) onClose();
  onClose = null;
}

document.getElementById('x').onclick = closeModal;
modal.addEventListener('pointerdown', e => { if (e.target === modal) closeModal(); });
addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });