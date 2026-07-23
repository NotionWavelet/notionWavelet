(() => {
  'use strict';

  const initNavbar = () => {
    const mount = document.getElementById('navbar_container');
    if (!mount || mount.dataset.ready === 'true') return;
    mount.dataset.ready = 'true';

    const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const isHome = file === 'index.html' || file === '';
    const homeLink = (anchor) => isHome ? `#${anchor}` : `index.html#${anchor}`;
    const helpFiles = new Set(['ayuda.html', 'guia-primeros-pasos.html', 'guia-verifactu.html']);
    const isHelp = helpFiles.has(file);

    const activeClass = (condition) => condition ? ' is-active' : '';
    const current = (condition) => condition ? ' aria-current="page"' : '';

    mount.innerHTML = `
      <div class="nw-navbar">
        <a class="nw-navbar__brand" href="index.html" aria-label="Notion Wavelet, ir al inicio">
          <img src="images/logo-wavelet-final.png?v=2" alt="" width="40" height="40">
          <span><strong>Notion Wavelet</strong><small>Gestión para talleres</small></span>
        </a>

        <button class="nw-navbar__toggle" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="nw-navbar-menu">
          <span></span><span></span><span></span>
        </button>

        <nav class="nw-navbar__menu" id="nw-navbar-menu" aria-label="Navegación principal">
          <a class="nw-navbar__mobile-home${activeClass(isHome)}" href="index.html"${current(isHome)}>Inicio</a>
          <a href="${homeLink('funciones')}">Funciones</a>
          <a href="${homeLink('verifactu')}">VeriFactu</a>
          <a class="${activeClass(file === 'guia-migracion.html').trim()}" href="guia-migracion.html"${current(file === 'guia-migracion.html')}>Migración</a>
          <a href="${homeLink('precio')}">Precio</a>

          <div class="nw-navbar__dropdown${activeClass(isHelp)}">
            <button class="nw-navbar__dropdown-toggle" type="button" aria-expanded="false" aria-controls="nw-help-menu">
              Ayuda
              <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5.5 7.5 4.5 4.5 4.5-4.5"/></svg>
            </button>
            <div class="nw-navbar__dropdown-menu" id="nw-help-menu">
              <a href="ayuda.html"${current(file === 'ayuda.html')}><strong>Centro de ayuda</strong><span>Guías y respuestas</span></a>
              <a href="guia-primeros-pasos.html"${current(file === 'guia-primeros-pasos.html')}><strong>Primeros pasos</strong><span>Configuración inicial</span></a>
              <a href="guia-verifactu.html"${current(file === 'guia-verifactu.html')}><strong>Guía VeriFactu</strong><span>Dudas sobre la normativa</span></a>
              <a href="${homeLink('faq-section')}"><strong>Preguntas frecuentes</strong><span>Respuestas rápidas</span></a>
            </div>
          </div>

          <a class="${activeClass(file === 'contact.html').trim()}" href="contact.html"${current(file === 'contact.html')}>Contacto</a>
          <a class="nw-navbar__cta" href="${homeLink('demo')}">Solicitar demo</a>
        </nav>
      </div>`;

    const menu = mount.querySelector('.nw-navbar__menu');
    const toggle = mount.querySelector('.nw-navbar__toggle');
    const dropdown = mount.querySelector('.nw-navbar__dropdown');
    const dropdownToggle = mount.querySelector('.nw-navbar__dropdown-toggle');
    const desktop = window.matchMedia('(min-width: 1201px)');

    const setDropdown = (open) => {
      dropdown.classList.toggle('is-open', open);
      dropdownToggle.setAttribute('aria-expanded', String(open));
    };

    const setMenu = (open) => {
      menu.classList.toggle('is-open', open);
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      document.body.classList.toggle('nw-menu-open', open && !desktop.matches);
      if (!open) setDropdown(false);
    };

    toggle.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
    dropdownToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      setDropdown(!dropdown.classList.contains('is-open'));
    });

    mount.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (link) setMenu(false);
    });

    document.addEventListener('click', (event) => {
      if (!dropdown.contains(event.target)) setDropdown(false);
      if (!mount.contains(event.target) && menu.classList.contains('is-open')) setMenu(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      if (dropdown.classList.contains('is-open')) {
        setDropdown(false);
        dropdownToggle.focus();
      } else if (menu.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
    });

    const resetForViewport = () => setMenu(false);
    if (desktop.addEventListener) desktop.addEventListener('change', resetForViewport);
    else desktop.addListener(resetForViewport);

    const header = document.querySelector('.header');
    const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initNavbar, { once: true });
  else initNavbar();
})();
