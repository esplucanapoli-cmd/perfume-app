document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("grid");
  const modal = document.getElementById("modal");
  const closeBtn = document.getElementById("close");
  const detailName = document.getElementById("detail-name");
  const detailBrand = document.getElementById("detail-brand");
  const detailImg = document.getElementById("detail-img");
  const notesEl = document.getElementById("notes");

  let allPerfumes = [];

  // Duftpyramide als Bild anzeigen (optional)
  function renderPyramid(p) {
    if (!p.pyramidImage) {
      notesEl.innerHTML = "<p>Für dieses Parfüm ist noch keine Duftpyramide hinterlegt.</p>";
      return;
    }

    notesEl.innerHTML = `
      <img
        src="images/${p.pyramidImage}"
        alt="Duftpyramide von ${p.name}"
        class="pyramid-img"
      >
    `;
  }

  function renderPerfumes(list) {
    grid.innerHTML = "";

    list.forEach(p => {
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

  // Daten laden
  fetch("perfumes.json")
    .then(res => res.json())
    .then(data => {
      allPerfumes = data;
      renderPerfumes(allPerfumes);
    })
    .catch(err => {
      console.error("Fehler beim Laden der perfumes.json:", err);
    });

  // Filter (Alle / Herren / Damen / Orientalisch)
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

  // Modal schließen (X)
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Modal schließen beim Klick auf Hintergrund
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});
