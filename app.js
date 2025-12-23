
let allPerfumes = [];
let currentCategory = "all";

document.addEventListener("DOMContentLoaded", () => {
    loadPerfumes();

    window.addEventListener("click", (e) => {
        if (e.target.id === "imageModal") closeDetail();
        if (e.target.id === "pyramidModal") closePyramid();
    });
});

function loadPerfumes() {
    fetch("./perfumes.json")
        .then(res => res.json())
        .then(data => {
            allPerfumes = data;
            applyCategory();
        })
        .catch(err => console.error("Fehler beim Laden der JSON:", err));
}

function applyCategory() {
    if (currentCategory === "all") {
        displayPerfumes(allPerfumes);
    } else {
        displayPerfumes(
            allPerfumes.filter(p =>
                Array.isArray(p.category)
                    ? p.category.includes(currentCategory)
                    : p.category === currentCategory
            )
        );
    }
}

function filterPerfumes(category, btn) {
    currentCategory = category;

    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");

    const query = document.getElementById("searchInput").value.toLowerCase().trim();

    if (query.length > 0) {
        displayPerfumes(
            allPerfumes.filter(p => p.name.toLowerCase().includes(query))
        );
    } else {
        applyCategory();
    }
}

function searchPerfumes() {
    const query = document.getElementById("searchInput").value.toLowerCase().trim();
    displayPerfumes(
        allPerfumes.filter(p => p.name.toLowerCase().includes(query))
    );
}

function displayPerfumes(list) {
    const grid = document.getElementById("perfumeGrid");
    grid.innerHTML = "";

    if (!list || list.length === 0) {
        grid.innerHTML =
            "<div style='grid-column:1/-1;text-align:center;'>Keine Düfte gefunden.</div>";
        return;
    }

    list.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("perfume-card");

        const img = document.createElement("img");
        img.src = "images/" + p.image;
        img.alt = p.name;
        img.addEventListener("click", () => openDetailImage(p));

        const name = document.createElement("p");
        name.classList.add("perfume-name");
        name.textContent = p.name;

        card.appendChild(img);
        card.appendChild(name);
        grid.appendChild(card);
    });
}

function openDetailImage(p) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");

    modalImg.src = p.pyramid
        ? "detailimage/" + p.pyramid
        : "detailimage/placeholder.jpg";

    modal.style.display = "flex";
}

function closeDetail() {
    document.getElementById("imageModal").style.display = "none";
}

function openPyramid(imagePath) {
    const modal = document.getElementById("pyramidModal");
    const img = document.getElementById("pyramidImage");

    img.src = imagePath
        ? "detailimage/" + imagePath
        : "detailimage/placeholder.jpg";

    modal.style.display = "flex";
}

function closePyramid() {
    document.getElementById("pyramidModal").style.display = "none";
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let selectedProduct = null;

const modal = document.createElement("div");
modal.id = "cart-modal";
modal.innerHTML = `
  <div class="cart-modal-content">
    <h3 id="cart-product-name"></h3>
    <select id="cart-size">
      <option value="3">3 ml</option>
      <option value="30">30 ml</option>
      <option value="50">50 ml</option>
      <option value="100">100 ml</option>
    </select>
    <button id="cart-confirm">Hinzufügen</button>
    <button id="cart-cancel">Abbrechen</button>
  </div>
`;
document.body.appendChild(modal);

document.addEventListener("click", e => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    selectedProduct = e.target.dataset.name;
    document.getElementById("cart-product-name").textContent = selectedProduct;
    modal.classList.add("open");
  }

  if (e.target.id === "cart-cancel") {
    modal.classList.remove("open");
  }

  if (e.target.id === "cart-confirm") {
    const size = document.getElementById("cart-size").value;
    cart.push({ name: selectedProduct, size });
    localStorage.setItem("cart", JSON.stringify(cart));
    modal.classList.remove("open");
  }
});
