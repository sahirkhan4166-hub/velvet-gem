const products=[
{id:1,name:"Heart Gem Necklace",category:"Necklaces",price:899,img:"images/heart-gem-necklace.jpg",tag:"Bestseller",desc:"A graceful heart-inspired necklace designed to add a refined sparkle to everyday and special occasions."},
{id:2,name:"Blue Heart Necklace",category:"Necklaces",price:999,img:"images/blue-heart-necklace.jpg",tag:"New",desc:"A delicate blue-gem design with an elegant finish for a polished look."},
{id:3,name:"Butterfly Necklace",category:"Necklaces",price:949,img:"images/butterfly-necklace.jpg",tag:"Popular",desc:"A charming butterfly-inspired necklace made for a soft, elegant statement."},
{id:4,name:"Pink Drop Necklace",category:"Pendants",price:799,img:"images/pink-drop-necklace.jpg",tag:"New",desc:"A graceful pink drop pendant with a feminine, timeless appearance."},
{id:5,name:"Leaf Ear Cuff",category:"Earrings",price:699,img:"images/leaf-ear-cuff.jpg",tag:"Elegant",desc:"A stylish leaf-inspired ear cuff that adds a subtle statement to your outfit."},
{id:6,name:"Butterfly Earrings",category:"Earrings",price:749,img:"images/butterfly-earrings.jpg",tag:"Popular",desc:"Beautiful butterfly earrings designed for an elegant everyday look."},
{id:7,name:"Pearl Drop Earrings",category:"Earrings",price:849,img:"images/pearl-drop-earrings.jpg",tag:"Bestseller",desc:"Classic pearl-drop styling with a refined finish for special occasions."},
{id:8,name:"Pink Heart Ring",category:"Rings",price:899,img:"images/pink-heart-ring.jpg",tag:"New",desc:"A romantic pink heart ring with a delicate, elegant profile."},
{id:9,name:"Leaf Ring",category:"Rings",price:749,img:"images/leaf-rings.jpg",tag:"Elegant",desc:"A nature-inspired leaf ring designed for a graceful everyday look."},
{id:10,name:"Purple Gem Pendant",category:"Pendants",price:899,img:"images/purple-pendant.jpg",tag:"Popular",desc:"A vivid purple gem pendant that brings a luxurious touch to your style."}
];

function money(n){return "₹"+Number(n).toLocaleString("en-IN")}
function getId(){
 const p=new URLSearchParams(location.search);
 const id=Number(p.get("id"));
 return products.some(x=>x.id===id)?id:1;
}
const product=products.find(x=>x.id===getId());
let qty=1;

document.title=`${product.name} | Velvet Gem`;
document.getElementById("productImage").src=product.img;
document.getElementById("productImage").alt=product.name;
document.getElementById("productName").textContent=product.name;
document.getElementById("category").textContent=product.category.toUpperCase();
document.getElementById("price").textContent=money(product.price);
document.getElementById("badge").textContent=product.tag;
document.getElementById("description").textContent=product.desc;
document.getElementById("longDescription").textContent=product.desc+" Please contact Velvet Gem on WhatsApp for current availability, delivery options and care guidance.";

function updateQty(){
 document.getElementById("quantity").textContent=qty;
}
document.getElementById("plus").onclick=()=>{qty++;updateQty()};
document.getElementById("minus").onclick=()=>{if(qty>1)qty--;updateQty()};

function addToBag(){
 let cart=[];
 try{cart=JSON.parse(localStorage.getItem("velvetGemCart")||"[]")}catch(e){}
 const found=cart.find(x=>x.id===product.id);
 if(found) found.qty=(found.qty||1)+qty;
 else cart.push({...product,qty});
 localStorage.setItem("velvetGemCart",JSON.stringify(cart));
 updateBag();
 alert(`${product.name} added to your bag.`);
}

function updateBag(){
 let cart=[];
 try{cart=JSON.parse(localStorage.getItem("velvetGemCart")||"[]")}catch(e){}
 document.getElementById("bagCount").textContent=cart.reduce((s,x)=>s+(x.qty||1),0);
}
document.getElementById("addToBag").onclick=addToBag;

document.getElementById("buyNow").onclick=()=>{
 let cart=[];
 try{cart=JSON.parse(localStorage.getItem("velvetGemCart")||"[]")}catch(e){}
 const found=cart.find(x=>x.id===product.id);
 if(found) found.qty=(found.qty||1)+qty;
 else cart.push({...product,qty});
 localStorage.setItem("velvetGemCart",JSON.stringify(cart));
 location.href="checkout.html";
};

const related=products.filter(x=>x.id!==product.id&&x.category===product.category).slice(0,3);
document.getElementById("relatedGrid").innerHTML=related.map(x=>`
<article class="related-card">
<img src="${x.img}" alt="${x.name}" loading="lazy">
<div><h3>${x.name}</h3><p>${money(x.price)}</p><a href="product.html?id=${x.id}">View product</a></div>
</article>`).join("");

updateBag();
