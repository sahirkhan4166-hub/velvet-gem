const products = [
  {id:1,name:"Heart Gem Necklace",category:"Necklaces",price:899,img:"images/heart-gem-necklace.jpg",tag:"Bestseller"},
  {id:2,name:"Blue Heart Necklace",category:"Necklaces",price:999,img:"images/blue-heart-necklace.jpg",tag:"New"},
  {id:3,name:"Butterfly Necklace",category:"Necklaces",price:949,img:"images/butterfly-necklace.jpg",tag:"Popular"},
  {id:4,name:"Pink Drop Necklace",category:"Pendants",price:799,img:"images/pink-drop-necklace.jpg",tag:"New"},
  {id:5,name:"Leaf Ear Cuff",category:"Earrings",price:699,img:"images/leaf-ear-cuff.jpg",tag:"Elegant"},
  {id:6,name:"Butterfly Earrings",category:"Earrings",price:749,img:"images/butterfly-earrings.jpg",tag:"Popular"},
  {id:7,name:"Pearl Drop Earrings",category:"Earrings",price:849,img:"images/pearl-drop-earrings.jpg",tag:"Bestseller"},
  {id:8,name:"Pink Heart Ring",category:"Rings",price:899,img:"images/pink-heart-ring.jpg",tag:"New"},
  {id:9,name:"Leaf Ring",category:"Rings",price:749,img:"images/leaf-rings.jpg",tag:"Elegant"},
  {id:10,name:"Purple Gem Pendant",category:"Pendants",price:899,img:"images/purple-pendant.jpg",tag:"Popular"}
];

let filter = "All";
let cart = JSON.parse(localStorage.getItem("velvetGemCart") || "[]");

const grid = document.getElementById("productGrid");
const count = document.getElementById("cartCount");

function money(n) {
  return "₹" + Number(n).toLocaleString("en-IN");
}

function saveCart() {
  localStorage.setItem("velvetGemCart", JSON.stringify(cart));
}

function renderProducts() {
  const search = (document.getElementById("searchInput")?.value || "").toLowerCase();

  const list = products.filter(p =>
    (filter === "All" || p.category === filter) &&
    (p.name + " " + p.category).toLowerCase().includes(search)
  );

  grid.innerHTML = list.length
    ? list.map(p => `
      <article class="product-card">
        <div class="product-img">
          <img src="${p.img}" alt="${p.name}" loading="lazy">
          <span class="tag">${p.tag}</span>
        </div>
        <div class="product-info">
          <h3>${p.name}</h3>
          <div class="price">${money(p.price)}</div>
          <a class="view-product" href="product.html?id=${p.id}">
          View Product
          </a>
          <button class="add" onclick="addToCart(${p.id})">
            Add to bag
          </button>
        </div>
      </article>
    `).join("")
    : "<p>No jewellery found.</p>";
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(p => p.id === id);

  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({...product, qty: 1});
  }

  saveCart();
  renderCart();
  openCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function changeQty(index, amount) {
  cart[index].qty = (cart[index].qty || 1) + amount;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
  renderCart();
}

function renderCart() {
  count.textContent = cart.reduce((sum, p) => sum + (p.qty || 1), 0);

  const box = document.getElementById("cartItems");

  if (!cart.length) {
    box.innerHTML = `
      <p style="color:#887d75;padding:25px 0">
        Your bag is empty. Add something beautiful ✨
      </p>
    `;

    document.getElementById("cartTotal").textContent = "₹0";
    return;
  }

  box.innerHTML = cart.map((p, i) => `
    <div class="cart-row">
      <img src="${p.img}" alt="${p.name}">

      <div>
        <h4>${p.name}</h4>
        <small>${money(p.price)}</small>

        <div style="margin-top:8px">
          <button onclick="changeQty(${i},-1)">−</button>
          <b style="margin:0 8px">${p.qty || 1}</b>
          <button onclick="changeQty(${i},1)">+</button>
        </div>
      </div>

      <button class="remove" onclick="removeItem(${i})">
        Remove
      </button>
    </div>
  `).join("");

  const total = cart.reduce(
    (sum, p) => sum + p.price * (p.qty || 1),
    0
  );

  document.getElementById("cartTotal").textContent = money(total);
}

function openCart() {
  document.getElementById("cart").classList.add("open");
  document.getElementById("overlay").classList.add("show");
}

function closeCart() {
  document.getElementById("cart").classList.remove("open");
  document.getElementById("overlay").classList.remove("show");
}

/* Checkout button */
const checkoutButton = document.getElementById("whatsappOrder");

checkoutButton.onclick = () => {
  if (!cart.length) {
    alert("Please add a product to your bag first.");
    return;
  }

  saveCart();

  window.location.href = "checkout.html";
};

/* Filters */
document.querySelectorAll(".filter").forEach(button => {
  button.onclick = () => {
    document.querySelectorAll(".filter")
      .forEach(x => x.classList.remove("active"));

    button.classList.add("active");

    filter = button.dataset.filter;

    renderProducts();
  };
});

/* Categories */
document.querySelectorAll(".category-card").forEach(button => {
  button.onclick = () => {

    filter = button.dataset.category;

    document.querySelectorAll(".filter")
      .forEach(x =>
        x.classList.toggle(
          "active",
          x.dataset.filter === filter
        )
      );

    document.getElementById("shop")
      .scrollIntoView({behavior:"smooth"});

    renderProducts();
  };
});

/* Search */
document.getElementById("searchToggle").onclick = () => {
  document.getElementById("searchBox").classList.toggle("show");
};

document.getElementById("searchInput").oninput = renderProducts;

/* Cart */
document.getElementById("cartOpen").onclick = openCart;
document.getElementById("cartClose").onclick = closeCart;
document.getElementById("overlay").onclick = closeCart;

/* Mobile menu */
document.getElementById("menuBtn").onclick = () => {
  document.getElementById("nav").classList.toggle("open");
};

document.querySelectorAll("nav a").forEach(a => {
  a.onclick = () =>
    document.getElementById("nav").classList.remove("open");
});

document.getElementById("year").textContent =
  new Date().getFullYear();

renderProducts();
renderCart();
