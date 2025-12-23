
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


// Warenkorb (localStorage)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount(){
    const countEl = document.getElementById("cart-count");
    if(countEl){
        countEl.textContent = cart.reduce((s,i)=>s+i.qty,0);
    }
}

function addToCart(product){
    const found = cart.find(i=>i.name===product.name);
    if(found){
        found.qty++;
    }else{
        cart.push({...product, qty:1});
    }
    saveCart();
    renderCart();
}

function renderCart(){
    const list=document.getElementById("cart-items");
    if(!list) return;
    list.innerHTML="";
    cart.forEach((item,idx)=>{
        const li=document.createElement("li");
        li.innerHTML = `${item.name} (x${item.qty}) <button data-i="${idx}">✕</button>`;
        list.appendChild(li);
    });
}

document.addEventListener("click",e=>{
    if(e.target.dataset.i){
        cart.splice(e.target.dataset.i,1);
        saveCart();
        renderCart();
    }
});

document.addEventListener("DOMContentLoaded",()=>{
    updateCartCount();
    renderCart();
});
