let allPerfumes = [];
let currentCategory = "all";

document.addEventListener("DOMContentLoaded", () => {
  fetch("perfumes.json")
    .then(r => r.json())
    .then(data => {
      allPerfumes = data;
      render(allPerfumes);
    });
});

function render(list) {
  const grid = document.getElementById("perfumeGrid");
  grid.innerHTML = "";

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "perfume-card";

    const img = document.createElement("img");
    img.src = "images/" + p.image;
    img.alt = p.name;

    const name = document.createElement("div");
    name.className = "perfume-name";
    name.textContent = p.name;

    card.appendChild(img);
    card.appendChild(name);

    // VARIANTE B: Klick zeigt DETAILIMAGE
    card.addEventListener("click", () => openDetailImage(p.pyramid));

    grid.appendChild(card);
  });
}

function openDetailImage(path) {
  const modal = document.getElementById("imageModal");
  const img = document.getElementById("modalImg");

  if (!path || path === "FEHLT") {
    img.src = "detailimage/placeholder.jpg";
  } else if (path.startsWith("detailimage/")) {
    img.src = path;
  } else {
    img.src = "detailimage/" + path;
  }

  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}

function filterPerfumes(cat, btn) {
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  if (cat === "all") {
    render(allPerfumes);
  } else {
    render(allPerfumes.filter(p => p.category === cat));
  }
}
