const nav = document.getElementById('site-nav');

// Keep links to the former homepage sections working.
function followMovedSection() {
  const link = document.getElementById(window.location.hash.slice(1));
  if (link instanceof HTMLAnchorElement && nav.contains(link)) {
    window.location.replace(link.href);
  }
}

window.addEventListener('hashchange', followMovedSection);
followMovedSection();

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const previews = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in');
        previews.unobserve(entry.target);
      }
    }
  });
  document.querySelectorAll('[data-reveal]').forEach(element => previews.observe(element));
}
