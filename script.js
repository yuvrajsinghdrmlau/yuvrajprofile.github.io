document.querySelector('#year').textContent = new Date().getFullYear();

const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.section-nav a')];

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        link.toggleAttribute('aria-current', active);
      });
    });
  }, { rootMargin: '-35% 0px -55%' });
  sections.forEach((section) => observer.observe(section));
}

const universe = document.querySelector('.universe');
if (universe) {
  const nodes = [...universe.querySelectorAll('.node')];
  const search = universe.querySelector('#universe-search');
  const filters = [...universe.querySelectorAll('.cluster-filter')];
  const edges = universe.querySelector('.edges');
  const title = universe.querySelector('#universe-insight-title');
  const meta = universe.querySelector('#universe-insight-meta');
  const copy = universe.querySelector('#universe-insight-copy');
  let activeFilter = 'all';

  const updateInsight = (node) => {
    nodes.forEach((item) => item.classList.remove('selected'));
    node.classList.add('selected');
    title.textContent = node.dataset.title;
    meta.textContent = node.dataset.meta;
    copy.textContent = node.dataset.description;
  };

  const renderNodes = () => {
    const query = search.value.trim().toLowerCase();
    nodes.forEach((node) => {
      const matchesFilter = activeFilter === 'all' || node.dataset.cluster === activeFilter || node.classList.contains('node-core');
      const matchesSearch = !query || `${node.dataset.title} ${node.dataset.description}`.toLowerCase().includes(query);
      node.classList.toggle('is-muted', !(matchesFilter && matchesSearch));
    });
    edges.classList.toggle('is-filtered', Boolean(query) || activeFilter !== 'all');
  };

  nodes.forEach((node) => node.addEventListener('click', () => updateInsight(node)));
  search.addEventListener('input', renderNodes);
  filters.forEach((filter) => filter.addEventListener('click', () => {
    activeFilter = filter.dataset.filter;
    filters.forEach((item) => item.classList.toggle('active', item === filter));
    renderNodes();
  }));

  let zoom = 1;
  const network = universe.querySelector('.network');
  universe.querySelectorAll('[data-zoom]').forEach((control) => control.addEventListener('click', () => {
    const direction = control.dataset.zoom;
    zoom = direction === 'reset' ? 1 : Math.min(1.45, Math.max(.72, zoom + (direction === 'in' ? .12 : -.12)));
    network.style.transform = `scale(${zoom})`;
  }));
}

// Shared visitor and kudos totals for the static GitHub Pages site.
const visitCount = document.querySelector('#visit-count');
const kudosCount = document.querySelector('#kudos-count');
const kudosButton = document.querySelector('#kudos-button');
const kudosStatus = document.querySelector('#kudos-status');
const counterNamespace = 'yuvrajprofile.github.io';
const counterRoot = `https://counterapi.com/api/${counterNamespace}`;

const setCounter = (element, value) => {
  if (element && Number.isFinite(Number(value))) element.textContent = Number(value).toLocaleString('en-IN');
};

if (visitCount && kudosCount) {
  // Count page visits. `unique=true` was intentionally removed: multiple
  // browsers on one device can otherwise remain at 1 by design.
  fetch(`${counterRoot}/view/portfolio`)
    .then((response) => response.json())
    .then((data) => setCounter(visitCount, data.value))
    .catch(() => { visitCount.textContent = '—'; });

  fetch(`${counterRoot}/kudos/total?behavior=vote&readOnly=true`)
    .then((response) => response.json())
    .then((data) => setCounter(kudosCount, data.value))
    .catch(() => { kudosCount.textContent = '—'; });
}

if (kudosButton) {
  const alreadySent = window.localStorage.getItem('yuvraj-kudos-v2-sent') === 'yes';
  if (alreadySent) {
    kudosButton.classList.add('is-sent');
    kudosButton.innerHTML = '<span>✓</span> Kudos sent';
  }
  kudosButton.addEventListener('click', () => {
    if (window.localStorage.getItem('yuvraj-kudos-v2-sent') === 'yes') {
      kudosStatus.textContent = 'You already left a kudos from this browser. Thank you!';
      return;
    }
    kudosButton.disabled = true;
    fetch(`${counterRoot}/kudos/total?behavior=vote`)
      .then((response) => response.json())
      .then((data) => {
        setCounter(kudosCount, data.value);
        window.localStorage.setItem('yuvraj-kudos-v2-sent', 'yes');
        kudosButton.classList.add('is-sent');
        kudosButton.innerHTML = '<span>✓</span> Kudos sent';
        kudosStatus.textContent = 'Thank you for the acknowledgement.';
        kudosStatus.classList.add('is-success');
      })
      .catch(() => {
        kudosButton.disabled = false;
        kudosStatus.textContent = 'Please try again in a moment.';
      });
  });
}

// Three lightweight shared reactions make the acknowledgement section more engaging.
const reactions = [...document.querySelectorAll('.reaction-button')];
reactions.forEach((button) => {
  const reaction = button.dataset.reaction;
  const count = button.querySelector('span');
  fetch(`${counterRoot}/reaction/${reaction}?behavior=vote&readOnly=true`)
    .then((response) => response.json())
    .then((data) => setCounter(count, data.value))
    .catch(() => { count.textContent = '—'; });

  const storageKey = `yuvraj-reaction-v2-${reaction}`;
  if (window.localStorage.getItem(storageKey) === 'yes') {
    button.classList.add('is-sent');
    button.disabled = true;
  }
  button.addEventListener('click', () => {
    if (window.localStorage.getItem(storageKey) === 'yes') return;
    button.disabled = true;
    fetch(`${counterRoot}/reaction/${reaction}?behavior=vote`)
      .then((response) => response.json())
      .then((data) => {
        setCounter(count, data.value);
        window.localStorage.setItem(storageKey, 'yes');
        button.classList.add('is-sent');
      })
      .catch(() => { button.disabled = false; });
  });
});

const journalTabs = [...document.querySelectorAll('.journal-tab')];
const journalCards = [...document.querySelectorAll('.journal-card')];
journalTabs.forEach((tab) => tab.addEventListener('click', () => {
  const filter = tab.dataset.journalFilter;
  journalTabs.forEach((item) => item.classList.toggle('active', item === tab));
  journalCards.forEach((card) => card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.journalType !== filter));
}));
