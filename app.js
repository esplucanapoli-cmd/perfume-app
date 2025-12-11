let allPerfumes = [];
let currentCategory = "all";

// Wenn DOM geladen ist, Daten laden
document.addEventListener("DOMContentLoaded", () => {
    loadPerfumes();
});

function loadPerfumes() {
    fetch("perfumes.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP-Status " + response.status);
            }
            return response.json();
        })
        .then(data => {
            allPerfumes = data || [];
            applyCategory(); // initial "all"
        })
        .catch(err => {
            console.error("Fehler beim Laden von perfumes.json:", err);
            const grid = document.getElementById("perfumeGrid");
            if (grid) {
                grid.innerHTML = `
                    <div style="grid-column: 1 / -1; color: red; text-align: center;">
                        Fehler beim Laden der Parfüm-Daten. Stelle sicher, dass <strong>perfumes.json</strong>
                        im gleichen Ordner wie <strong>index.html</strong> liegt und die Seite über einen Webserver läuft.
                    </div>
                `;
            }
        });
}

// Wendet den aktuellen Kategorienfilter an (ohne Suche)
function applyCategory() {
    let list;
    if (currentCategory === "all") {
        list = allPerfumes;
    } else {
        list = allPerfumes.filter(p => p.category === currentCategory);
    }
    displayPerfumes(list);
}

// Wird von den Buttons aufgerufen
function filterPerfumes(category, btn) {
    currentCategory = category;

    // Active-Button-Style
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    if (btn) {
        btn.classList.add("active");
    }

    const searchInput = document.getElementById("searchInput");
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

    if (query) {
        // Suche durchsucht immer alle Düfte
        const filtered = allPerfumes.filter(p =>
            (p.name || "").toLowerCase().includes(query)
        );
        displayPerfumes(filtered);
    } else {
        applyCategory();
    }
}

// Zeigt Parfums im Grid an
function displayPerfumes(list) {
    const grid = document.getElementById("perfumeGrid");
    if (!grid) return;

    grid.innerHTML = "";

    if (!list || list.length === 0) {
        grid.innerHTML = "<div style='grid-column:1 / -1; text-align:center;'>Keine Düfte gefunden.</div>";
        return;
    }

    list.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("perfume-card");

        const img = document.createElement("img");
        img.src = "images/" + p.image;
        img.alt = p.name || "";

        // Detailbild-Popup öffnen
        img.addEventListener("click", () => {
            const modal = docume
