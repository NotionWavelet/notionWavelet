document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#navbar_container');
  if (!container) return;

  const pageName = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const onHome = pageName === 'index.html' || pageName === '';
  const homeHref = anchor => onHome ? anchor : `index.html${anchor}`;
  const morePages = [
    'ayuda.html',
    'guia-primeros-pasos.html',
    'guia-migracion.html',
    'guia-verifactu.html',
    'versiones.html',
    'roadmap.html',
    'sobre-wavelet.html'
  ];
  const moreIsActive = morePages.includes(pageName);

  container.innerHTML = `
    <div class="nw-nav__inner">
      <a class="nw-brand" href="${homeHref('#hero-section')}" aria-label="Notion Wavelet, inicio">
        <img src="images/logo-wavelet-final.png?v=2" alt="" width="68" height="48">
        <span class="nw-brand__copy"><strong>Notion Wavelet</strong><small>Gestión para talleres</small></span>
      </a>
      <button class="nw-menu-toggle" type="button" aria-expanded="false" aria-controls="nw-main-nav" aria-label="Abrir menú">
        <span></span><span></span><span></span>
      </button>
      <nav class="nw-main-nav" id="nw-main-nav" aria-label="Navegación principal">
        <a data-section="features-section" href="${homeHref('#features-section')}">Funciones</a>
        <a href="capturas.html"${pageName === 'capturas.html' ? ' class="is-active" aria-current="page"' : ''}>Capturas</a>
        <a data-section="benefits-section" href="${homeHref('#benefits-section')}">VeriFactu</a>
        <a data-section="pricing-section" href="${homeHref('#pricing-section')}">Precio</a>

        <div class="nw-more-menu${moreIsActive ? ' is-current' : ''}">
          <button class="nw-more-menu__button${moreIsActive ? ' is-active' : ''}" type="button" aria-expanded="false" aria-controls="nw-more-panel">
            Más
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 7.5 5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="nw-more-menu__panel" id="nw-more-panel">
            <a href="ayuda.html"${pageName === 'ayuda.html' ? ' class="is-active" aria-current="page"' : ''}>
              <span class="nw-more-menu__icon" aria-hidden="true">?</span>
              <span class="nw-more-menu__copy"><strong>Centro de ayuda</strong><small>Respuestas y documentación</small></span>
            </a>
            <a href="guia-primeros-pasos.html"${pageName === 'guia-primeros-pasos.html' ? ' class="is-active" aria-current="page"' : ''}>
              <span class="nw-more-menu__icon" aria-hidden="true">↗</span>
              <span class="nw-more-menu__copy"><strong>Primeros pasos</strong><small>Empieza a utilizar Wavelet</small></span>
            </a>
            <a href="guia-migracion.html"${pageName === 'guia-migracion.html' ? ' class="is-active" aria-current="page"' : ''}>
              <span class="nw-more-menu__icon" aria-hidden="true">⇄</span>
              <span class="nw-more-menu__copy"><strong>Migración</strong><small>Trae los datos de tu taller</small></span>
            </a>
            <a href="guia-verifactu.html"${pageName === 'guia-verifactu.html' ? ' class="is-active" aria-current="page"' : ''}>
              <span class="nw-more-menu__icon" aria-hidden="true">✓</span>
              <span class="nw-more-menu__copy"><strong>Guía VeriFactu</strong><small>Funcionamiento y conceptos clave</small></span>
            </a>
            <div class="nw-more-menu__divider" aria-hidden="true"></div>
            <a href="versiones.html"${pageName === 'versiones.html' ? ' class="is-active" aria-current="page"' : ''}>
              <span class="nw-more-menu__icon" aria-hidden="true">✦</span>
              <span class="nw-more-menu__copy"><strong>Novedades</strong><small>Cambios y versiones de Wavelet</small></span>
            </a>
            <a href="roadmap.html"${pageName === 'roadmap.html' ? ' class="is-active" aria-current="page"' : ''}>
              <span class="nw-more-menu__icon" aria-hidden="true">◇</span>
              <span class="nw-more-menu__copy"><strong>Roadmap</strong><small>Qué estamos preparando</small></span>
            </a>
            <a href="sobre-wavelet.html"${pageName === 'sobre-wavelet.html' ? ' class="is-active" aria-current="page"' : ''}>
              <span class="nw-more-menu__icon" aria-hidden="true">W</span>
              <span class="nw-more-menu__copy"><strong>Sobre Wavelet</strong><small>Conoce el proyecto</small></span>
            </a>
          </div>
        </div>

        <a href="contact.html"${pageName === 'contact.html' ? ' class="is-active" aria-current="page"' : ''}>Contacto</a>
        <a class="nw-nav-cta" href="${homeHref('#download-section')}">Solicitar demo <span aria-hidden="true">→</span></a>
      </nav>
    </div>`;

  const header = document.querySelector('.header');
  const toggle = container.querySelector('.nw-menu-toggle');
  const nav = container.querySelector('.nw-main-nav');
  const links = [...nav.querySelectorAll('[data-section]')];
  const moreMenu = container.querySelector('.nw-more-menu');
  const moreButton = container.querySelector('.nw-more-menu__button');

  const closeMoreMenu = () => {
    moreMenu?.classList.remove('is-open');
    moreButton?.setAttribute('aria-expanded', 'false');
  };

  const closeMenu = (restoreFocus = false) => {
    nav.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
    document.body.classList.remove('menu-open');
    closeMoreMenu();
    if (restoreFocus) toggle.focus();
  };

  toggle.addEventListener('click', () => {
    const opening = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', opening);
    toggle.classList.toggle('is-open', opening);
    toggle.setAttribute('aria-expanded', String(opening));
    toggle.setAttribute('aria-label', opening ? 'Cerrar menú' : 'Abrir menú');
    document.body.classList.toggle('menu-open', opening);
  });

  moreButton?.addEventListener('click', event => {
    event.stopPropagation();
    const opening = !moreMenu.classList.contains('is-open');
    moreMenu.classList.toggle('is-open', opening);
    moreButton.setAttribute('aria-expanded', String(opening));
  });

  nav.addEventListener('click', event => {
    if (event.target.closest('.nw-more-menu__button')) return;
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('click', event => {
    if (!moreMenu?.contains(event.target)) closeMoreMenu();
    if (!container.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (moreMenu?.classList.contains('is-open')) {
      closeMoreMenu();
      moreButton?.focus();
      return;
    }
    if (nav.classList.contains('is-open')) closeMenu(true);
  });
  window.addEventListener('resize', () => { if (innerWidth > 960) closeMenu(); });

  const updateHeader = () => header?.classList.toggle('is-scrolled', scrollY > 8);
  updateHeader();
  addEventListener('scroll', updateHeader, { passive: true });

  if (onHome && 'IntersectionObserver' in window) {
    const sections = links.map(link => document.getElementById(link.dataset.section)).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      const current = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!current) return;
      links.forEach(link => {
        const active = link.dataset.section === current.target.id;
        link.classList.toggle('is-active', active);
        active ? link.setAttribute('aria-current','location') : link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-28% 0px -58% 0px', threshold: [0.05,.2,.5] });
    sections.forEach(section => observer.observe(section));
  }
});

// Navigation build: 2026-07-22-menu-more-v15-audited
