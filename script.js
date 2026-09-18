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
