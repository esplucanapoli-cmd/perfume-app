const sizePrices = { "3ml":0.25,"30ml":0.6,"50ml":1,"100ml":1.8 };

const products = [
 { name:"ARMANI Si", price:55 },
 { name:"AVENTUS COLOGNE", price:79 }
];

let selectedProduct=null;
let selectedSize=null;

const productsDiv=document.getElementById("products");

products.forEach(p=>{
 const d=document.createElement("div");
 d.innerHTML=`<h3>${p.name}</h3><button>In den Warenkorb</button>`;
 d.querySelector("button").onclick=()=>openSizeModal(p);
 productsDiv.appendChild(d);
});

function openSizeModal(product){
 selectedProduct=product;
 selectedSize=null;
 document.getElementById("modalTitle").innerText=product.name;
 const c=document.getElementById("sizeOptions");
 c.innerHTML="";
 Object.keys(sizePrices).forEach(s=>{
  const price=(product.price*sizePrices[s]).toFixed(2);
  const l=document.createElement("label");
  l.className="size-option";
  l.innerHTML=`<input type="radio" name="size"> ${s} – ${price} €`;
  l.querySelector("input").onchange=()=>selectedSize=s;
  c.appendChild(l);
 });
 document.getElementById("sizeModal").classList.remove("hidden");
}

document.getElementById("confirmAdd").onclick=()=>{
 if(!selectedSize){ alert("Bitte Größe auswählen"); return; }
 closeModal();
 alert(selectedProduct.name+" "+selectedSize+" hinzugefügt");
};

function closeModal(){
 document.getElementById("sizeModal").classList.add("hidden");
}
