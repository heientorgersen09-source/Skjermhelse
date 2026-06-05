/* HMS – delt skript */

/* Mobilmeny */
function toggleNav() {
  var links = document.getElementById('navLinks');
  if (links) links.classList.toggle('open');
}

/* Interaktiv sjekkliste med fremdrift (lagres lokalt hvis mulig) */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var list = document.getElementById('checklist');
    if (!list) return;

    var items = list.querySelectorAll('.item');
    var bar   = document.getElementById('progressBar');
    var label = document.getElementById('progressLabel');
    var KEY   = 'hms-sjekkliste';
    var saved = {};

    try { saved = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { saved = {}; }

    function update() {
      var done = list.querySelectorAll('.item.done').length;
      var total = items.length;
      var pct = total ? Math.round((done / total) * 100) : 0;
      if (bar) bar.style.width = pct + '%';
      if (label) label.textContent = done + ' av ' + total + ' fullført';
    }

    items.forEach(function (item, i) {
      var id = item.getAttribute('data-id') || ('c' + i);
      if (saved[id]) item.classList.add('done');
      function toggle() {
        item.classList.toggle('done');
        saved[id] = item.classList.contains('done');
        try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) {}
        update();
      }
      item.addEventListener('click', toggle);
      item.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'checkbox');
    });

    update();
  });
})();

/* "Last ned PDF": åpner utskrift slik at brukeren kan velge "Lagre som PDF" */
function lastNedSjekkliste() {
  window.print();
}
