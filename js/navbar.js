document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#navbar_container');
  if (!container) return;

  const pageName = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const onHome = pageName === 'index.html' || pageName === '';
  const sectionHref = id => onHome ? `#${id}` : `index.html#${id}`;
  const resourcePages = new Set([
    'ayuda.html','guia-primeros-pasos.html','guia-migracion.html','guia-verifactu.html',
  ]);
  const resourcesActive = resourcePages.has(pageName);

  container.innerHTML = `
    <div class="nw-nav__inner">
      <a class="nw-brand" href="index.html" aria-label="Notion Wavelet, inicio">
        <img src="images/logo-wavelet-final.png?v=2" alt="" width="42" height="42">
        <span class="nw-brand__copy"><strong>Notion Wavelet</strong><small>Gestión para talleres</small></span>
      </a>
      <button class="nw-menu-toggle" type="button" aria-expanded="false" aria-controls="nw-main-nav" aria-label="Abrir menú">
        <span></span><span></span><span></span>
      </button>
      <nav class="nw-main-nav" id="nw-main-nav" aria-label="Navegación principal">
        <a class="nw-mobile-home${onHome ? ' is-active' : ''}" href="index.html"${onHome ? ' aria-current="page"' : ''}>Inicio</a>
        <a data-section="funciones" href="${sectionHref('funciones')}">Funciones</a>
        <a href="capturas.html"${pageName === 'capturas.html' ? ' class="is-active" aria-current="page"' : ''}>Capturas</a>
        <a data-section="verifactu" href="${sectionHref('verifactu')}">VeriFactu</a>
        <a data-section="precio" href="${sectionHref('precio')}">Precio</a>

        <div class="nw-more-menu${resourcesActive ? ' is-current' : ''}">
          <button class="nw-more-menu__button${resourcesActive ? ' is-active' : ''}" type="button" aria-expanded="false" aria-controls="nw-more-panel">
            Ayuda
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 7.5 5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="nw-more-menu__panel" id="nw-more-panel">
            <a href="ayuda.html"${pageName === 'ayuda.html' ? ' class="is-active" aria-current="page"' : ''}>
              <span class="nw-more-menu__icon" aria-hidden="true">?</span>
              <span class="nw-more-menu__copy"><strong>Centro de ayuda</strong><small>Guías y respuestas en un único lugar</small></span>
            </a>
            <a href="guia-primeros-pasos.html"${pageName === 'guia-primeros-pasos.html' ? ' class="is-active" aria-current="page"' : ''}>
              <span class="nw-more-menu__icon" aria-hidden="true">1</span>
              <span class="nw-more-menu__copy"><strong>Primeros pasos</strong><small>Empieza a trabajar con Wavelet</small></span>
            </a>
            <a href="guia-migracion.html"${pageName === 'guia-migracion.html' ? ' class="is-active" aria-current="page"' : ''}>
              <span class="nw-more-menu__icon" aria-hidden="true">⇄</span>
              <span class="nw-more-menu__copy"><strong>Migración de datos</strong><small>Cambia de programa con acompañamiento</small></span>
            </a>
            <a href="guia-verifactu.html"${pageName === 'guia-verifactu.html' ? ' class="is-active" aria-current="page"' : ''}>
              <span class="nw-more-menu__icon" aria-hidden="true">✓</span>
              <span class="nw-more-menu__copy"><strong>Guía VeriFactu</strong><small>Funcionamiento explicado con claridad</small></span>
            </a>
          </div>
        </div>

        <a href="contact.html"${pageName === 'contact.html' ? ' class="is-active" aria-current="page"' : ''}>Contacto</a>
        <a class="nw-nav-cta" data-section="demo" href="${sectionHref('demo')}">Solicitar demo</a>
      </nav>
    </div>`

  const header = document.querySelector('.header');
  const toggle = container.querySelector('.nw-menu-toggle');
  const nav = container.querySelector('.nw-main-nav');
  const sectionLinks = [...nav.querySelectorAll('[data-section]')];
  const moreMenu = container.querySelector('.nw-more-menu');
  const moreButton = container.querySelector('.nw-more-menu__button');

  const closeMoreMenu = () => {
    moreMenu?.classList.remove('is-open');
    moreButton?.setAttribute('aria-expanded', 'false');
  };
  const closeMenu = (restoreFocus = false) => {
    nav.classList.remove('is-open'); toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menú');
    document.body.classList.remove('menu-open'); closeMoreMenu();
    if (restoreFocus) toggle.focus();
  };
  const scrollToSection = (id, updateHistory = true) => {
    const target = document.getElementById(id);
    if (!target) return false;
    const offset = (header?.getBoundingClientRect().height || 76) + 12;
    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
    window.scrollTo({ top, behavior: 'smooth' });
    if (updateHistory) history.pushState(null, '', `#${id}`);
    return true;
  };

  toggle.addEventListener('click', () => {
    const opening = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', opening); toggle.classList.toggle('is-open', opening);
    toggle.setAttribute('aria-expanded', String(opening)); toggle.setAttribute('aria-label', opening ? 'Cerrar menú' : 'Abrir menú');
    document.body.classList.toggle('menu-open', opening);
  });
  moreButton?.addEventListener('click', event => {
    event.stopPropagation();
    const opening = !moreMenu.classList.contains('is-open');
    moreMenu.classList.toggle('is-open', opening); moreButton.setAttribute('aria-expanded', String(opening));
  });

  if (onHome) {
    container.addEventListener('click', event => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute('href').slice(1);
      if (!document.getElementById(id)) return;
      event.preventDefault(); closeMenu(); scrollToSection(id);
    });
    if (location.hash) {
      const id = location.hash.slice(1);
      requestAnimationFrame(() => setTimeout(() => scrollToSection(id, false), 40));
    }
  }

  nav.addEventListener('click', event => {
    if (event.target.closest('.nw-more-menu__button')) return;
    if (event.target.closest('a') && !event.target.closest('a[href^="#"]')) closeMenu();
  });
  document.addEventListener('click', event => {
    if (!moreMenu?.contains(event.target)) closeMoreMenu();
    if (!container.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (moreMenu?.classList.contains('is-open')) { closeMoreMenu(); moreButton?.focus(); return; }
    if (nav.classList.contains('is-open')) closeMenu(true);
  });
  window.addEventListener('resize', () => { if (innerWidth > 960) closeMenu(); });

  const updateHeader = () => header?.classList.toggle('is-scrolled', scrollY > 8);
  updateHeader(); addEventListener('scroll', updateHeader, { passive: true });

  if (onHome && 'IntersectionObserver' in window) {
    const observedLinks = sectionLinks.filter(link => link.dataset.section !== 'demo');
    const sections = observedLinks.map(link => document.getElementById(link.dataset.section)).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      const current = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
      if (!current) return;
      observedLinks.forEach(link => {
        const active = link.dataset.section === current.target.id;
        link.classList.toggle('is-active', active);
        active ? link.setAttribute('aria-current','location') : link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-20% 0px -68% 0px', threshold: [0, .1, .25] });
    sections.forEach(section => observer.observe(section));
  }
});
// Navigation build: 2026-07-22-v17-clean
