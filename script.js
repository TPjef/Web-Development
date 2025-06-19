document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartButton = document.getElementById('close-cart-btn');
    const openCartButton = document.getElementById('open-cart-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPriceElement = document.getElementById('cart-total-price');
    const cartItemCountElement = document.getElementById('cart-item-count');

    let cart = [];

    // ฟังก์ชันอัปเดตจำนวนสินค้าในตะกร้าที่ไอคอน
    function updateCartItemCount() {
        cartItemCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    // ฟังก์ชันแสดงตะกร้าสินค้า
    function openCart() {
        cartOverlay.style.display = 'flex';
        renderCartItems();
    }

    // ฟังก์ชันซ่อนตะกร้าสินค้า
    function closeCart() {
        cartOverlay.style.display = 'none';
    }

    // ฟังก์ชันเพิ่มสินค้าลงในตะกร้า
    function addItemToCart(event) {
        const productItem = event.target.closest('.product-item');
        const productId = productItem.dataset.productId;
        const productName = productItem.dataset.productName;
        const productPrice = parseFloat(productItem.dataset.productPrice);

        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        updateCartItemCount();
        renderCartItems(); // อัปเดตการแสดงผลตะกร้าทุกครั้งที่มีการเปลี่ยนแปลง
    }

    // ฟังก์ชันลบสินค้าออกจากตะกร้า
    function removeItemFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartItemCount();
        renderCartItems();
    }

    // ฟังก์ชันเปลี่ยนจำนวนสินค้าในตะกร้า
    function changeItemQuantity(productId, newQuantity) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = parseInt(newQuantity);
            if (item.quantity <= 0) {
                removeItemFromCart(productId);
            }
            updateCartItemCount();
            renderCartItems();
        }
    }

    // ฟังก์ชันแสดงรายการสินค้าในตะกร้า
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img src="https://via.placeholder.com/50" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">฿${item.price.toFixed(2)}</div>
                </div>
                <div class="item-quantity">
                    <button class="quantity-btn minus-btn" data-id="${item.id}">-</button>
                    <span class="item-qty">${item.quantity}</span>
                    <button class="quantity-btn plus-btn" data-id="${item.id}">+</button>
                    <button class="quantity-btn remove-btn" data-id="${item.id}">ลบ</button>
                </div>
            `;
            cartItemsContainer.appendChild(listItem);
            total += item.price * item.quantity;
        });
        cartTotalPriceElement.textContent = total.toFixed(2);

        // เพิ่ม Event Listener ให้กับปุ่มเพิ่ม/ลดจำนวน และปุ่มลบ
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                if (event.target.classList.contains('plus-btn')) {
                    const item = cart.find(item => item.id === productId);
                    if (item) {
                        changeItemQuantity(productId, item.quantity + 1);
                    }
                } else if (event.target.classList.contains('minus-btn')) {
                    const item = cart.find(item => item.id === productId);
                    if (item && item.quantity > 0) {
                        changeItemQuantity(productId, item.quantity - 1);
                    }
                } else if (event.target.classList.contains('remove-btn')) {
                    removeItemFromCart(productId);
                }
            });
        });
    }

    // เพิ่ม Event Listener ให้กับปุ่ม "เพิ่มใส่ตะกร้า" ทุกปุ่ม
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addItemToCart);
    });

    // เพิ่ม Event Listener สำหรับเปิดและปิดตะกร้าสินค้า
    openCartButton.addEventListener('click', openCart);
    closeCartButton.addEventListener('click', closeCart);

    // อัปเดตจำนวนสินค้าเริ่มต้นที่ไอคอนตะกร้า
    updateCartItemCount();
});