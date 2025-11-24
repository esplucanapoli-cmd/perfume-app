document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("grid");
  const modal = document.getElementById("modal");
  const closeBtn = document.getElementById("close");
  const detailName = document.getElementById("detail-name");
  const detailBrand = document.getElementById("detail-brand");
  const detailImg = document.getElementById("detail-img");
  const notesEl = document.getElementById("notes");
  const searchInput = document.getElementById("search");
  const filterButtons = document.querySelectorAll(".filter-btn");

  let allPerfumes = [];
  let currentFilter = "all";
  let searchTerm = "";

  // Duftpyramide (Bild + optional Text) rendern
  function renderPyramid(p) {
    // Wenn du ein Bild im JSON hast: "pyramidImage": "ABERCOMBIE FIRECE PYR.jpg"
    if (p.pyramidImage) {
      let html = `
        <img
          src="images/${p.pyramidImage}"
          alt="Duftpyramide von ${p.name}"
          class="pyramid-img"
        >
      `;

      // Optional: gleichzeitig Text-Noten anzeigen, wenn vorhanden
      if (p.top || p.heart || p.base) {
        html += `
          <div class="note-grid">
            <div class="note-col">
              <h3>Kopfnote</h3>
              <p>${p.top || "-"}</p>
            </div>
            <div class="note-col">
              <h3>Herznote</h3>
              <p>${p.heart || "-"}</p>
            </div>
            <div class="note-col">
              <h3>Basisnote</h3>
              <p>${p.base || "-"}</p>
            </div>
          </div>
        `;
      }

      notesEl.innerHTML = html;
      return;
    }

    // Kein Bild, aber evtl. Textnoten
    if (p.top || p.heart || p.base) {
      notesEl.innerHTML = `
        <div class="note-grid">
          <div class="note-col">
            <h3>Kopfnote</h3>
            <p>${p.top || "-"}</p>
          </div>
          <div class="note-col">
            <h3>Herznote</h3>
            <p>${p.heart || "-"}</p>
          </div>
          <div class="note-col">
            <h3>Basisnote</h3>
            <p>${p.base || "-"}</p>
          </div>
        </div>
      `;
      return;
    }

    // Nichts hinterlegt
    notesEl.innerHTML =
      '<p class="notes-empty">Für dieses Parfüm ist noch keine Duftpyramide hinterlegt.</p>';
  }

  // Karten rendern
  function renderPerfumes(list) {
    grid.innerHTML = "";

    list.forEach((p) => {
      const card = document.createElement("div");
      card.className = "card";

      const img = document.createElement("img");
      img.src = "images/" + p.image;
      img.alt = "";

      const title = document.createElement("h3");
      title.textContent = p.name;

      card.appendChild(img);
      card.appendChild(title);

      card.addEventListener("click", () => {
        detailName.textContent = p.name;
        detailBrand.textContent = p.brand || "";
        detailImg.src = "images/" + p.image;
        renderPyramid(p);
        modal.classList.remove("hidden");
      });

      grid.appendChild(card);
    });
  }

  // Filter + Suche kombinieren
  function applyFilters() {
    const term = searchTerm.trim().toLowerCase();

    const filtered = allPerfumes.filter((p) => {
      const matchCategory =
        currentFilter === "all" || p.category === currentFilter;
      const matchSearch =
        !term || p.name.toLowerCase().includes(term);
      return matchCategory && matchSearch;
    });

    renderPerfumes(filtered);
  }

  // Daten laden
  fetch("perfumes.json")
    .then((res) => res.json())
    .then((data) => {
      allPerfumes = data;
      applyFilters();
    })
    .catch((err) => {
      console.error("Fehler beim Laden der perfumes.json:", err);
    });

  // Kategorie-Buttons
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      currentFilter = btn.dataset.filter || "all";
      applyFilters();
    });
  });

  // Suche
  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value;
    applyFilters();
  });

  // Modal schließen
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});
