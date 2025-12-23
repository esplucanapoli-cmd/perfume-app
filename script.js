const products = [
  {
    name: "ARMANI Si",
    prices: { "3ml": 9.9, "30ml": 39.9, "50ml": 59.9, "100ml": 99.9 }
  },
  {
    name: "AVENTUS COLOGNE",
    prices: { "3ml": 12.9, "30ml": 49.9, "50ml": 79.9, "100ml": 129.9 }
  }
];

const productsDiv = document.getElementById("products");
let currentProduct = null;
let selectedSize = null;

products.forEach(p => {
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `<strong>${p.name}</strong><br><button>In den Warenkorb</button>`;
  div.querySelector("button").onclick = () => openModal(p);
  productsDiv.appendChild(div);
});

function openModal(product) {
  currentProduct = product;
  selectedSize = null;
  document.getElementById("modal-title").innerText = product.name;
  const sizes = document.getElementById("size-options");
  sizes.innerHTML = "";
  for (const size in product.prices) {
    const btn = document.createElement("button");
    btn.innerText = `${size} – €${product.prices[size]}`;
    btn.onclick = () => selectedSize = size;
    sizes.appendChild(btn);
  }
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

document.getElementById("addToCart").onclick = () => {
  if (!selectedSize) {
    alert("Bitte Größe wählen");
    return;
  }
  alert(currentProduct.name + " (" + selectedSize + ") hinzugefügt");
  closeModal();
};