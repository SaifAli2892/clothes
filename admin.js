function checkAuth() {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
        window.location.href = 'admin-login.html';
    }
}

function logout() {
    localStorage.removeItem('isAdminLoggedIn');
    window.location.href = 'admin-login.html';
}

function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    const btns = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    btns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(tabName + 'Tab').classList.add('active');
    event.target.classList.add('active');
}

function addProduct(e) {
    e.preventDefault();
    
    const title = document.getElementById('productTitle').value;
    const description = document.getElementById('productDescription').value;
    const image = document.getElementById('productImage').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value;
    const editId = document.getElementById('editProductId').value;
    
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    if (editId) {
        const index = products.findIndex(p => p.id == editId);
        if (index !== -1) {
            products[index] = {
                id: parseInt(editId),
                title,
                description,
                image,
                price,
                category
            };
        }
    } else {
        const newProduct = {
            id: Date.now(),
            title,
            description,
            image,
            price,
            category
        };
        products.push(newProduct);
    }
    
    localStorage.setItem('products', JSON.stringify(products));
    
    const successMsg = document.getElementById('productSuccess');
    successMsg.textContent = editId ? 'Product updated successfully!' : 'Product added successfully!';
    successMsg.style.display = 'block';
    
    document.getElementById('addProductForm').reset();
    document.getElementById('editProductId').value = '';
    document.getElementById('submitBtn').textContent = 'Add Product';
    document.getElementById('cancelBtn').style.display = 'none';
    
    displayProducts();
    
    setTimeout(() => {
        successMsg.style.display = 'none';
        successMsg.textContent = 'Product added successfully!';
    }, 3000);
}

function displayProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productsList = document.getElementById('productsList');
    
    if (!productsList) return;
    
    if (products.length === 0) {
        productsList.innerHTML = '<p style="text-align: center; color: #666;">No products available.</p>';
        return;
    }
    
    productsList.innerHTML = products.map(product => `
        <div class="admin-product-card">
            <img src="${product.image}" alt="${product.title}" class="admin-product-image" onerror="this.src='https://via.placeholder.com/600x800?text=No+Image'">
            <div class="admin-product-category">${product.category}</div>
            <div class="admin-product-title">${product.title}</div>
            <div class="admin-product-price">$${parseFloat(product.price).toFixed(2)}</div>
            <div class="admin-product-actions">
                <button class="edit-btn" onclick="editProduct(${product.id})">Edit</button>
                <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function editProduct(id) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === id);
    
    if (product) {
        document.getElementById('editProductId').value = product.id;
        document.getElementById('productTitle').value = product.title;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productImage').value = product.image;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('submitBtn').textContent = 'Update Product';
        document.getElementById('cancelBtn').style.display = 'inline-block';
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products = products.filter(p => p.id !== id);
        localStorage.setItem('products', JSON.stringify(products));
        
        displayProducts();
        
        const successMsg = document.getElementById('productSuccess');
        successMsg.textContent = 'Product deleted successfully!';
        successMsg.style.display = 'block';
        
        setTimeout(() => {
            successMsg.style.display = 'none';
            successMsg.textContent = 'Product added successfully!';
        }, 3000);
    }
}

function cancelEdit() {
    document.getElementById('addProductForm').reset();
    document.getElementById('editProductId').value = '';
    document.getElementById('submitBtn').textContent = 'Add Product';
    document.getElementById('cancelBtn').style.display = 'none';
}

function savePopup(e) {
    e.preventDefault();
    
    const bgImage = document.getElementById('popupBgImage').value;
    const text = document.getElementById('popupText').value;
    const display = document.getElementById('popupDisplay').value;
    const active = document.getElementById('popupActive').checked;
    
    const popupData = {
        bgImage,
        text,
        display,
        active
    };
    
    localStorage.setItem('discountPopup', JSON.stringify(popupData));
    
    const successMsg = document.getElementById('popupSuccess');
    successMsg.style.display = 'block';
    
    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 3000);
}

function clearPopup() {
    localStorage.removeItem('discountPopup');
    document.getElementById('popupForm').reset();
    
    const successMsg = document.getElementById('popupSuccess');
    successMsg.textContent = 'Popup cleared successfully!';
    successMsg.style.display = 'block';
    
    setTimeout(() => {
        successMsg.style.display = 'none';
        successMsg.textContent = 'Popup settings saved successfully!';
    }, 3000);
}

function loadPopupSettings() {
    const popupData = localStorage.getItem('discountPopup');
    if (popupData) {
        const popup = JSON.parse(popupData);
        document.getElementById('popupBgImage').value = popup.bgImage || '';
        document.getElementById('popupText').value = popup.text || '';
        document.getElementById('popupDisplay').value = popup.display || 'all';
        document.getElementById('popupActive').checked = popup.active || false;
    }
}

function saveBanner(e) {
    e.preventDefault();
    
    const text = document.getElementById('bannerText').value;
    const link = document.getElementById('bannerLink').value;
    const bgColor = document.getElementById('bannerBgColor').value;
    const animation = document.getElementById('bannerAnimation').value;
    const active = document.getElementById('bannerActive').checked;
    
    const bannerData = {
        text,
        link,
        bgColor,
        animation,
        active
    };
    
    localStorage.setItem('promoBanner', JSON.stringify(bannerData));
    
    const successMsg = document.getElementById('bannerSuccess');
    successMsg.style.display = 'block';
    
    updateBannerPreview();
    
    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 3000);
}

function clearBanner() {
    localStorage.removeItem('promoBanner');
    document.getElementById('bannerForm').reset();
    
    const successMsg = document.getElementById('bannerSuccess');
    successMsg.textContent = 'Banner cleared successfully!';
    successMsg.style.display = 'block';
    
    updateBannerPreview();
    
    setTimeout(() => {
        successMsg.style.display = 'none';
        successMsg.textContent = 'Banner settings saved successfully!';
    }, 3000);
}

function loadBannerSettings() {
    const bannerData = localStorage.getItem('promoBanner');
    if (bannerData) {
        const banner = JSON.parse(bannerData);
        document.getElementById('bannerText').value = banner.text || '';
        document.getElementById('bannerLink').value = banner.link || '';
        document.getElementById('bannerBgColor').value = banner.bgColor || 'black';
        document.getElementById('bannerAnimation').value = banner.animation || 'slide';
        document.getElementById('bannerActive').checked = banner.active || false;
        updateBannerPreview();
    }
}

function updateBannerPreview() {
    const preview = document.getElementById('bannerPreview');
    const text = document.getElementById('bannerText').value || 'Your banner will appear here';
    const bgColor = document.getElementById('bannerBgColor').value;
    
    preview.textContent = text;
    preview.className = '';
    preview.className = `banner-${bgColor}`;
    preview.style.padding = '12px';
    preview.style.borderRadius = '8px';
    preview.style.fontWeight = '600';
    preview.style.color = '#fff';
    preview.style.textAlign = 'center';
}

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    
    document.getElementById('addProductForm').addEventListener('submit', addProduct);
    document.getElementById('popupForm').addEventListener('submit', savePopup);
    document.getElementById('bannerForm').addEventListener('submit', saveBanner);
    
    document.getElementById('bannerText').addEventListener('input', updateBannerPreview);
    document.getElementById('bannerBgColor').addEventListener('change', updateBannerPreview);
    
    loadPopupSettings();
    loadBannerSettings();
    displayProducts();
});
