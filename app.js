let perfumes = [];

// JSON laden
fetch("perfumes.json")
    .then(response => response.json())
    .then(data => {
        perfumes = data;
        renderPerfumes(perfumes);
    })
    .catch(err => console.error("JSON konnte nicht geladen werden:", err));


// FILTER-FUNKTION
function filterPerfumes(category, element) {

    // Button-Active-Status aktualisieren
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if (element) element.classList.add('active');

    if (category === "all") {
        renderPerfumes(perfumes);
        return;
    }

    const filtered = perfumes.filter(p => p.category === category);
    renderPerfumes(filtered);
}


// ANZEIGE FUNKTION
function renderPerfumes(list) {

    const container = document.getElementById("perfume-container");
    container.innerHTML = "";

    if (!list || list.length === 0) {
        container.innerHTML = "<p>Keine Düfte gefunden.</p>";
        return;
    }

    list.forEach(p => {
        const item = document.createElement("div");
        item.classList.add("perfume-item");

        const img = document.createElement("img");
        img.src = p.image ? p.image : "images/placeholder.jpg";
        img.alt = p.name;

        img.addEventListener("click", () => {
            if (p.pyramid) {
                window.open(p.pyramid, "_blank");
            } else {
                alert("Keine Duftpyramide vorhanden.");
            }
        });

        const name = document.createElement("p");
        name.textContent = p.name;

        item.appendChild(img);
        item.appendChild(name);
        container.appendChild(item);
    });
}
