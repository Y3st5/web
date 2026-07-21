// Menú hamburguesa responsivo para navegación
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        menuToggle.classList.toggle('open');
    });
    // Cerrar menú al hacer clic en un enlace
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('open');
            menuToggle.classList.remove('open');
        });
    });
}
// Cart functionality
let cart = [];
let cartCount = 0;
let cartTotal = 0;

// DOM elements
const cartButton = document.getElementById('cartButton');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartCountElement = document.getElementById('cartCount');
const cartItemsElement = document.getElementById('cartItems');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
const categorySection = document.querySelectorAll('.category-section');
const searchInput = document.getElementById('searchInput');

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const id = this.dataset.id;
        const name = this.dataset.name;
        const price = parseFloat(this.dataset.price);
        const image = this.dataset.image;

        addToCart({ id, name, price, image });
    });
});
// Agregar producto al carrito
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
}
// Exponer la función globalmente para uso en HTML
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}
window.removeFromCart = removeFromCart;

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartUI();
    }
}
window.updateQuantity = updateQuantity;
// Redondeo comercial al múltiplo de 0.10 más cercano:
// se queda en 0.30 si es < 0.35, sube a 0.40 si es >= 0.35.
function roundUpTo10(value) {
    return Math.round(value / 0.10) * 0.10;
}

// Actualizar la interfaz del carrito
function updateCartUI() {
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const rawTotal = cart.reduce((total, item) => total + Math.round(item.price * item.quantity * 100) / 100, 0);
    cartTotal = roundUpTo10(rawTotal);
    
    cartCountElement.textContent = cartCount;
    subtotalElement.textContent = `S/${cartTotal.toFixed(2)}`;
    totalElement.textContent = `S/${cartTotal.toFixed(2)}`;
    
    // Update cart items display
    cartItemsElement.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 2rem;">🛒 Tu carrito está vacío. ¡Agrega algo delicioso!</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity" value="${item.quantity}" min="1" onchange="updateQuantity('${item.id}', parseInt(this.value))">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                        <button class="quantity-btn" onclick="removeFromCart('${item.id}')" style="margin-left: 0.5rem; color: #dc2626;">🗑️</button>
                    </div>
                </div>
            `;
            cartItemsElement.appendChild(cartItem);
        });
    }
}

// Cart sidebar toggle
cartButton.addEventListener('click', () => {
    cartSidebar.classList.add('open');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
});

// Close cart when clicking outside, pero ignorar clicks en controles de cantidad (mejorado)
document.addEventListener('mousedown', (e) => {
    // Si el click es dentro del sidebar pero sobre controles de cantidad, no cerrar
    if (cartSidebar.contains(e.target)) {
        // Buscar si el target o algún padre tiene la clase quantity-btn o quantity
        let el = e.target;
        while (el && el !== cartSidebar) {
            if (el.classList && (el.classList.contains('quantity-btn') || el.classList.contains('quantity'))) {
                return; // No cerrar
            }
            el = el.parentElement;
        }
    }
    if (!cartSidebar.contains(e.target) && !cartButton.contains(e.target)) {
        cartSidebar.classList.remove('open');
    }
});

// Filter functionality
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        const category = this.dataset.category;
        
        // Update active filter button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Filter products
        if (category === 'todos') {
            categorySection.forEach(section => section.style.display = 'block');
        } else {
            categorySection.forEach(section => {
                if (section.dataset.category === category) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        }
    });
});

// Search functionality
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    productCards.forEach(card => {
        const title = card.querySelector('.product-title').textContent.toLowerCase();
        const description = card.querySelector('.product-description').textContent.toLowerCase();
        const category = card.querySelector('.product-category').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show/hide category sections based on visible products
    categorySection.forEach(section => {
        const visibleProducts = section.querySelectorAll('.product-card[style*="block"], .product-card:not([style*="none"])');
        if (visibleProducts.length > 0) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
});

// Scroll listener for header shadow
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Filters toggle for mobile
const filtersToggle = document.getElementById('filtersToggle');
const filtersContent = document.getElementById('filtersContent');

if (filtersToggle && filtersContent) {
    filtersToggle.addEventListener('click', function() {
        filtersContent.classList.toggle('open');
    });
}

// Checkout via WhatsApp
function proceedToWhatsApp() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío. Agrega productos antes de realizar tu pedido.');
        return;
    }

    // Build message
    let message = '*Pedido - La Casa Del Pan*\n\n';
    message += '*Productos:*\n';
    
    cart.forEach(item => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        message += `• ${item.name}\n`;
        message += `  Cantidad: ${item.quantity} x S/${item.price.toFixed(2)} = S/${itemTotal}\n\n`;
    });
    
    message += `─────────────────\n`;
    message += `*Total: S/${cartTotal.toFixed(2)}*\n\n`;
    message += '¡Gracias por tu preferencia!';
    
    // Encode and open WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/51998956056?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Checkout button event listener
const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', proceedToWhatsApp);
}

// Initialize cart
updateCartUI();

// ==========================================
// PRODUCT MODAL FUNCTIONALITY
// ==========================================

// Modal elements
const productModal = document.getElementById('productModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalAddToCart = document.getElementById('modalAddToCart');
const qtyMinus = document.getElementById('qtyMinus');
const qtyPlus = document.getElementById('qtyPlus');
const modalQuantityInput = document.getElementById('modalQuantityInput');

// Modal data elements
const modalProductImage = document.getElementById('modalProductImage');
const modalBadge = document.getElementById('modalBadge');
const modalCategory = document.getElementById('modalCategory');
const modalTitle = document.getElementById('modalTitle');
const modalRating = document.getElementById('modalRating');
const modalDescription = document.getElementById('modalDescription');
const modalPrice = document.getElementById('modalPrice');

// Current product data
let currentProduct = null;

// Open modal with product data
function openProductModal(card) {
    // Get product data from card
    const imageStyle = card.querySelector('.product-image').style.backgroundImage;
    // Fix the URL extraction - remove url("...") wrapper
    let image = imageStyle.replace(/url\(/g, '').replace(/"/g, '').replace(/\)/g, '');
    
    const category = card.querySelector('.product-category').textContent;
    const title = card.querySelector('.product-title').textContent;
    const description = card.querySelector('.product-description').textContent;
    const priceText = card.querySelector('.product-price').textContent;
    const ratingContainer = card.querySelector('.product-rating');
    const badge = card.querySelector('.product-badge');
    const addToCartBtn = card.querySelector('.add-to-cart');
    
    // Extract rating
    const stars = ratingContainer.querySelectorAll('.star').length;
    const emptyStars = ratingContainer.querySelectorAll('.star.empty').length;
    const fullStars = stars - emptyStars;
    const ratingText = ratingContainer.querySelector('.rating-text').textContent;
    
    // Store current product data
    currentProduct = {
        id: addToCartBtn.dataset.id,
        name: addToCartBtn.dataset.name,
        price: parseFloat(addToCartBtn.dataset.price),
        image: addToCartBtn.dataset.image
    };
    
    // Populate modal
    modalProductImage.src = image;
    modalCategory.textContent = category;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalPrice.textContent = priceText;
    
    // Set badge
    if (badge) {
        modalBadge.textContent = badge.textContent;
        modalBadge.className = 'modal-badge ' + badge.className.replace('product-badge', '');
        modalBadge.style.display = 'block';
    } else {
        modalBadge.style.display = 'none';
    }
    
    // Set rating stars
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHtml += '<div class="star"></div>';
        } else {
            starsHtml += '<div class="star empty"></div>';
        }
    }
    starsHtml += `<span class="rating-text">${ratingText}</span>`;
    modalRating.innerHTML = starsHtml;
    
    // Reset quantity
    modalQuantityInput.value = 1;
    
    // Show modal
    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    productModal.classList.remove('active');
    document.body.style.overflow = '';
    currentProduct = null;
}

// Event listeners for opening modal
document.querySelectorAll('.product-card').forEach(card => {
    // Ensure cursor is pointer
    card.style.cursor = 'pointer';
    
    card.addEventListener('click', function(e) {
        // Don't open modal if clicking on add to cart button
        if (!e.target.closest('.add-to-cart')) {
            openProductModal(this);
        }
    });
});

// Also make cards clickable via onclick as fallback
document.querySelectorAll('.product-card').forEach((card, index) => {
    card.onclick = function(e) {
        if (!e.target.closest('.add-to-cart')) {
            openProductModal(this);
        }
    };
});

// Close modal events
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && productModal.classList.contains('active')) {
        closeModal();
    }
});

// Quantity controls
qtyMinus.addEventListener('click', function() {
    let currentQty = parseInt(modalQuantityInput.value);
    if (currentQty > 1) {
        modalQuantityInput.value = currentQty - 1;
    }
});

qtyPlus.addEventListener('click', function() {
    let currentQty = parseInt(modalQuantityInput.value);
    if (currentQty < 99) {
        modalQuantityInput.value = currentQty + 1;
    }
});

// Add to cart from modal
modalAddToCart.addEventListener('click', function() {
    if (currentProduct) {
        const quantity = parseInt(modalQuantityInput.value);
        
        // Add multiple items based on quantity
        for (let i = 0; i < quantity; i++) {
            addToCart({
                id: currentProduct.id,
                name: currentProduct.name,
                price: currentProduct.price,
                image: currentProduct.image
            });
        }
        
        // Show feedback
        const originalText = this.innerHTML;
        this.innerHTML = '<span class="btn-emoji">✅</span> ¡Agregado!';
        this.style.background = '#059669';
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.style.background = '';
        }, 1500);
        
        // Close modal after adding
        setTimeout(() => {
            closeModal();
        }, 500);
    }
});
