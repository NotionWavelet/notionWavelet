document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('navbar_container');
  if (!container) return;
  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const home = page === 'index.html' || page === '';
  const href = id => home ? id : `index.html${id}`;
  container.innerHTML = `
    <div class="nw-nav__inner">
      <a class="nw-brand" href="${href('#inicio')}" aria-label="Notion Wavelet, inicio">
        <img src="images/logo-wavelet.png" alt="" width="42" height="42">
        <span class="nw-brand__copy"><strong>Notion Wavelet</strong><small>Software para talleres</small></span>
      </a>
      <button class="nw-menu-toggle" type="button" aria-expanded="false" aria-controls="nw-main-nav" aria-label="Abrir menú"><span></span><span></span><span></span></button>
      <nav class="nw-main-nav" id="nw-main-nav" aria-label="Navegación principal">
        <a data-section="producto" href="${href('#producto')}">Cómo funciona</a>
        <a data-section="funciones" href="${href('#funciones')}">Funciones</a>
        <a data-section="verifactu" href="${href('#verifactu')}">VeriFactu</a>
        <a data-section="capturas" href="${href('#capturas')}">Producto</a>
        <a data-section="precio" href="${href('#precio')}">Precio</a>
        <a data-section="faq" href="${href('#faq')}">FAQ</a>
        <a href="contact.html">Contacto</a>
        <a class="nw-nav-cta" href="${href('#prueba')}">Probar gratis <span>→</span></a>
      </nav>
    </div>`;
  const header = document.querySelector('.header');
  const toggle = container.querySelector('.nw-menu-toggle');
  const nav = container.querySelector('.nw-main-nav');
  function close(){nav.classList.remove('is-open');toggle.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');}
  toggle.addEventListener('click', function(){const open=nav.classList.toggle('is-open');toggle.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',String(open));document.body.classList.toggle('menu-open',open);});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  document.addEventListener('click',e=>{if(!container.contains(e.target))close();});
  addEventListener('scroll',()=>header&&header.classList.toggle('is-scrolled',scrollY>10),{passive:true});
  addEventListener('resize',()=>{if(innerWidth>=992)close();});
});
