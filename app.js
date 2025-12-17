const container = document.getElementById("perfume-container");
let perfumes = [];

fetch("perfumes.json")
  .then(res => res.json())
  .then(data => {
    perfumes = data;
    renderPerfumes(perfumes);
  });

function renderPerfumes(list) {
  container.innerHTML = "";

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "perfume-card";

    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
    `;

    container.appendChild(card);
  });
}

function filterCategory(cat) {
  if (cat === "Alle") {
    renderPerfumes(perfumes);
  } else {
    renderPerfumes(perfumes.filter(p => p.category === cat));
  }
}
