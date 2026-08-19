const WA="918582925461";
function money(n){return "₹"+Number(n).toLocaleString("en-IN")}
let cart=[];try{cart=JSON.parse(localStorage.getItem("velvetGemCart")||"[]")}catch(e){cart=[]}
const box=document.getElementById("items");
function render(){
 if(!cart.length){box.innerHTML='<div class="empty">Your bag is empty.<br>Return to the shop and add a product.</div>';return}
 box.innerHTML=cart.map(p=>`<div class="item"><img src="${p.img}" alt=""><div><h3>${p.name}</h3><small>Qty: ${p.qty||1}</small></div><b>${money((p.price||0)*(p.qty||1))}</b></div>`).join("");
 document.getElementById("total").textContent=money(cart.reduce((s,p)=>s+(p.price||0)*(p.qty||1),0));
}
document.getElementById("orderForm").addEventListener("submit",e=>{
 e.preventDefault();if(!cart.length){alert("Your bag is empty.");return}
 const phone=document.getElementById("phone").value.replace(/\D/g,"");
 if(phone.length<10){alert("Please enter a valid 10-digit mobile number.");return}
 const name=document.getElementById("name").value.trim(),address=document.getElementById("address").value.trim(),city=document.getElementById("city").value.trim(),pin=document.getElementById("pin").value.trim(),note=document.getElementById("note").value.trim();
 const lines=cart.map(p=>`• ${p.name} × ${p.qty||1} — ${money((p.price||0)*(p.qty||1))}`).join("\n");
 const total=money(cart.reduce((s,p)=>s+(p.price||0)*(p.qty||1),0));
 const msg=`💎 VELVET GEM — NEW ORDER\n\nCustomer: ${name}\nMobile: ${phone}\n\nProducts:\n${lines}\n\nTotal: ${total}\n\nDelivery Address:\n${address}\n${city} - ${pin}${note?"\n\nOrder Note:\n"+note:""}\n\nPlease confirm availability and delivery details.`;
 window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(msg),"_blank");
});
render();