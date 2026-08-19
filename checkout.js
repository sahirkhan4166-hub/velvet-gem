const WA = "918582925461";

let cart = [];

try {
  cart = JSON.parse(
    localStorage.getItem("velvetGemCart") || "[]"
  );
} catch (e) {
  cart = [];
}

function money(n) {
  return "₹" + Number(n).toLocaleString("en-IN");
}

function createOrderId() {
  const now = new Date();
  const date =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");

  const random = Math.floor(1000 + Math.random() * 9000);

  return `VG-${date}-${random}`;
}

const box = document.getElementById("items");

function render() {

  if (!cart.length) {

    box.innerHTML = `
      <div class="empty">
        Your bag is empty.<br>
        Return to the shop and add a product.
      </div>
    `;

    document.getElementById("total").textContent = "₹0";

    return;
  }

  box.innerHTML = cart.map(p => `
    <div class="item">

      <img src="${p.img}" alt="${p.name}">

      <div>
        <h3>${p.name}</h3>
        <small>
          Qty: ${p.qty || 1}
        </small>
      </div>

      <b>
        ${money(
          (p.price || 0) *
          (p.qty || 1)
        )}
      </b>

    </div>
  `).join("");

  const total = cart.reduce(
    (sum, p) =>
      sum +
      (p.price || 0) *
      (p.qty || 1),
    0
  );

  document.getElementById("total").textContent =
    money(total);
}


document
  .getElementById("orderForm")
  .addEventListener("submit", function(e) {

    e.preventDefault();

    if (!cart.length) {

      alert(
        "Your bag is empty. Please add a product first."
      );

      return;
    }

    const name =
      document
        .getElementById("name")
        .value
        .trim();

    const phone =
      document
        .getElementById("phone")
        .value
        .replace(/\D/g, "");

    const address =
      document
        .getElementById("address")
        .value
        .trim();

    const city =
      document
        .getElementById("city")
        .value
        .trim();

    const pin =
      document
        .getElementById("pin")
        .value
        .trim();

    const note =
      document
        .getElementById("note")
        .value
        .trim();


    if (!name) {
      alert("Please enter your name.");
      return;
    }

    if (phone.length !== 10) {
      alert(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    if (!address) {
      alert(
        "Please enter your delivery address."
      );
      return;
    }

    if (!city) {
      alert("Please enter your city.");
      return;
    }

    if (!/^\d{6}$/.test(pin)) {
      alert(
        "Please enter a valid 6-digit PIN code."
      );
      return;
    }


    const orderId = createOrderId();

    const productLines = cart
      .map(p =>
        `• ${p.name} × ${p.qty || 1} — ${money(
          (p.price || 0) *
          (p.qty || 1)
        )}`
      )
      .join("\n");


    const total = cart.reduce(
      (sum, p) =>
        sum +
        (p.price || 0) *
        (p.qty || 1),
      0
    );


    const message =
`💎 VELVET GEM — NEW ORDER

🧾 Order ID: ${orderId}

👤 Customer:
${name}

📱 Mobile:
${phone}

🛍️ Products:
${productLines}

💰 Total:
${money(total)}

📍 Delivery Address:
${address}
${city} - ${pin}

${note ? `📝 Order Note:\n${note}\n` : ""}
Please confirm availability and delivery details.

Thank you for choosing Velvet Gem 💎`;


    localStorage.setItem(
      "velvetGemLastOrder",
      JSON.stringify({
        orderId,
        name,
        phone,
        address,
        city,
        pin,
        note,
        total
      })
    );


    window.open(
      "https://wa.me/" +
      WA +
      "?text=" +
      encodeURIComponent(message),
      "_blank"
    );


    // Show confirmation
    box.innerHTML = `
      <div class="confirmation">

        <div style="
          font-size:48px;
          margin-bottom:15px;
        ">
          ✅
        </div>

        <h2>
          Order Ready!
        </h2>

        <p>
          Your order ID is
        </p>

        <strong style="
          font-size:20px;
          letter-spacing:1px;
        ">
          ${orderId}
        </strong>

        <p style="
          margin-top:18px;
          color:#777;
          line-height:1.6;
        ">
          WhatsApp has been opened.
          Please send the prepared message
          to complete your order.
        </p>

        <a
          href="index.html"
          style="
            display:inline-block;
            margin-top:15px;
            padding:13px 20px;
            background:#30231e;
            color:white;
            text-decoration:none;
          "
        >
          ← Continue Shopping
        </a>

      </div>
    `;

  });


render();
