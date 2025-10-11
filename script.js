// WhatsApp Number - Replace with your actual number (with country code, no + or spaces)
const WHATSAPP_NUMBER = "923001234567";

// USD to PKR conversion rate (you can update this rate)
const USD_TO_PKR_RATE = 278;

const defaultProducts = [
    {
        id: 1,
        title: "Classic White Shirt",
        description: "Premium cotton shirt with a timeless design, perfect for any occasion.",
        specifications: "Material: 100% Cotton. Sizes: S, M, L, XL. Care: Machine washable.",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop",
        price: 79.99,
        category: "Men"
    },
    {
        id: 2,
        title: "Elegant Black Dress",
        description: "Sophisticated evening dress crafted from luxurious fabric.",
        specifications: "Material: Polyester blend. Sizes: XS, S, M, L. Dry clean only.",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
        price: 149.99,
        category: "Women"
    },
    {
        id: 3,
        title: "Casual Denim Jacket",
        description: "Classic denim jacket with a modern fit and premium wash.",
        specifications: "Material: Denim. Sizes: S, M, L, XL. Color: Blue. Machine washable.",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop",
        price: 119.99,
        category: "Unisex"
    },
    {
        id: 4,
        title: "Summer Floral Blouse",
        description: "Lightweight and breathable blouse with beautiful floral patterns.",
        specifications: "Material: Viscose. Sizes: XS, S, M, L. Hand wash recommended.",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
        price: 64.99,
        category: "Women"
    },
    {
        id: 5,
        title: "Premium Leather Belt",
        description: "Handcrafted genuine leather belt with polished buckle.",
        specifications: "Material: Genuine Leather. Sizes: 32-40. Color: Black, Brown.",
        image: "https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=600&h=800&fit=crop",
        price: 45.99,
        category: "Accessories"
    },
    {
        id: 6,
        title: "Slim Fit Chinos",
        description: "Versatile chino pants in premium stretch cotton blend.",
        specifications: "Material: Cotton blend. Sizes: 28-38. Colors: Navy, Khaki, Black.",
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop",
        price: 89.99,
        category: "Men"
    },
    {
        id: 7,
        title: "Knit Sweater",
        description: "Cozy wool blend sweater for comfortable warmth.",
        specifications: "Material: Wool blend. Sizes: S, M, L, XL. Hand wash only.",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop",
        price: 94.99,
        category: "Unisex"
    },
    {
        id: 8,
        title: "Designer Sunglasses",
        description: "UV protection sunglasses with elegant frame design.",
        specifications: "UV Protection: 100%. Material: Metal frame. Includes case.",
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

function formatPricePKR(usdPrice) {
    const pkrPrice = usdPrice * USD_TO_PKR_RATE;
    return `Rs ${Math.round(pkrPrice).toLocaleString('en-PK')}`;
}

function createProductCard(product) {
    return `
        <div class="product-card" onclick="showProductDetail(${product.id})">
            <img src="${product.image}" alt="${product.title}" class="product-image" onerror="this.src='https://via.placeholder.com/600x800?text=No+Image'">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">${formatPricePKR(product.price)}</p>
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

function getProductReviews(productId) {
    const reviews = localStorage.getItem('productReviews');
    const allReviews = reviews ? JSON.parse(reviews) : {};
    return allReviews[productId] || [];
}

function saveProductReview(productId, rating, reviewText, customerName) {
    const reviews = localStorage.getItem('productReviews');
    const allReviews = reviews ? JSON.parse(reviews) : {};
    
    if (!allReviews[productId]) {
        allReviews[productId] = [];
    }
    
    const newReview = {
        id: Date.now(),
        rating: rating,
        text: reviewText,
        customerName: customerName,
        date: new Date().toLocaleDateString('en-GB')
    };
    
    allReviews[productId].push(newReview);
    localStorage.setItem('productReviews', JSON.stringify(allReviews));
    
    return newReview;
}

function getAverageRating(productId) {
    const reviews = getProductReviews(productId);
    if (reviews.length === 0) return 0;
    
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
}

function submitReview(productId) {
    const rating = document.querySelector('input[name="rating"]:checked');
    const reviewText = document.getElementById('reviewText').value.trim();
    const customerName = document.getElementById('customerName').value.trim();
    
    if (!rating) {
        alert('Please select a rating');
        return;
    }
    
    if (!reviewText) {
        alert('Please write a review');
        return;
    }
    
    if (!customerName) {
        alert('Please enter your name');
        return;
    }
    
    const ratingValue = parseInt(rating.value);
    saveProductReview(productId, ratingValue, reviewText, customerName);
    
    document.getElementById('reviewText').value = '';
    document.getElementById('customerName').value = '';
    document.querySelectorAll('input[name="rating"]').forEach(input => input.checked = false);
    
    alert('Thank you for your review! It has been submitted successfully.');
    
    showProductDetail(productId);
}

function showAllReviews(productId) {
    const reviews = getProductReviews(productId);
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const reviewsModal = document.getElementById('reviewsModal');
    const reviewsContent = document.getElementById('reviewsContent');
    
    if (reviews.length === 0) {
        reviewsContent.innerHTML = `
            <h2>${product.title} - Customer Reviews</h2>
            <p class="no-reviews">No reviews yet. Be the first to review this product!</p>
        `;
    } else {
        const avgRating = getAverageRating(productId);
        const reviewsHTML = reviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <div class="review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</div>
                    <span class="review-date">${review.date}</span>
                </div>
                <p class="review-text">${review.text}</p>
                <p class="review-author">- ${review.customerName}</p>
            </div>
        `).join('');
        
        reviewsContent.innerHTML = `
            <h2>${product.title} - Customer Reviews</h2>
            <div class="average-rating">
                <span class="avg-rating-number">${avgRating}</span>
                <span class="avg-rating-stars">${'★'.repeat(Math.round(avgRating))}${'☆'.repeat(5-Math.round(avgRating))}</span>
                <span class="review-count">(${reviews.length} ${reviews.length === 1 ? 'review' : 'reviews'})</span>
            </div>
            <div class="reviews-list">
                ${reviewsHTML}
            </div>
        `;
    }
    
    reviewsModal.style.display = 'flex';
}

function closeReviewsModal() {
    const reviewsModal = document.getElementById('reviewsModal');
    reviewsModal.style.display = 'none';
}

function showProductDetail(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        console.error("Product not found");
        return;
    }
    
    const productsListPage = document.getElementById('productsListPage');
    const productDetailPage = document.getElementById('productDetailPage');
    const productDetailContent = document.getElementById('productDetailContent');
    
    if (productsListPage && productDetailPage && productDetailContent) {
        productsListPage.style.display = 'none';
        productDetailPage.style.display = 'block';
        
        const message = `Hello! I would like to order:\n\nProduct: ${product.title}\nPrice: ${formatPricePKR(product.price)}\n\nPlease confirm availability.`;
        const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        
        const reviews = getProductReviews(productId);
        const avgRating = getAverageRating(productId);
        const reviewCount = reviews.length;
        
        productDetailContent.innerHTML = `
            <div class="detail-container">
                <div class="detail-image-wrapper">
                    <img src="${product.image}" alt="${product.title}" onerror="this.src='https://via.placeholder.com/600x800?text=No+Image'">
                </div>
                <div class="detail-info">
                    <div class="product-category">${product.category}</div>
                    <h2 class="detail-title">${product.title}</h2>
                    <p class="detail-price">${formatPricePKR(product.price)}</p>
                    
                    ${reviewCount > 0 ? `
                    <div class="product-rating-summary">
                        <span class="rating-stars">${'★'.repeat(Math.round(avgRating))}${'☆'.repeat(5-Math.round(avgRating))}</span>
                        <span class="rating-text">${avgRating} (${reviewCount} ${reviewCount === 1 ? 'review' : 'reviews'})</span>
                    </div>
                    ` : ''}
                    
                    <p class="detail-description">${product.description}</p>
                    
                    <h3 class="detail-section-title">Product Specifications</h3>
                    <p class="detail-specifications">${product.specifications || 'No specifications available.'}</p>
                    
                    <div class="action-buttons">
                        <a href="${whatsappLink}" target="_blank" class="order-button">
                            Order Now via WhatsApp
                        </a>
                        <button onclick="showAllReviews(${productId})" class="show-reviews-btn">
                            Show Reviews (${reviewCount})
                        </button>
                    </div>
                    
                    <div class="rating-section">
                        <h3 class="detail-section-title">Rate This Product</h3>
                        <div class="star-rating">
                            <input type="radio" id="star5" name="rating" value="5">
                            <label for="star5" title="5 stars">★</label>
                            <input type="radio" id="star4" name="rating" value="4">
                            <label for="star4" title="4 stars">★</label>
                            <input type="radio" id="star3" name="rating" value="3">
                            <label for="star3" title="3 stars">★</label>
                            <input type="radio" id="star2" name="rating" value="2">
                            <label for="star2" title="2 stars">★</label>
                            <input type="radio" id="star1" name="rating" value="1">
                            <label for="star1" title="1 star">★</label>
                        </div>
                        <input type="text" id="customerName" placeholder="Your Name" class="review-input">
                        <textarea id="reviewText" placeholder="Write your review here..." class="review-textarea"></textarea>
                        <button onclick="submitReview(${productId})" class="submit-review-btn">Submit Review</button>
                    </div>
                </div>
            </div>
        `;
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function showProductList() {
    const productsListPage = document.getElementById('productsListPage');
    const productDetailPage = document.getElementById('productDetailPage');
    
    if (productsListPage && productDetailPage) {
        productsListPage.style.display = 'block';
        productDetailPage.style.display = 'none';
        
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = '';
        }
        
        displayAllProducts();
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
