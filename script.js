const products = [
  {id:1,name:'Heart Gem Necklace',category:'Necklaces',price:699,image:'images/heart-gem-necklace.jpg',description:'A romantic heart pendant with a luminous gemstone centre and delicate gold-toned chain.'},
  {id:2,name:'Leaf Ear Cuff',category:'Earrings',price:599,image:'images/leaf-ear-cuff.jpg',description:'A graceful leaf-inspired ear design made for an elegant, nature-inspired look.'},
  {id:3,name:'Pink Heart Ring',category:'Rings',price:649,image:'images/pink-heart-ring.jpg',description:'A statement heart-shaped pink stone framed with sparkling accents.'},
  {id:4,name:'Pink Gem Pendant',category:'Necklaces',price:799,image:'images/pink-drop-necklace.jpg',description:'A soft pink gemstone pendant with a delicate floral-inspired setting.'},
  {id:5,name:'Pearl Drop Earrings',category:'Earrings',price:599,image:'images/pearl-drop-earrings.jpg',description:'Elegant long-drop earrings with luminous pearl details for a refined finish.'},
  {id:6,name:'Butterfly Crystal Necklace',category:'Necklaces',price:749,image:'images/butterfly-necklace.jpg',description:'A sparkling butterfly pendant with delicate trailing crystal details.'},
  {id:7,name:'Blue Heart Pendant',category:'Necklaces',price:899,image:'images/blue-heart-necklace.jpg',description:'A deep blue heart gemstone surrounded by a fine sparkling border.'},
  {id:8,name:'Leaf Crystal Rings',category:'Rings',price:599,image:'images/leaf-rings.jpg',description:'Nature-inspired leaf rings with delicate crystal accents and a graceful silhouette.'},
  {id:9,name:'Purple Teardrop Pendant',category:'Necklaces',price:799,image:'images/purple-pendant.jpg',description:'A vivid purple teardrop stone set in a sparkling, elegant frame.'},
  {id:10,name:'Butterfly Pearl Earrings',category:'Earrings',price:699,image:'images/butterfly-earrings.jpg',description:'Playful butterfly earrings finished with cascading pearl and chain details.'}
];

let cart = JSON.parse(localStorage.getItem('velvetGemCart') || '[]');
let currentFilter = 'All';

const money = n => `₹${Number(n).toLocaleString('en-IN')}`;
const productById = id => products.find(p => p.id === id);

function saveCart(){ localStorage.setItem('velvetGemCart', JSON.stringify(cart)); updateCartUI(); }
function addToCart(id){
  const existing = cart.find(i => i.id === id);
  if(existing) existing.qty += 1; else cart.push({id,qty:1});
  saveCart(); openCart();
}
function changeQty(id, delta){
  const item = cart.find(i => i.id === id);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0) cart = cart.filter(i => i.id !== id);
  saveCart();
}
function removeFromCart(id){ cart = cart.filter(i => i.id !== id); saveCart(); }

function renderProducts(){
  const grid = document.getElementById('productGrid');
  const list = currentFilter === 'All' ? products : products.filter(p => p.category === currentFilter);
  if(!list.length){grid.innerHTML='<div class="no-results">No products found in this category.</div>';return;}
  grid.innerHTML = list.map(p => `
    <article class="product-card">
      <div class="product-image" data-view="${p.id}">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <button class="quick-view" data-view="${p.id}">QUICK VIEW</button>
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-btn" data-add="${p.id}">ADD TO BAG</button></div>
      </div>
    </article>`).join('');
  grid.querySelectorAll('[data-add]').forEach(btn => btn.addEventListener('click', e => {e.stopPropagation();addToCart(Number(btn.dataset.add));}));
  grid.querySelectorAll('[data-view]').forEach(el => el.addEventListener('click', () => openProduct(Number(el.dataset.view))));
}

function updateCartUI(){
  const count = cart.reduce((sum,i)=>sum+i.qty,0);
  document.getElementById('cartCount').textContent = count;
  const items = document.getElementById('cartItems');
  if(!cart.length){items.innerHTML='<div class="empty-cart"><p>Your bag is waiting for something beautiful.</p><a class="text-link" href="#shop" id="emptyShop">Explore the collection →</a></div>';} else {
    items.innerHTML = cart.map(i => {const p=productById(i.id);return `
      <div class="cart-item">
        <img src="${p.image}" alt="${p.name}">
        <div><h4>${p.name}</h4><p>${money(p.price)}</p><div class="qty"><button data-minus="${p.id}">−</button><span>${i.qty}</span><button data-plus="${p.id}">+</button></div></div>
        <button class="remove" data-remove="${p.id}">Remove</button>
      </div>`}).join('');
    items.querySelectorAll('[data-minus]').forEach(b=>b.onclick=()=>changeQty(Number(b.dataset.minus),-1));
    items.querySelectorAll('[data-plus]').forEach(b=>b.onclick=()=>changeQty(Number(b.dataset.plus),1));
    items.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>removeFromCart(Number(b.dataset.remove)));
  }
  const total = cart.reduce((sum,i)=>{const p=productById(i.id);return sum+p.price*i.qty},0);
  document.getElementById('cartTotal').textContent = money(total);
}

function openCart(){
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartDrawer').setAttribute('aria-hidden','false');
  document.getElementById('cartOverlay').classList.add('show');
}
function closeCart(){
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartDrawer').setAttribute('aria-hidden','true');
  document.getElementById('cartOverlay').classList.remove('show');
}

function openProduct(id){
  const p = productById(id); if(!p) return;
  document.getElementById('modalImage').src=p.image;
  document.getElementById('modalImage').alt=p.name;
  document.getElementById('modalCategory').textContent=p.category;
  document.getElementById('modalName').textContent=p.name;
  document.getElementById('modalPrice').textContent=money(p.price);
  document.getElementById('modalDescription').textContent=p.description;
  document.getElementById('modalAdd').onclick=()=>{addToCart(p.id);closeProduct();};
  document.getElementById('productModal').classList.add('show');
  document.getElementById('productModal').setAttribute('aria-hidden','false');
}
function closeProduct(){document.getElementById('productModal').classList.remove('show');document.getElementById('productModal').setAttribute('aria-hidden','true');}

function orderOnWhatsApp(){
  if(!cart.length){alert('Your bag is empty. Add a product first.');return;}
  let text='Hello Velvet Gem, I would like to place an order:%0A%0A';
  let total=0;
  cart.forEach(i=>{const p=productById(i.id);const line=p.price*i.qty;total+=line;text+=`${encodeURIComponent(p.name)} × ${i.qty} — ${encodeURIComponent(money(line))}%0A`;});
  text += `%0AEstimated subtotal: ${encodeURIComponent(money(total))}%0A%0APlease confirm availability, delivery and final price.`;
  window.open(`https://wa.me/918582925461?text=${text}`,'_blank');
}

document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');currentFilter=btn.dataset.filter;renderProducts();
}));
document.querySelectorAll('.category-card').forEach(card=>card.addEventListener('click',()=>{
  currentFilter=card.dataset.category;document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b.dataset.filter===currentFilter));renderProducts();document.getElementById('shop').scrollIntoView({behavior:'smooth'});
}));
document.getElementById('cartOpen').onclick=openCart;
document.getElementById('cartClose').onclick=closeCart;
document.getElementById('cartOverlay').onclick=closeCart;
document.getElementById('clearCart').onclick=()=>{cart=[];saveCart();};
document.getElementById('whatsappOrder').onclick=orderOnWhatsApp;
document.querySelectorAll('[data-close-modal]').forEach(el=>el.addEventListener('click',closeProduct));
document.querySelector('.menu-toggle').addEventListener('click',()=>{
  const nav=document.querySelector('.nav');const open=nav.classList.toggle('open');document.querySelector('.menu-toggle').setAttribute('aria-expanded',open);
});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.nav').classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();
renderProducts();updateCartUI();
