let allPerfumes = [];

// Warten, bis das DOM geladen ist
document.addEventListener("DOMContentLoaded", () => {
    loadPerfumes();
});

function loadPerfumes() {
    fetch("perfumes.json")
        .then(response => {
            if (!response.ok) throw new Error("HTTP-Status " + response.status);
            return response.json();
        })
        .then(data => {
            allPerfumes = data;
            displayPerfumes(allPerfumes);
        })
        .catch(err => {
            console.error("Fehler beim Laden:", err);
            document.getElementById("perfumeGrid").innerHTML =
                '<div style="grid-column: 1/-1;color:red;text-align:center;">Fehler beim Laden der Daten.</div>';
        });
}

function displayPerfumes(list) {
    const grid = document.getElementById("perfumeGrid");
    grid.innerHTML = "";
    list.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("perfume-card");
        card.innerHTML = `<img src="${p.image}" alt="${p.name}"><div class="perfume-name">${p.name}</div>`;
        grid.appendChild(card);
    });
}

function filterPerfumes(category, btn) {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
    displayPerfumes(category === "all" ? allPerfumes : allPerfumes.filter(p => p.category === category));
}

function searchPerfumes() {
    const q = document.getElementById("searchInput").value.toLowerCase();
    displayPerfumes(allPerfumes.filter(p => p.name.toLowerCase().includes(q)));
}
