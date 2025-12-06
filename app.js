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
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; color: red; text-align: center;">
                    Fehler beim Laden der Parfüm-Daten. Prüfe, ob die Datei <strong>perfumes.json</strong> im gleichen Ordner liegt
                    und die Seite über einen Webserver (nicht direkt per Doppelklick) geöffnet wird.
                </div>
            `;
        });
}

// Anzeige der Parfums
function displayPerfumes(list) {
    const grid = document.getElementById("perfumeGrid");
    grid.innerHTML = "";

    list.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("perfume-card");

        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <div class="perfume-name">${p.name}</div>
        `;

        grid.appendChild(card);
    });
}

// Filter-Funktion

function filterPerfumes(category, element) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if(element) element.classList.add('active');

    if (category === 'all') {
        renderPerfumes(perfumes);
        return;
    }
    const filtered = perfumes.filter(p => p.category === category);
    renderPerfumes(filtered);
}
 else {
        displayPerfumes(allPerfumes.filter(p => p.category === category));
    }
}

// Suche
function searchPerfumes() {
    const q = document.getElementById("searchInput").value.toLowerCase();
    const filtered = allPerfumes.filter(p => p.name.toLowerCase().includes(q));
    displayPerfumes(filtered);
}
