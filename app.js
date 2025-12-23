let perfumes = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const list = document.getElementById("perfume-list");
const cartItems = document.getElementById("cart-items");

let selectedPerfume = null;
let selectedSize = null;

fetch("perfumes.json")
  .then(res => res.json())
  .then(data => {
    perfumes = data;
    renderPerfumes();
    renderCart();
  });

function renderPerfumes() {
  list.innerHTML = "";
  perfumes.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}">
      <h4>${p.name}</h4>
      <button class="add-to-cart-btn" data-id="${p.id}">In den Warenkorb</button>
    `;
    list.appendChild(card);
  });
}

document.addEventListener("click", e => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    openModal(e.target.dataset.id);
  }
});

function openModal(id) {
  selectedPerfume = perfumes.find(p => p.id == id);
  const select = document.getElementById("size-select");
  select.innerHTML = "";

  Object.entries(selectedPerfume.prices).forEach(([size, price]) => {
    const opt = document.createElement("option");
    opt.value = size;
    opt.textContent = `${size} - ${price} €`;
    select.appendChild(opt);
  });

  selectedSize = select.value;
  updatePrice();

  document.getElementById("modal-title").textContent = selectedPerfume.name;
  document.getElementById("cart-modal").classList.remove("hidden");
}

document.getElementById("size-select").onchange = e => {
  selectedSize = e.target.value;
  updatePrice();
};

function updatePrice() {
  document.getElementById("modal-price").textContent =
    "Preis: " + selectedPerfume.prices[selectedSize] + " €";
}

document.getElementById("close-modal").onclick = () => {
  document.getElementById("cart-modal").classList.add("hidden");
};

document.getElementById("confirm-add").onclick = () => {
  cart.push({
    name: selectedPerfume.name,
    size: selectedSize,
    price: selectedPerfume.prices[selectedSize]
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  document.getElementById("cart-modal").classList.add("hidden");
};

function renderCart() {
  cartItems.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} (${item.size}) – ${item.price} €`;
    cartItems.appendChild(li);
  });
}
