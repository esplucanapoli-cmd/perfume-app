let perfumes = [];
let currentFilter = 'all';

fetch('perfumes.json')
  .then(res => res.json())
  .then(data => {
    perfumes = data;
    renderPerfumes(perfumes);
  });

function renderPerfumes(list) {
  const grid = document.getElementById('perfumeGrid');
  grid.innerHTML = '';

  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'perfume-card';
    card.onclick = () => alert(p.name);

    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="perfume-name">${p.name}</div>
    `;
    grid.appendChild(card);
  });
}

function filterPerfumes(type, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentFilter = type;
  applyFilters();
}

function searchPerfumes() {
  applyFilters();
}

function applyFilters() {
  const search = document.getElementById('search').value.toLowerCase();
  const filtered = perfumes.filter(p => {
    const matchType = currentFilter === 'all' || p.category === currentFilter;
    const matchSearch = p.name.toLowerCase().includes(search);
    return matchType && matchSearch;
  });
  renderPerfumes(filtered);
}
