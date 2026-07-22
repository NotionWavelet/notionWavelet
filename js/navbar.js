document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('navbar_container');
  if (!container) return;

  const DESKTOP_BREAKPOINT = 1080;
  const pageName = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const onHome = pageName === '' || pageName === 'index.html';
  const sectionHref = id => onHome ? `#${id}` : `index.html#${id}`;

  const helpPages = new Set(['ayuda.html', 'guia-primeros-pasos.html', 'guia-verifactu.html']);
  const helpActive = helpPages.has(pageName);

  container.innerHTML = `
    <div class="nw-nav__inner">
      <a class="nw-brand" href="index.html" aria-label="Notion Wavelet, ir al inicio">
        <img src="images/logo-wavelet-final.png?v=2" alt="" width="42" height="42">
        <span class="nw-brand__copy">
          <strong>Notion Wavelet</strong>
          <small>Gestión para talleres</small>
        </span>
      </a>

      <button class="nw-menu-toggle" type="button" aria-expanded="false" aria-controls="nw-main-nav" aria-label="Abrir menú">
        <span></span><span></span><span></span>
      </button>

      <nav class="nw-main-nav" id="nw-main-nav" aria-label="Navegación principal">
        <a class="nw-mobile-home${onHome ? ' is-active' : ''}" href="index.html"${onHome ? ' aria-current="page"' : ''}>Inicio</a>
        <a data-section="funciones" href="${sectionHref('funciones')}">Funciones</a>
        <a data-section="verifactu" href="${sectionHref('verifactu')}">VeriFactu</a>
        <a href="guia-migracion.html"${pageName === 'guia-migracion.html' ? ' class="is-active" aria-current="page"' : ''}>Migración</a>
        <a data-section="precio" href="${sectionHref('precio')}">Precio</a>

        <div class="nw-help-menu${helpActive ? ' is-current' : ''}">
          <button class="nw-help-menu__button${helpActive ? ' is-active' : ''}" type="button" aria-expanded="false" aria-controls="nw-help-panel">
            Ayuda
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 7.5 5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="nw-help-menu__panel" id="nw-help-panel" role="menu">
            <p class="nw-help-menu__title">Ayuda y documentación</p>
            <a role="menuitem" href="ayuda.html"${pageName === 'ayuda.html' ? ' class="is-active" aria-current="page"' : ''}>
              <span class="nw-help-menu__icon" aria-hidden="true">?</span>
              <span><strong>Centro de ayuda</strong><small>Todas las guías y respuestas</small></span>
            </a>
            <a role="menuitem" href="guia-primeros-pasos.html"${pageName === 'guia-primeros-pasos.html' ? ' class="is-active" aria-current="page"' : ''}>
              <span class="nw-help-menu__icon" aria-hidden="true">1</span>
              <span><strong>Primeros pasos</strong><small>Configuración inicial de Wavelet</small></span>
            </a>
            <a role="menuitem" href="guia-verifactu.html"${pageName === 'guia-verifactu.html' ? ' class="is-active" aria-current="page"' : ''}>
              <span class="nw-help-menu__icon" aria-hidden="true">✓</span>
              <span><strong>Guía VeriFactu</strong><small>Información sobre la normativa</small></span>
            </a>
            <a role="menuitem" href="${sectionHref('faq-section')}">
              <span class="nw-help-menu__icon" aria-hidden="true">i</span>
              <span><strong>Preguntas frecuentes</strong><small>Respuestas rápidas sobre el servicio</small></span>
            </a>
          </div>
        </div>

        <a href="contact.html"${pageName === 'contact.html' ? ' class="is-active" aria-current="page"' : ''}>Contacto</a>
        <a class="nw-nav-cta" data-section="demo" href="${sectionHref('demo')}">Solicitar demo</a>
      </nav>
    </div>`;

  const header = document.querySelector('.header');
  const nav = container.querySelector('.nw-main-nav');
  const toggle = container.querySelector('.nw-menu-toggle');
  const helpMenu = container.querySelector('.nw-help-menu');
  const helpButton = container.querySelector('.nw-help-menu__button');
  const sectionLinks = [...container.querySelectorAll('[data-section]')];

  const isDesktop = () => window.innerWidth > DESKTOP_BREAKPOINT;

  const closeHelp = () => {
    helpMenu?.classList.remove('is-open');
    helpButton?.setAttribute('aria-expanded', 'false');
  };

  const closeNav = ({ restoreFocus = false } = {}) => {
    nav.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
    document.body.classList.remove('menu-open');
    closeHelp();
    if (restoreFocus) toggle.focus();
  };

  const openNav = () => {
    nav.classList.add('is-open');
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Cerrar menú');
    document.body.classList.add('menu-open');
  };

  const scrollToSection = (id, { historyMode = 'push', smooth = true } = {}) => {
    const target = document.getElementById(id);
    if (!target) return false;
    const offset = (header?.getBoundingClientRect().height || 72) + 16;
    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
    window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
    if (historyMode === 'push') history.pushState(null, '', `#${id}`);
    if (historyMode === 'replace') history.replaceState(null, '', `#${id}`);
    return true;
  };

  toggle.addEventListener('click', () => {
    nav.classList.contains('is-open') ? closeNav() : openNav();
  });

  helpButton?.addEventListener('click', event => {
    event.stopPropagation();
    const opening = !helpMenu.classList.contains('is-open');
    helpMenu.classList.toggle('is-open', opening);
    helpButton.setAttribute('aria-expanded', String(opening));
  });

  container.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href') || '';

    if (onHome && href.startsWith('#')) {
      const id = href.slice(1);
      if (document.getElementById(id)) {
        event.preventDefault();
        closeNav();
        scrollToSection(id);
        return;
      }
    }

    closeNav();
  });

  document.addEventListener('click', event => {
    if (!helpMenu?.contains(event.target)) closeHelp();
    if (!container.contains(event.target) && nav.classList.contains('is-open')) closeNav();
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (helpMenu?.classList.contains('is-open')) {
      closeHelp();
      helpButton?.focus();
      return;
    }
    if (nav.classList.contains('is-open')) closeNav({ restoreFocus: true });
  });

  window.addEventListener('resize', () => {
    if (isDesktop()) closeNav();
  }, { passive: true });

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (onHome && window.location.hash) {
    const id = decodeURIComponent(window.location.hash.slice(1));
    requestAnimationFrame(() => setTimeout(() => scrollToSection(id, { historyMode: 'none', smooth: false }), 80));
  }

  window.addEventListener('hashchange', () => {
    if (!onHome) return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    scrollToSection(id, { historyMode: 'none', smooth: true });
  });

  if (onHome && 'IntersectionObserver' in window) {
    const observedLinks = sectionLinks.filter(link => link.dataset.section !== 'demo');
    const sections = observedLinks.map(link => document.getElementById(link.dataset.section)).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      observedLinks.forEach(link => {
        const active = link.dataset.section === visible.target.id;
        link.classList.toggle('is-active', active);
        active ? link.setAttribute('aria-current', 'location') : link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-28% 0px -62% 0px', threshold: [0, 0.05, 0.2, 0.45] });
    sections.forEach(section => observer.observe(section));
  }
});
// Navigation build: 2026-07-22-v21-responsive-audit
