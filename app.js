const perfumes = [
  {
    id: 1,
    name: "Baccarat Rouge",
    image: "images/baccarat.png",
    prices: { "3ml": 5, "30ml": 29, "50ml": 45, "100ml": 79 }
  }
];

const list = document.getElementById("perfume-list");
const cartItems = document.getElementById("cart-items");

let selectedPerfume = null;
let selectedSize = null;

function renderPerfumes() {
  list.innerHTML = "";
  perfumes.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}">
      <h4>${p.name}</h4>
      <button onclick="openModal(${p.id})">In den Warenkorb</button>
    `;
    list.appendChild(card);
  });
}

function openModal(id) {
  selectedPerfume = perfumes.find(p => p.id === id);
  const select = document.getElementById("size-select");
  select.innerHTML = "";
  Object.entries(selectedPerfume.prices).forEach(([s, price]) => {
    const o = document.createElement("option");
    o.value = s;
    o.textContent = `${s} - ${price} €`;
    select.appendChild(o);
  });
  selectedSize = select.value;
  updatePrice();
  document.getElementById("modal-title").textContent = selectedPerfume.name;
  document.getElementById("cart-modal").classList.remove("hidden");
}

function updatePrice() {
  document.getElementById("modal-price").textContent =
    "Preis: " + selectedPerfume.prices[selectedSize] + " €";
}

document.getElementById("size-select").onchange = e => {
  selectedSize = e.target.value;
  updatePrice();
};

document.getElementById("close-modal").onclick = () => {
  document.getElementById("cart-modal").classList.add("hidden");
};

document.getElementById("confirm-add").onclick = () => {
  const li = document.createElement("li");
  li.textContent = `${selectedPerfume.name} (${selectedSize}) - ${selectedPerfume.prices[selectedSize]} €`;
  cartItems.appendChild(li);
  document.getElementById("cart-modal").classList.add("hidden");
};

renderPerfumes();
