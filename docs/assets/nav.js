const toggle = document.getElementById('menu-toggle');
const nav = document.getElementById('site-nav');
const mobile = window.matchMedia('(max-width: 700px)');

function setOpen(open) {
  toggle.setAttribute('aria-expanded', String(open));
  nav.hidden = mobile.matches && !open;
}

function syncMenu() {
  toggle.hidden = !mobile.matches;
  setOpen(false);
}

toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
nav.addEventListener('click', (event) => {
  if (event.target.closest('a')) setOpen(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    setOpen(false);
    toggle.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) setOpen(false);
});
mobile.addEventListener('change', syncMenu);
syncMenu();
