// ================= PRODUCTS =================
const products = [
  { id:1, name:"Laptop Pro X", price:105999, oldprice:250000, rating:5.0, category:"laptops", image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853"},
  { id:2, name:"Smartphone Z", price:19500, oldprice:20000, rating:4.9, category:"mobiles", image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"},
  { id:3, name:"Wireless Headphones", price:1500, oldprice:3000, rating:4.5, category:"headphones", image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e"},
  { id:4, name:"Smartwatch 5", price:3000, oldprice:5099, rating:4.6, category:"smartwatch", image:"https://images.unsplash.com/photo-1510017803434-a899398421b3"},
  { id:5, name:"Gaming Laptop G15", price:150763, oldprice:240087, rating:4.9, category:"laptops", image:"https://images.unsplash.com/photo-1603302576837-37561b2e2302"},
  { id:6, name:"Bluetooth Speaker", price:500, oldprice:799, rating:4.2, category:"accessories", image:"https://images.unsplash.com/photo-1589003077984-894e133dabab"},
  { id:7, name:"Mechanical Keyboard", price:700, oldprice:1000, rating:4.2, category:"accessories", image:"https://images.unsplash.com/photo-1518770660439-4636190af475"},
  { id:8, name:"4K Monitor", price:25399, oldprice:55599, rating:4.5, category:"accessories", image:"https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc"},
  { id:9, name:"Drone X200", price:899, oldprice:1599, rating:4.5, category:"accessories", image:"https://images.unsplash.com/photo-1506947411487-a56738267384"},
  { id:10, name:"VR Headset", price:499, oldprice:1500, rating:4.6, category:"accessories", image:"https://images.unsplash.com/photo-1593508512255-86ab42a8e620"},
  { id:11, name:"Tablet", price:599, oldprice:1599, rating:4.2, category:"mobiles", image:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0"},
  { id:12, name:"Smart TV", price:20799, oldprice:52599, rating:4.8, category:"accessories", image:"https://images.unsplash.com/photo-1593784991095-a205069470b6"},
  { id:13, name:"Gaming Mouse", price:1599, oldprice:3000, rating:4.7, category:"accessories", image:"https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7"},
  { id:14, name:"Power Bank", price:529, oldprice:1399, rating:4.2, category:"accessories", image:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"},
  { id:15, name:"USB Hub", price:439, oldprice:1500, rating:4.9, category:"accessories", image:"https://images.unsplash.com/photo-1618424181497-157f25b6ddd5"},
  { id:16, name:"External Hard Drive", price:1129, oldprice:1590, rating:4.6, category:"accessories", image:"https://images.unsplash.com/photo-1580910051074-3eb694886505"},
  { id:17, name:"Webcam", price:489, oldprice:1099, rating:4.7, category:"accessories", image:"https://images.unsplash.com/photo-1593640408182-31c70c8268f5"},
  { id:18, name:"Earbuds", price:999, oldprice:1599, rating:4.2, category:"headphones", image:"https://images.unsplash.com/photo-1590658268037-6bf12165a8df"},
  { id:19, name:"Smart Bulb", price:2065, oldprice:3999, rating:4.5, category:"accessories", image:"https://images.unsplash.com/photo-1558002038-1055907df827"},
  { id:20, name:"WiFi Router", price:1000, oldprice:1599, rating:4.5, category:"accessories", image:"https://images.unsplash.com/photo-1593642532973-d31b6557fa68"}
];

let currentPage = 1;
const itemsPerPage = 6;

// ================= NAVIGATION =================
function goHome() {
  window.location.href = "index.html";
}

function goToProducts() {
  window.location.href = "products.html";
}

function goToCategory(category) {
  window.location.href = `products.html?category=${category}`;
}

// ================= DISPLAY PRODUCTS =================
function displayProducts(list) {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  const start = (currentPage - 1) * itemsPerPage;
  const paginatedItems = list.slice(start, start + itemsPerPage);

  if (paginatedItems.length === 0) {
    productList.innerHTML = "<h3>No products found 😢</h3>";
    return;
  }

  productList.innerHTML = paginatedItems.map(p => {
    const discount = Math.round(((p.oldprice - p.price) / p.oldprice) * 100);

    return `
      <div class="product">
        <img src="${p.image}">
        <h3>${p.name}</h3>

        <div class="rating">
          ${"★".repeat(Math.floor(p.rating))}
          ${"☆".repeat(5 - Math.floor(p.rating))}
          (${p.rating})
        </div>

        <p>
          ₹${p.price}
          <span style="text-decoration:line-through; color:gray;">₹${p.oldprice}</span>
          <span style="color:green;"> ${discount}% OFF</span>
        </p>

        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  }).join("");

  setupPagination(list);
}

// ================= PAGINATION =================
function setupPagination(list) {
  const pagination = document.getElementById("pagination");
  if (!pagination) return;

  pagination.innerHTML = "";

  const pageCount = Math.ceil(list.length / itemsPerPage);

  let prevBtn = document.createElement("button");
  prevBtn.innerHTML = "⬅ Prev";
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    currentPage--;
    displayProducts(list);
  };
  pagination.appendChild(prevBtn);

  for (let i = 1; i <= pageCount; i++) {
    let btn = document.createElement("button");
    btn.innerText = i;
    if (i === currentPage) btn.classList.add("active-page");

    btn.onclick = () => {
      currentPage = i;
      displayProducts(list);
    };

    pagination.appendChild(btn);
  }

  let nextBtn = document.createElement("button");
  nextBtn.innerHTML = "Next ➡";
  nextBtn.disabled = currentPage === pageCount;
  nextBtn.onclick = () => {
    currentPage++;
    displayProducts(list);
  };
  pagination.appendChild(nextBtn);
}

// ================= SEARCH =================
const searchInput = document.getElementById("search-input");
if (searchInput) {
  searchInput.addEventListener("input", function () {
    const value = this.value.toLowerCase();
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(value)
    );
    currentPage = 1;
    displayProducts(filtered);
  });
}

// ================= CART =================
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find(item => item.id === id);

  if (existing) existing.qty++;
  else {
    let product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Added to cart ✅");
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((sum, item) => sum + item.qty, 0);

  let el = document.getElementById("cart-count");
  if (el) el.innerText = count;
}

// ================= CART DISPLAY =================
const cartItems = document.getElementById("cart-items");

if (cartItems) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartItems.innerHTML = "<h3>Your cart is empty 🛒</h3>";
  } else {
    let html = "";
    let total = 0;

    cart.forEach(item => {
      let itemTotal = item.price * item.qty;
      total += itemTotal;

      html += `
        <div class="product">
          <img src="${item.image}">
          <div style="flex:1;">
            <h3>${item.name}</h3>
            <p>₹${item.price} x ${item.qty}</p>

            <button onclick="increaseQty(${item.id})">➕</button>
            <button onclick="decreaseQty(${item.id})">➖</button>
            <button onclick="removeItem(${item.id})">❌</button>
          </div>
        </div>
      `;
    });

    let discount = total * 0.1;
    let finalTotal = total - discount;

    html += `
      <div style="margin-top:20px; text-align:center;">
        <h2>Subtotal: ₹${total}</h2>
        <h2 style="color:green;">Discount: -₹${discount.toFixed(0)}</h2>
        <h2 style="color:#ff9900;">Total: ₹${finalTotal.toFixed(0)}</h2>
      </div>
    `;

    cartItems.innerHTML = html;
  }
}

// ================= ORDER =================
function placeOrder() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  localStorage.removeItem("cart");
  updateCartCount();
  window.location.href = "success.html";
}

// ================= INIT =================
window.onload = () => {
  updateCartCount();

  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  if (category) {
    displayProducts(products.filter(p => p.category === category));
  } else {
    displayProducts(products);
  }
};
