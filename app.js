const perfumes = [
  { name: "ARMANI MY WAY", category: "damen", image: "images/myway.png" },
  { name: "DIOR SAUVAGE", category: "herren", image: "images/sauvage.png" },
  { name: "BACCARAT ROUGE", category: "unisex", image: "images/baccarat.png" }
];

const container = document.getElementById("perfumeContainer");
const buttons = document.querySelectorAll(".filters button");
const searchInput = document.getElementById("searchInput");

function render(list) {
  container.innerHTML = "";
  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "perfume-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
    `;
    card.onclick = () => alert(p.name);
    container.appendChild(card);
  });
}

buttons.forEach(btn => {
  btn.onclick = () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    if (filter === "alle") render(perfumes);
    else render(perfumes.filter(p => p.category === filter));
  };
});

searchInput.oninput = () => {
  const val = searchInput.value.toLowerCase();
  render(perfumes.filter(p => p.name.toLowerCase().includes(val)));
};

render(perfumes);
