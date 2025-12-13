let allPerfumes = [];
let currentCategory = "all";

// -----------------------------------------------------------------------------
// INIT
// -----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    loadPerfumes();
});

// -----------------------------------------------------------------------------
// JSON LADEN
// -----------------------------------------------------------------------------
function loadPerfumes() {
    fetch("perfumes.json")
        .then(res => res.json())
        .then(data => {
            allPerfumes = data;
            applyCategory();
        })
        .catch(err => console.error("Fehler beim Laden der JSON:", err));
}

// -----------------------------------------------------------------------------
// KATEGORIE
// -----------------------------------------------------------------------------
function applyCategory() {
    if (currentCategory === "all") {
        displayPerfumes(allPerfumes);
    } else {
        displayPerfumes(allPerfumes.filter(p => p.category === currentCategory));
    }
}

function filterPerfumes(category, btn) {
    currentCategory = category;

    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");

    const query = document.getElementById("searchInput").value.toLowerCase().trim();

    if (query.length > 0) {
        displayPerfumes(
            allPerfumes.filter(p => p.name.toLowerCase().includes(query))
        );
    } else {
        applyCategory();
    }
}

// -----------------------------------------------------------------------------
// SUCHE
// -----------------------------------------------------------------------------
function searchPerfumes() {
    const query = document.getElementById("searchInput").value.toLowerCase().trim();
    displayPerfumes(
        allPerfumes.filter(p => p.name.toLowerCase().includes(query))
    );
}

// -----------------------------------------------------------------------------
// CARD–GENERATOR
// -----------------------------------------------------------------------------
function displayPerfumes(list) {
    const grid = document.getElementById("perfumeGrid");
    grid.innerHTML = "";

    if (!list || list.length === 0) {
        grid.innerHTML = "<div style='grid-column:1/-1;text-align:center;'>Keine Düfte gefunden.</div>";
        return;
    }

    list.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("perfume-card");

        // ------------------------------
        // BILD
        // ------------------------------
        const img = document.createElement("img");
        img.src = "images/" + p.image;
        img.alt = p.name;

        // DETAIL POPUP KLICKER
        img.addEventListener("click", () => openDetailImage(p));

        // ------------------------------
        // NAME
        // ------------------------------
        const name = document.createElement("p");
        name.classList.add("perfume-name");
        name.textContent = p.name;

        // ------------------------------
        // PYRAMIDE BUTTON
        // ------------------------------
        const pyramidBtn = document.createElement("button");
        pyramidBtn.classList.add("pyramid-btn");
        pyramidBtn.textContent = "🞁 Pyramide";
        pyramidBtn.addEventListener("click", () => openPyramid(p.pyramid));


        // Karte bauen
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(pyramidBtn);

        grid.appendChild(card);
    });
}

// -----------------------------------------------------------------------------
// DETAIL POPUP
// -----------------------------------------------------------------------------
function openDetailImage(p) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");

    if (!p.pyramid || p.pyramid === "FEHLT") {
        modalImg.src = "detailimage/placeholder.jpg";
    } else if (p.pyramid.startsWith("detailimage/")) {
        modalImg.src = p.pyramid;
    } else {
        modalImg.src = "detailimage/" + p.pyramid;
    }

    modal.style.display = "block";
}


document.getElementById("modalClose").addEventListener("click", () => {
    document.getElementById("imageModal").style.display = "none";
});

// -----------------------------------------------------------------------------
// PYRAMID POPUP
// -----------------------------------------------------------------------------
function openPyramid(imagePath) {
    const modal = document.getElementById("pyramidModal");
    const img = document.getElementById("pyramidImage");

    if (!imagePath || imagePath === "FEHLT") {
        img.src = "detailimage/placeholder.jpg";
    } else if (imagePath.startsWith("detailimage/")) {
        img.src = imagePath;
    } else {
        img.src = "detailimage/" + imagePath;
    }

    modal.style.display = "block";
}


function closePyramid() {
    document.getElementById("pyramidModal").style.display = "none";
}

window.addEventListener("click", (e) => {
    if (e.target.id === "pyramidModal") closePyramid();
    if (e.target.id === "imageModal")
        document.getElementById("imageModal").style.display = "none";
});
