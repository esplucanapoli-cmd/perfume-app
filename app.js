let allPerfumes = [];

document.addEventListener("DOMContentLoaded", () => {
    loadPerfumes();
});

function loadPerfumes() {
    fetch("perfumes.json")
        .then(r => r.json())
        .then(data => {
            allPerfumes = data;
            displayPerfumes(allPerfumes);
        });
}

function displayPerfumes(list) {
    const grid = document.getElementById("perfumeGrid");
    grid.innerHTML = "";

    list.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("perfume-card");

        card.onclick = () => openModal(p.image, p.name);

        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <div class="perfume-name">${p.name}</div>
        `;

        grid.appendChild(card);
    });
}

function openModal(imgSrc, name) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const caption = document.getElementById("modalCaption");

    modal.style.display = "block";
    modalImg.src = imgSrc;
    caption.innerText = name;
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

function filterPerfumes(category, btn) {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");

    if (category === "all") {
        displayPerfumes(allPerfumes);
    } else {
        displayPerfumes(allPerfumes.filter(p => p.category === category));
    }
}

function searchPerfumes() {
    const q = document.getElementById("searchInput").value.toLowerCase();
    displayPerfumes(allPerfumes.filter(p => p.name.toLowerCase().includes(q)));
}
