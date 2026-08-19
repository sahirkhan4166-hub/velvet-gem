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

let filter="All", cart=[];
const grid=document.getElementById("productGrid"), count=document.getElementById("cartCount");

function money(n){return "₹"+n.toLocaleString("en-IN")}
function render(){
 const q=(document.getElementById("searchInput")?.value||"").toLowerCase();
 const list=products.filter(p=>(filter==="All"||p.category===filter)&&(p.name+" "+p.category).toLowerCase().includes(q));
 grid.innerHTML=list.length?list.map(p=>`<article class="product-card">
  <div class="product-img"><img src="${p.img}" alt="${p.name}" loading="lazy"><span class="tag">${p.tag}</span></div>
  <div class="product-info"><h3>${p.name}</h3><div class="price">${money(p.price)}</div>
  <button class="add" onclick="addToCart(${p.id})">Add to bag</button></div>
 </article>`).join(""):`<p>No jewellery found.</p>`;
}
function addToCart(id){cart.push(products.find(p=>p.id===id));renderCart();openCart()}
function renderCart(){
 count.textContent=cart.length;
 const box=document.getElementById("cartItems");
 if(!cart.length){box.innerHTML='<p style="color:#887d75;padding:25px 0">Your bag is empty. Add something beautiful ✨</p>';document.getElementById("cartTotal").textContent="₹0";return}
 box.innerHTML=cart.map((p,i)=>`<div class="cart-row"><img src="${p.img}" alt=""><div><h4>${p.name}</h4><small>${money(p.price)}</small></div><button class="remove" onclick="removeItem(${i})">Remove</button></div>`).join("");
 document.getElementById("cartTotal").textContent=money(cart.reduce((s,p)=>s+p.price,0));
}
function removeItem(i){cart.splice(i,1);renderCart()}
function openCart(){document.getElementById("cart").classList.add("open");document.getElementById("overlay").classList.add("show")}
function closeCart(){document.getElementById("cart").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");filter=b.dataset.filter;render()});
document.querySelectorAll(".category-card").forEach(b=>b.onclick=()=>{filter=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter===filter));document.getElementById("shop").scrollIntoView({behavior:"smooth"});render()});
document.getElementById("searchToggle").onclick=()=>document.getElementById("searchBox").classList.toggle("show");
document.getElementById("searchInput").oninput=render;
document.getElementById("cartOpen").onclick=openCart;
document.getElementById("cartClose").onclick=closeCart;
document.getElementById("overlay").onclick=closeCart;
document.getElementById("menuBtn").onclick=()=>document.getElementById("nav").classList.toggle("open");
document.querySelectorAll("nav a").forEach(a=>a.onclick=()=>document.getElementById("nav").classList.remove("open"));
document.getElementById("whatsappOrder").onclick=()=>{
 if(!cart.length){alert("Please add a product to your bag first.");return}
 const lines=cart.map(p=>`• ${p.name} — ${money(p.price)}`).join("\n");
 const total=money(cart.reduce((s,p)=>s+p.price,0));
 const msg=`Hello Velvet Gem! 💎\nI would like to order:\n${lines}\n\nTotal: ${total}\nPlease share availability and delivery details.`;
 window.open("https://wa.me/918582925461?text="+encodeURIComponent(msg),"_blank");
};
document.getElementById("year").textContent=new Date().getFullYear();
render();renderCart();







