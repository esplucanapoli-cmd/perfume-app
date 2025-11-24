document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("grid");
  const modal = document.getElementById("modal");
  const closeBtn = document.getElementById("close");
  const detailName = document.getElementById("detail-name");
  const detailBrand = document.getElementById("detail-brand");
  const detailImg = document.getElementById("detail-img");
  const notesEl = document.getElementById("notes");

  let allPerfumes = [];

  function renderPerfumes(list) {
    // ALLES löschen, dann neu aufbauen
    grid.innerHTML = "";

    list.forEach(p => {
      const card = document.createElement("div");
      card.className = "perfume-card";

      const img = document.createElement("img");
      img.src = "images/" + p.image;   // <-- WICHTIG: Bildpfad
      img.alt = "";                    // kein doppelter Name mehr

      const title = document.createElement("h3");
      title.textContent = p.name;

      card.appendChild(img);
      card.appendChild(title);

      // Klick für Detail
      card.addEventListener("click", () => {
        detailName.textContent = p.name;
        detailBrand.textContent = p.brand || "";
        notesEl.textContent = p.description || "";
        detailImg.src = "images/" + p.image;
        modal.classList.remove("hidden");
      });

      grid.appendChild(card);
    });
  }

  // Daten aus perfumes.json laden
  fetch("perfumes.json")
    .then(res => res.json())
    .then(data => {
      allPerfumes = data;
      renderPerfumes(allPerfumes);
    })
    .catch(err => {
      console.error("Fehler beim Laden der perfumes.json:", err);
    });

  // Filter-Buttons
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      if (filter === "all") {
        renderPerfumes(allPerfumes);
      } else {
        const filtered = allPerfumes.filter(p => p.category === filter);
        renderPerfumes(filtered);
      }
    });
  });

  // Modal schließen
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
});
