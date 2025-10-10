const defaultProducts = [
    {
        id: 1,
        title: "Classic White Shirt",
        description: "Premium cotton shirt with a timeless design, perfect for any occasion.",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop",
        price: 79.99,
        category: "Men"
    },
    {
        id: 2,
        title: "Elegant Black Dress",
        description: "Sophisticated evening dress crafted from luxurious fabric.",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
        price: 149.99,
        category: "Women"
    },
    {
        id: 3,
        title: "Casual Denim Jacket",
        description: "Classic denim jacket with a modern fit and premium wash.",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop",
        price: 119.99,
        category: "Unisex"
    },
    {
        id: 4,
        title: "Summer Floral Blouse",
        description: "Lightweight and breathable blouse with beautiful floral patterns.",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
        price: 64.99,
        category: "Women"
    },
    {
        id: 5,
        title: "Premium Leather Belt",
        description: "Handcrafted genuine leather belt with polished buckle.",
        image: "https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=600&h=800&fit=crop",
        price: 45.99,
        category: "Accessories"
    },
    {
        id: 6,
        title: "Slim Fit Chinos",
        description: "Versatile chino pants in premium stretch cotton blend.",
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop",
        price: 89.99,
        category: "Men"
    },
    {
        id: 7,
        title: "Knit Sweater",
        description: "Cozy wool blend sweater for comfortable warmth.",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop",
        price: 94.99,
        category: "Unisex"
    },
    {
        id: 8,
        title: "Designer Sunglasses",
        description: "UV protection sunglasses with elegant frame design.",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=800&fit=crop",
        price: 129.99,
        category: "Accessories"
    }
];

function initializeProducts() {
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
}

function getProducts() {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : defaultProducts;
}

function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.title}" class="product-image" onerror="this.src='https://via.placeholder.com/600x800?text=No+Image'">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${parseFloat(product.price).toFixed(2)}</p>
                <button class="product-btn">View Details</button>
            </div>
        </div>
    `;
}

function displayFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    if (!featuredContainer) return;
    
    const products = getProducts();
    const featured = products.slice(0, 4);
    
    featuredContainer.innerHTML = featured.map(product => createProductCard(product)).join('');
}

function displayAllProducts() {
    const allProductsContainer = document.getElementById('allProducts');
    if (!allProductsContainer) return;
    
    const products = getProducts();
    allProductsContainer.innerHTML = products.map(product => createProductCard(product)).join('');
}

function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const allProductsContainer = document.getElementById('allProducts');
    const noResults = document.getElementById('noResults');
    
    if (!searchInput || !allProductsContainer) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const products = getProducts();
    
    const filtered = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    if (filtered.length === 0) {
        allProductsContainer.style.display = 'none';
        noResults.style.display = 'block';
    } else {
        allProductsContainer.style.display = 'grid';
        noResults.style.display = 'none';
        allProductsContainer.innerHTML = filtered.map(product => createProductCard(product)).join('');
    }
}

function initSearchListener() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', searchProducts);
    }
}

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
}

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

function showPopup() {
    const popupData = localStorage.getItem('discountPopup');
    if (!popupData) return;
    
    const popup = JSON.parse(popupData);
    if (!popup.active) return;
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (popup.display === 'home' && !currentPage.includes('index.html') && currentPage !== '') return;
    if (popup.display === 'products' && !currentPage.includes('products.html')) return;
    
    const popupShown = sessionStorage.getItem('popupShown');
    if (popupShown) return;
    
    const popupOverlay = document.getElementById('discountPopup');
    const popupBody = document.getElementById('popupBody');
    
    if (popupOverlay && popupBody) {
        popupBody.innerHTML = `
            <div class="popup-body" style="background-image: url('${popup.bgImage}');">
                <div class="popup-text">${popup.text}</div>
            </div>
        `;
        
        popupOverlay.classList.add('active');
        sessionStorage.setItem('popupShown', 'true');
    }
}

function closePopup() {
    const popupOverlay = document.getElementById('discountPopup');
    if (popupOverlay) {
        popupOverlay.classList.remove('active');
    }
}

function showBanner() {
    const bannerData = localStorage.getItem('promoBanner');
    if (!bannerData) return;
    
    const banner = JSON.parse(bannerData);
    if (!banner.active) return;
    
    const bannerClosed = sessionStorage.getItem('bannerClosed');
    if (bannerClosed) return;
    
    const bannerContainer = document.getElementById('promoBanner');
    if (!bannerContainer) return;
    
    const content = banner.link ? 
        `<a href="${banner.link}" target="_blank">${banner.text}</a>` : 
        banner.text;
    
    bannerContainer.innerHTML = `
        ${content}
        <span class="banner-close" onclick="closeBanner()">&times;</span>
    `;
    
    bannerContainer.className = `promo-banner banner-${banner.bgColor} banner-${banner.animation}`;
    bannerContainer.style.display = 'block';
}

function closeBanner() {
    const bannerContainer = document.getElementById('promoBanner');
    if (bannerContainer) {
        bannerContainer.style.display = 'none';
        sessionStorage.setItem('bannerClosed', 'true');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeProducts();
    displayFeaturedProducts();
    displayAllProducts();
    initSearchListener();
    initFAQ();
    initMobileMenu();
    
    showBanner();
    setTimeout(showPopup, 500);
});
