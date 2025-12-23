
let cart = JSON.parse(localStorage.getItem("cart")||"[]");

function addToCart(item){
 cart.push(item);
 localStorage.setItem("cart",JSON.stringify(cart));
 alert("Zum Warenkorb hinzugefügt");
}

function cartTotal(){
 return cart.reduce((s,i)=>s+i.price,0).toFixed(2);
}
