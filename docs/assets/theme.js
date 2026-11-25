(() => {
  const storageKey = 'yehui-tang-theme';
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  const browserColor = document.querySelector('meta[name="theme-color"]');
  let button;
  let preference;

  function readPreference() {
    try {
      preference = localStorage.getItem(storageKey);
    } catch {
      // The current page still supports the toggle when storage is unavailable.
    }
  }

  function applyTheme() {
    const dark = preference === 'dark' || (preference !== 'light' && systemDark.matches);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    browserColor.content = dark ? '#121214' : '#ffffff';
    if (button) {
      button.setAttribute('aria-pressed', String(dark));
      button.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
    }
  }

  readPreference();
  applyTheme();
  systemDark.addEventListener('change', applyTheme);
  window.addEventListener('storage', event => {
    if (event.key === storageKey || event.key === null) {
      readPreference();
      applyTheme();
    }
  });
  window.addEventListener('pageshow', event => {
    if (event.persisted) {
      readPreference();
      applyTheme();
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    button = document.getElementById('theme-toggle');
    button.addEventListener('click', () => {
      preference = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(storageKey, preference);
      } catch {
        // Keep the choice in memory for this visit.
      }
      applyTheme();
    });
    applyTheme();
    button.hidden = false;
  });
})();
