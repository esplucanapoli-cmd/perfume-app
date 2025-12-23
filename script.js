const products = [
  { name: "ARMANI Si", price: 39.90 },
  { name: "AVENTUS COLOGNE", price: 79.90 }
];

const productsDiv = document.getElementById("products");
const cart = document.getElementById("cart");

products.forEach(p => {
  const div = document.createElement("div");
  div.className = "product";

  const name = document.createElement("h3");
  name.textContent = p.name;

  const price = document.createElement("p");
  price.textContent = p.price.toFixed(2) + " €";

  const btn = document.createElement("button");
  btn.textContent = "In den Warenkorb";
  btn.onclick = () => {
    const li = document.createElement("li");
    li.textContent = p.name + " – " + p.price.toFixed(2) + " €";
    cart.appendChild(li);
  };

  div.append(name, price, btn);
  productsDiv.appendChild(div);
});
