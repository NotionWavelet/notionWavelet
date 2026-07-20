document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  var input = document.querySelector('[data-docs-search]');
  var cards = Array.prototype.slice.call(document.querySelectorAll('[data-doc-card]'));
  var empty = document.querySelector('[data-docs-empty]');
  if (!input || !cards.length) return;

  input.addEventListener('input', function () {
    var query = input.value.trim().toLocaleLowerCase('es');
    var visible = 0;
    cards.forEach(function (card) {
      var matches = !query || card.textContent.toLocaleLowerCase('es').indexOf(query) !== -1;
      card.hidden = !matches;
      if (matches) visible += 1;
    });
    if (empty) empty.hidden = visible !== 0;
  });
});
