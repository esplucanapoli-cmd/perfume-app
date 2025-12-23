
let perfumes = [];
const grid = document.getElementById("perfumeGrid");
const modal = document.getElementById("cart-modal");
const modalTitle = document.getElementById("cart-product-name");
let selected = null;

fetch("perfumes.json")
  .then(r=>r.json())
  .then(data=>{
    perfumes=data;
    render();
  });

function render(){
  grid.innerHTML="";
  perfumes.forEach(p=>{
    const card=document.createElement("div");
    card.className="perfume-card";
    card.innerHTML=`
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <button class="add-to-cart">In den Warenkorb</button>
    `;
    card.querySelector("button").onclick=()=>{
      selected=p.name;
      modalTitle.textContent=p.name;
      modal.classList.add("open");
    };
    grid.appendChild(card);
  });
}

document.getElementById("cart-cancel").onclick=()=>{
  modal.classList.remove("open");
};
document.getElementById("cart-confirm").onclick=()=>{
  const size=document.getElementById("cart-size").value;
  alert(selected+" ("+size+" ml) hinzugefügt");
  modal.classList.remove("open");
};
