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

  /* El desplegable se estiliza aquí para que funcione también al sustituir
     únicamente navbar.js en el proyecto completo. */
  if (!document.querySelector('#nw-more-menu-styles')) {
    const style = document.createElement('style');
    style.id = 'nw-more-menu-styles';
    style.textContent = `
      .nw-more-menu{position:relative;display:flex;align-items:center}
      .nw-more-menu__button{display:inline-flex;align-items:center;gap:6px;border:0;background:transparent;color:inherit;font:inherit;cursor:pointer;padding:10px 2px;white-space:nowrap}
      .nw-more-menu__button svg{width:14px;height:14px;transition:transform .18s ease}
      .nw-more-menu.is-open .nw-more-menu__button svg{transform:rotate(180deg)}
      .nw-more-menu__button.is-active{color:var(--accent,#5b5ce2)}
      .nw-more-menu__panel{position:absolute;z-index:100;top:calc(100% + 12px);right:0;width:300px;padding:10px;border:1px solid rgba(15,23,42,.10);border-radius:16px;background:rgba(255,255,255,.98);box-shadow:0 18px 50px rgba(15,23,42,.16);opacity:0;visibility:hidden;transform:translateY(-6px);transition:opacity .16s ease,transform .16s ease,visibility .16s ease}
      .nw-more-menu.is-open .nw-more-menu__panel{opacity:1;visibility:visible;transform:translateY(0)}
      .nw-more-menu__panel a{display:grid!important;grid-template-columns:36px 1fr;gap:10px;align-items:center;padding:10px!important;border-radius:11px;text-decoration:none}
      .nw-more-menu__panel a:hover,.nw-more-menu__panel a:focus-visible{background:#f5f7fb}
      .nw-more-menu__icon{display:grid;place-items:center;width:36px;height:36px;border-radius:10px;background:#f0f2f8;font-size:17px}
      .nw-more-menu__copy{display:flex;flex-direction:column;gap:2px;line-height:1.2}
      .nw-more-menu__copy strong{font-size:14px;font-weight:650;color:#172033}
      .nw-more-menu__copy small{font-size:12px;color:#687386;font-weight:400}
      .nw-more-menu__divider{height:1px;margin:7px 5px;background:rgba(15,23,42,.08)}
      @media (min-width:961px){
        .nw-more-menu:hover .nw-more-menu__panel,.nw-more-menu:focus-within .nw-more-menu__panel{opacity:1;visibility:visible;transform:translateY(0)}
      }
      @media (max-width:960px){
        .nw-more-menu{display:block;width:100%}
        .nw-more-menu__button{width:100%;justify-content:space-between;padding:12px 0}
        .nw-more-menu__panel{position:static;width:auto;margin:0 0 8px;padding:6px;background:#f7f8fb;border-radius:12px;box-shadow:none;display:none;opacity:1;visibility:visible;transform:none}
        .nw-more-menu.is-open .nw-more-menu__panel{display:block}
        .nw-more-menu__panel a{padding:9px!important}
      }
    `;
    document.head.appendChild(style);
  }

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
        <a data-section="product-section" href="${homeHref('#product-section')}">Capturas</a>
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

// Navigation build: 2026-07-22-menu-more-v12
