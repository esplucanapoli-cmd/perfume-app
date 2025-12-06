let allPerfumes = [];

// Warten, bis das DOM geladen ist
document.addEventListener("DOMContentLoaded", () => {
    loadPerfumes();
});

// Daten laden
function loadPerfumes() {
    fetch("perfumes.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP-Status " + response.status);
            }
            return response.json();
        })
        .then(data => {
            allPerfumes = data;
            displayPerfumes(allPerfumes);
        })
        .catch(err => {
            console.error("Fehler beim Laden von perfumes.json:", err);
            const grid = document.getElementById("perfumeGrid");
            if (grid) {
                grid.innerHTML = `
                    <div style="grid-column: 1 / -1; color: red; text-align: center;">
                        Fehler beim Laden der Parfüm-Daten. Prüfe, ob die Datei <strong>perfumes.json</strong> im gleichen Ordner liegt
                        und die Seite über einen Webserver (nicht direkt per Doppelklick) geöffnet wird.
                    </div>
                `;
            }
        });
}

// Anzeige der Parfums
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
        img.src = p.image ? p.image : "images/placeholder.jpg";
        img.alt = p.name || "";

        img.addEventListener("click", () => {
            if (p.pyramid) {
                window.open(p.pyramid, "_blank");
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

// Filter-Funktion
function filterPerfumes(category, btn) {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");

    if (category === "all") {
        displayPerfumes(allPerfumes);
    } else {
        const filtered = allPerfumes.filter(p => p.category === category);
        displayPerfumes(filtered);
    }
}

// Suche
function searchPerfumes() {
    const input = document.getElementById("searchInput");
    if (!input) return;

    const q = input.value.toLowerCase();
    const filtered = allPerfumes.filter(p => (p.name || "").toLowerCase().includes(q));
    displayPerfumes(filtered);
}
