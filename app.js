let allPerfumes = [];
let currentCategory = "all";

document.addEventListener("DOMContentLoaded", () => {
    fetch("perfumes.json")
        .then(res => res.json())
        .then(data => {
            allPerfumes = data;
            render(allPerfumes);
        });
});

function render(list) {
    const grid = document.getElementById("perfumeGrid");
    grid.innerHTML = "";

    list.forEach(p => {
        const card = document.createElement("div");
        card.className = "perfume-card";

        const img = document.createElement("img");
        img.src = "images/" + p.image;
        img.alt = p.name;

        const name = document.createElement("div");
        name.className = "perfume-name";
        name.textContent = p.name;

        card.appendChild(img);
        card.appendChild(name);

        card.addEventListener("click", () => openDetail(p));

        grid.appendChild(card);
    });
}

function openDetail(p) {
    const modal = document.getElementById("imageModal");
    const img = document.getElementById("modalImg");
    img.src = "images/" + p.image;
    modal.style.display = "block";
}

function closeDetail() {
    document.getElementById("imageModal").style.display = "none";
}

function searchPerfumes() {
    const q = document.getElementById("searchInput").value.toLowerCase();
    render(allPerfumes.filter(p => p.name.toLowerCase().includes(q)));
}

function filterPerfumes(cat, btn) {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    if (cat === "all") {
        render(allPerfumes);
    } else {
        render(allPerfumes.filter(p => p.category === cat));
    }
}
