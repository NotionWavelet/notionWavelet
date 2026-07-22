(() => {
  'use strict';
  const triggers = [...document.querySelectorAll('[data-lightbox="wavelet"]')];
  if (triggers.length) {
    const box = document.createElement('div');
    box.className = 'nw-lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Vista ampliada de la aplicación');
    box.innerHTML = '<button type="button" aria-label="Cerrar">×</button><img alt="">';
    document.body.appendChild(box);
    const image = box.querySelector('img');
    const close = () => { box.classList.remove('is-open'); document.body.style.overflow = ''; };
    triggers.forEach(link => link.addEventListener('click', event => {
      event.preventDefault();
      const source = link.getAttribute('href') || link.querySelector('img')?.src;
      if (!source) return;
      image.src = source;
      image.alt = link.querySelector('img')?.alt || 'Pantalla de Notion Wavelet';
      box.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      box.querySelector('button').focus();
    }));
    box.querySelector('button').addEventListener('click', close);
    box.addEventListener('click', e => { if (e.target === box) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }
  const links = [...document.querySelectorAll('.nw-tour-nav a')];
  if (links.length && 'IntersectionObserver' in window) {
    const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === `#${visible.target.id}`));
    }, { rootMargin: '-35% 0px -50%', threshold: [0,.25,.6] });
    sections.forEach(section => observer.observe(section));
  }
})();
