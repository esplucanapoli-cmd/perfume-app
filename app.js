
let allPerfumes = [];
let currentCategory = "all";

// Wenn DOM geladen ist, Daten laden
document.addEventListener("DOMContentLoaded", () => {
    loadPerfumes();
});

// ✅ Lädt die JSON-Datei
function loadPerfumes() {
    fetch("perfumes.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP-Status " + response.status);
            }
            return response.json();
        })
        .then(data => {
            allPerfumes = Array.isArray(data) ? data : [];
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

// ✅ Wendet nur den aktiven Kategorienfilter an
function applyCategory() {
    let list;

    if (currentCategory === "all") {
        list = allPerfumes;
    } else {
        list = allPerfumes.filter(p => p.category === currentCategory);
    }

    displayPerfumes(list);
}

// ✅ Wird von den Filter-Buttons aufgerufen
function filterPerfumes(category, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    currentCategory = category;
    applyCategory();
}

// ✅ Zeigt eine Liste von Parfums im Grid an
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
        // ✅ GITHUB-PAGES-KORREKTER PFAD
        img.src = p.image ? "./images/" + p.image : "./images/placeholder.jpg";
        img.alt = p.name || "";

        img.addEventListener("click", () => {
            if (p.pyramid) {
                openPyramid(p.pyramid);
            } else {
                alert("Für dieses Parfüm ist noch keine Duftpyramide hinterlegt.");
            }
        });

        const nameDiv = document.createElement("div");
        nameDiv.classList.add("perfume-name");
        nameDiv.textContent = p.name || "";

        card.appendChild(img);
        card.appendChild(nameDiv);
        grid.appendChild(card);
    });
}

// ✅ Suche – immer auf ALLE Düfte
function searchPerfumes() {
    const input = document.getElementById("searchInput");
    const query = input ? input.value.trim().toLowerCase() : "";

    if (!query) {
        applyCategory();
        return;
    }

    const filtered = allPerfumes.filter(p =>
        (p.name || "").toLowerCase().includes(query)
    );

    displayPerfumes(filtered);
}

// ✅ Öffnet das Duftpyramiden-Modal
function openPyramid(imagePath) {
    const modal = document.getElementById("pyramidModal");
    const img = document.getElementById("pyramidImage");

    img.src = imagePath; // detailimage/... ist korrekt relativ
    modal.style.display = "block";
}

// ✅ Schließt das Modal
function closePyramid() {
    document.getElementById("pyramidModal").style.display = "none";
}
