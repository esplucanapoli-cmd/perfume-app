let allPerfumes = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch("perfumes.json")
        .then(res => res.json())
        .then(data => {
            allPerfumes = data;
            renderPerfumes(allPerfumes);
        });
});

function renderPerfumes(list) {
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

        // ✅ KLICK AUF KARTE → DETAILIMAGE
        card.addEventListener("click", () => {
            openDetailImage(p.image);
        });

        card.appendChild(img);
        card.appendChild(name);
        grid.appendChild(card);
    });
}

/* ============================= */
/* DETAIL IMAGE MODAL            */
/* ============================= */

function openDetailImage(image) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");

    modalImg.src = "images/" + image;
    modal.style.display = "block";
}

function closeDetail() {
    document.getElementById("imageModal").style.display = "none";
}
