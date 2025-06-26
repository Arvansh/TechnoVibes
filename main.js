// Product details

const products = [
  {
    id:1,
    name: "Wireless Headphones Pro",
    description: "Premium noise-cancelling wireless headphones with 30-hours battery life",
    price:199.99,
    icon:"🎧"
  },
  {
    id:2,
    name: "Smart Watch Ultra",
    description: "Advanced smartwatch with health monitoring and GPS tracking",
    price:349.00,
    icon:"⌚"
  },
  {
    id:3,
    name: "Gaming Laptop X1",
    description: "High-performance gaming laptop with RTX graphics, 16GBs of RAM and 5TB of huge SSD",
    price:1499.0,
    icon:"💻"
  },
  {
    id:4,
    name: "Smartphone 2.O Pro Max",
    description: "Latest snapdragon 8 elite pro proccessor with 12GBs of RAM and 512GBs of Storage with 5G support and 108Mps of back-camera and 52MPs of front-camera",
    price:659.99,
    icon:"📱"
  },
  {
    id:5,
    name: "Tablet Air 2025",
    description: "Lightweight tablet perfect for work and entertainment",
    price:499.99,
    icon: '📱'
  },
  {
    id:6,
    name: "Wireless Speaker",
    description: "Portable bluetooth speker with 360∘ sound and waterproof design",
    price:149.99,
    icon:"🔊"
  }
];

let cart = [];
function renderProducts(){
  const productgrid = document.getElementById("productGrid");
  productgrid.innerHTML = products.map(product => `
    <div class="product-card">
      <div class="product-image">
        <span>${product.icon}</span>
       </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-decription">${product.description}</p>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <button class="add-to-cart" onclick="addToCart(${product.id})">
          Add to Cart
        </button>
      </div>
    </div>`).join('');
}

function addToCart(productID) {
  const product = products.find(p => p.id === productID);
  const existingItem = cart.find(item => item.id === productID);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({...product, quantity: 1});
  }

  updateCartUI();
  showAddedToCartAnimation();
}

function removeFromCart(productID) {
  cart = cart.filter(item => item.id !== productID);
  updateCartUI();
  renderCart();
}

function updateCartUI(){
  const cartCount = document.getElementById('cartCount');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

function toggleCart(){
  const cartModal = document.getElementById("cartModel");
  cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
  if (cartModal.style.display === 'block') {
    renderCart();
  }
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (cart.length === 0) {
    cartItems.innerHTML = `<p style="text-align: center; color: #666; padding:2rem;">Your cart is empty</p>`;
    cartTotal.textContent = 'Toatl: $0.00';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong><br>
        <small>Quantity: ${item.quantity}</small>
      </div>
      <div style="text-align: right;">
        <div style="color: #667eea; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</div>
        <button onclick="removeFromCart(${item.id})" style="background: #ff4757; color: white; border: none; padding: 0.3rem 0.6rem; border-radius: 4px; cursor: pointer; margin-top: 0.5rem;">Remove</button>
      </div>
    </div>
    `).join('');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function checkout() {
  if(cart.length === 0){
    alert('Your cart is empty!');
    return;
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  alert(`Thank you for your purchse! Total: $${total.toFixed(2)}`);
  cart = [];
  updateCartUI();
  toggleCart();
}

function showAddedToCartAnimation() {
  const cartIcon = document.querySelector('.cart-icon');
  cartIcon.style.transform = 'scale(1.2)';
  setTimeout(() => {
    cartIcon.style.transform = 'scale(1)';
  }, 200);
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  document.getElementById('cartModel').addEventListener('click', e => {
    if (e.target === this) {
      toggleCart();
    }
  });
  
  renderProducts();
});