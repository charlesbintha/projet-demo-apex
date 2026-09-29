/* DI 1.0.2 : presentation only; APEX keeps escaped report text and access checks. */
(function ($) {
  'use strict';
  const status = {'Nouvelle':'nouvelle','Affectée':'affectee','En cours':'en-cours','Résolue':'resolue','Clôturée':'cloturee'};
  const priority = {'Basse':'basse','Normale':'normale','Haute':'haute','Urgente':'urgente'};
  function decorate() {
    const region = document.getElementById('di-demandes'); // Explicit region Static ID.
    if (!region) return;
    region.querySelectorAll('.a-IRR-table').forEach(function (table) {
      const columns = new Map();
      table.querySelectorAll('th[id]').forEach(function (th) {
        const link = th.querySelector('.a-IRR-headerLink');
        const label = (link || th).textContent.trim();
        if (label === 'Statut') columns.set(th.id, ['di-status', status]);
        if (label === 'Priorité') columns.set(th.id, ['di-priority', priority]);
      });
      table.querySelectorAll('td[headers]').forEach(function (td) {
        if (td.querySelector('[data-di-badge]')) return;
        const id = td.getAttribute('headers').split(/\s+/).find(function (key) { return columns.has(key); });
        if (!id) return;
        const [base, values] = columns.get(id);
        const label = td.textContent.trim();
        if (!Object.prototype.hasOwnProperty.call(values, label)) return;
        const badge = document.createElement('span');
        badge.className = base + ' ' + base + '--' + values[label];
        badge.dataset.diBadge = 'true';
        badge.textContent = label;
        td.replaceChildren(badge);
      });
    });
  }
  $(decorate);
  $(document).on('apexafterrefresh', '#di-demandes', decorate);
})(apex.jQuery);
