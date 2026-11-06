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

// A shared perspective tilt complements independent CSS float motion.
(() => {
  const stage = document.querySelector('.hero-stage');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if (!stage) return;
  let frame;
  stage.addEventListener('pointermove', event => {
    if (reduceMotion.matches || event.pointerType !== 'mouse') return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const bounds = stage.getBoundingClientRect();
      stage.style.setProperty('--pointer-x', `${((event.clientX - bounds.left) / bounds.width - .5) * 8}deg`);
      stage.style.setProperty('--pointer-y', `${-((event.clientY - bounds.top) / bounds.height - .5) * 6}deg`);
    });
  });
  const reset = () => {
    cancelAnimationFrame(frame);
    stage.style.setProperty('--pointer-x', '0deg');
    stage.style.setProperty('--pointer-y', '0deg');
  };
  stage.addEventListener('pointerleave', reset);
  reduceMotion.addEventListener('change', reset);
})();
