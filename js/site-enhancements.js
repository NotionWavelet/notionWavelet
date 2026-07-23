(function(){
  'use strict';
  document.addEventListener('DOMContentLoaded',function(){
    var elements=Array.prototype.slice.call(document.querySelectorAll('.nw-reveal'));
    if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      elements.forEach(function(el){el.classList.add('is-visible');});
      return;
    }
    var observer=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}
      });
    },{threshold:.1,rootMargin:'0px 0px -35px 0px'});
    elements.forEach(function(el){observer.observe(el);});
  });
})();
