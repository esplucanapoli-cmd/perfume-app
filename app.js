// Parfums laden
fetch("perfumes.json")
    .then(response => response.json())
    .then(data => {
        window.allPerfumes = data;
        displayPerfumes(data);
    });

// Parfums anzeigen
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

// Filter
function filterPerfumes(category) {
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");

    if (category === "all") {
        displayPerfumes(allPerfumes);
    } else {
        displayPerfumes(allPerfumes.filter(p => p.category === category));
    }
}

// Suche
function searchPerfumes() {
    const q = document.getElementById("searchInput").value.toLowerCase();

    const filtered = allPerfumes.filter(p =>
        p.name.toLowerCase().includes(q)
    );

    displayPerfumes(filtered);
}
