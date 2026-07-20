document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('#navbar_container');
  if (!container) return;
  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const home = page === '' || page === 'index.html';
  const link = id => home ? `#${id}` : `index.html#${id}`;

  container.innerHTML = `
    <div class="v3-nav">
      <a class="v3-brand" href="${link('inicio')}" aria-label="Notion Wavelet, inicio">
        <img src="images/logo-wavelet.svg" alt=""><span><b>Notion Wavelet</b><small>Software para talleres</small></span>
      </a>
      <button class="v3-menu" type="button" aria-label="Abrir menú" aria-expanded="false"><span></span><span></span><span></span></button>
      <nav class="v3-navlinks" aria-label="Navegación principal">
        <a href="${link('producto')}">Producto</a>
        <a href="${link('funciones')}">Funciones</a>
        <a href="${link('verifactu')}" class="v3-nav-vf"><i class="fa fa-check-circle"></i> VeriFactu</a>
        <a href="${link('precio')}">Precio</a>
        <a href="${link('faq')}">Preguntas</a>
        <a href="contact.html">Contacto</a>
        <a class="v3-nav-cta" href="${link('prueba')}">Probar gratis <span>→</span></a>
      </nav>
    </div>`;

  const menu = container.querySelector('.v3-menu');
  const nav = container.querySelector('.v3-navlinks');
  const header = document.querySelector('.header');
  const close = () => { nav.classList.remove('open'); menu.classList.remove('open'); menu.setAttribute('aria-expanded','false'); document.body.classList.remove('menu-open'); };
  menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.classList.toggle('open', open); menu.setAttribute('aria-expanded', String(open)); document.body.classList.toggle('menu-open', open); });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  addEventListener('resize', () => { if (innerWidth > 991) close(); });
  addEventListener('scroll', () => header && header.classList.toggle('is-scrolled', scrollY > 10), {passive:true});
});
