(() => {
  const button = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');
  if (button && nav) {
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      nav.classList.toggle('open', open);
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');button.setAttribute('aria-expanded', 'false');
    }));
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');button.setAttribute('aria-expanded', 'false');button.focus();
      }
    });
  }
})();
