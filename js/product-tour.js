(() => {
  'use strict';

  // Active section highlighting on the protected product tour page.
  const tourLinks = [...document.querySelectorAll('.nw-tour-nav a')];
  if (tourLinks.length && 'IntersectionObserver' in window) {
    const sections = tourLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      tourLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`));
    }, { rootMargin: '-35% 0px -50%', threshold: [0, .25, .6] });
    sections.forEach(section => observer.observe(section));
  }

  // A controlled conceptual animation: no real screens or internal fields are exposed.
  const demo = document.querySelector('[data-concept-demo]');
  if (!demo) return;

  const cards = [...demo.querySelectorAll('[data-demo-step]')];
  const controls = [...demo.querySelectorAll('[data-demo-go]')];
  const progress = demo.querySelector('.nw-concept-demo__progress span');
  const toggle = demo.querySelector('[data-demo-toggle]');
  const toggleIcon = toggle?.querySelector('i');
  const toggleLabel = toggle?.querySelector('span');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;
  let timer = null;
  let paused = reducedMotion;
  let inView = true;

  const render = next => {
    index = (next + cards.length) % cards.length;
    cards.forEach((card, i) => card.classList.toggle('is-active', i === index));
    controls.forEach((button, i) => {
      button.classList.toggle('is-active', i === index);
      button.setAttribute('aria-selected', String(i === index));
    });
    if (progress) progress.style.width = `${((index + 1) / cards.length) * 100}%`;
  };

  const stop = () => { if (timer) window.clearInterval(timer); timer = null; };
  const start = () => {
    stop();
    if (!paused && inView) timer = window.setInterval(() => render(index + 1), 4800);
  };
  const updateToggle = () => {
    if (!toggle) return;
    toggle.setAttribute('aria-pressed', String(paused));
    if (toggleIcon) toggleIcon.className = paused ? 'fa fa-play' : 'fa fa-pause';
    if (toggleLabel) toggleLabel.textContent = paused ? 'Reanudar animación' : 'Pausar animación';
  };

  controls.forEach(button => button.addEventListener('click', () => {
    render(Number(button.dataset.demoGo));
    start();
  }));
  toggle?.addEventListener('click', () => {
    paused = !paused;
    updateToggle();
    start();
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      start();
    }, { threshold: .2 }).observe(demo);
  }

  document.addEventListener('visibilitychange', () => {
    inView = !document.hidden;
    start();
  });

  render(0);
  updateToggle();
  start();
})();
