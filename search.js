document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const productGrid = document.getElementById('product-grid');
    const productItems = Array.from(productGrid.querySelectorAll('.product-item'));

    function filterProducts(searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        productItems.forEach(item => {
            const productName = item.dataset.productName.toLowerCase();
            if (productName.includes(lowerCaseSearchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        filterProducts(searchTerm);
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim();
        filterProducts(searchTerm);
    });

    // ทำงานเมื่อกดปุ่ม Enter ในช่องค้นหา
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            filterProducts(searchTerm);
        }
    });
});