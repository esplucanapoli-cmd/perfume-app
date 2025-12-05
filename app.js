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

  /* ======================================================
     DUFTPYRAMIDE RENDERN (Bild + Noten)
  ====================================================== */
  function renderPyramid(p) {
    // Bild vorhanden?
    if (p.pyramidImage) {
      let html = `
        <img src="images/${p.pyramidImage}" 
             alt="Duftpyramide von ${p.name}"
             class="pyramid-img">
      `;

      // Falls Noten existieren
      if (p.top || p.heart || p.base) {
        html += `
          <div class="note-grid">
            <div class="note-col"><h3>Kopfnote</h3><p>${p.top || "-"}</p></div>
            <div class="note-col"><h3>Herznote</h3><p>${p.heart || "-"}</p></div>
            <div class="note-col"><h3>Basisnote</h3><p>${p.base || "-"}</p></div>
          </div>`;
      }

      notesEl.innerHTML = html;
      return;
    }

    // Falls kein Bild, aber Noten
    if (p.top || p.heart || p.base) {
      notesEl.innerHTML = `
        <div class="note-grid">
          <div class="note-col"><h3>Kopfnote</h3><p>${p.top || "-"}</p></div>
          <div class="note-col"><h3>Herznote</h3><p>${p.heart || "-"}</p></div>
          <div class="note-col"><h3>Basisnote</h3><p>${p.base || "-"}</p></div>
        </div>`;
      return;
    }

    // Nichts vorhanden
    notesEl.innerHTML =
      '<p class="notes-empty">Für dieses Parfüm ist noch keine Duftpyramide hinterlegt.</p>';
  }

  /* ======================================================
     KARTEN RENDERN
  ====================================================== */
  function renderPerfumes(list) {
    grid.innerHTML = "";

    list.forEach((p) => {
      const card = document.createElement("div");
      card.className = "card";

      const img = document.createElement("img");
      img.src = "images/" + p.image;
      img.alt = p.name;

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

  /* ======================================================
     FILTER + SUCHE KOMBINIERT
     – mit neuer Unisex-Logik
  ====================================================== */
  function applyFilters() {
    const term = searchTerm.trim().toLowerCase();

    const filtered = allPerfumes.filter((p) => {
      const isMen = p.category === "men";
      const isWomen = p.category === "women";
      const isUnisex = p.category === "unisex";

      let matchCategory = false;

      if (currentFilter === "all") {
        matchCategory = true; // alles anzeigen
      } else if (currentFilter === "men") {
        matchCategory = isMen || isUnisex;
      } else if (currentFilter === "women") {
        matchCategory = isWomen || isUnisex;
      }

      const matchSearch = !term || p.name.toLowerCase().includes(term);

      return matchCategory && matchSearch;
    });

    renderPerfumes(filtered);
  }

  /* ======================================================
     JSON LADEN
  ====================================================== */
  fetch("perfumes.json")
    .then((res) => res.json())
    .then((data) => {
      allPerfumes = data;
      applyFilters();
    })
    .catch((err) =>
      console.error("Fehler beim Laden der perfumes.json:", err)
    );

  /* ======================================================
     KATEGORIE-BUTTONS
  ====================================================== */
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      currentFilter = btn.dataset.filter || "all";
      applyFilters();
    });
  });

  /* ======================================================
     SUCHE
  ====================================================== */
  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value;
    applyFilters();
  });

  /* ======================================================
     MODAL SCHLIEßEN
  ====================================================== */
  closeBtn.addEventListener("click", () => modal.classList.add("hidden"));

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });
});
