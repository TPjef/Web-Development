 const img = document.getElementById("product-img");

    let startX = 0;
    const touchArea = document.getElementById("touch-area");

    touchArea.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
    });

    touchArea.addEventListener("touchend", function (e) {
      const endX = e.changedTouches[0].clientX;
    });

    const form = document.getElementById('comment-form');
    const input = document.getElementById('comment-input');
    const usernameInput = document.getElementById('username-input');
    const list = document.getElementById('comment-list');
    const stars = document.querySelectorAll('#star-rating span');
    let selectedRating = 0;

    stars.forEach(star => {
      star.addEventListener('click', () => {
        selectedRating = star.dataset.value;
        stars.forEach(s => s.classList.remove('selected'));
        for (let i = 0; i < selectedRating; i++) {
          stars[i].classList.add('selected');
        }
      });
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = usernameInput.value.trim();
      const text = input.value.trim();
      const date = new Date().toLocaleString();

      if (text && name) {
        const comment = document.createElement('div');
        comment.className = 'comment';
        comment.innerHTML = `
          <strong>${name}</strong>
          <span>${'★'.repeat(selectedRating)}${'☆'.repeat(5 - selectedRating)}</span>
          <p>${text}</p>
          <small>${date}</small>
        `;
        list.prepend(comment);
        input.value = '';
        usernameInput.value = '';
        selectedRating = 0;
        stars.forEach(s => s.classList.remove('selected'));
      }
    });

    document.querySelector('.btn-buy').addEventListener('click', () => {
      window.location.href = "http://127.0.0.1:5500/buy6/%E0%B8%B4buy6.html";
    });

    document.querySelector('.btn-cart').addEventListener('click', () => {
      alert('เพิ่มสินค้าเข้าสู่รถเข็น');
    });