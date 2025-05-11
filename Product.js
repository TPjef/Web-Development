
    // Image Carousel
    const images = [
      "https://down-th.img.susercontent.com/file/th-11134207-7r98p-lve9gjf4nfux31.webp",/*--888-87 สีขาว(2pcs)--*/
      "https://down-th.img.susercontent.com/file/th-11134207-7r98z-lve9gjf49ebe7f.webp",/*--WM-2 สีฟ้า(2pcs)--*/
      "https://down-th.img.susercontent.com/file/th-11134207-7r98z-lve9gjeu9ssp15.webp"/*--WM-2 สีแดง(2pcs)--*/
    ];

    let currentIndex = 0;
    const img = document.getElementById("product-img");

    function showImage(index) {
      img.src = images[index];
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    }

    function prevImage() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    }

    setInterval(nextImage, 3000);

    // Swipe support
    let startX = 0;
    const touchArea = document.getElementById("touch-area");

    touchArea.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
    });

    touchArea.addEventListener("touchend", function (e) {
      const endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) {
        nextImage();
      } else if (endX - startX > 50) {
        prevImage();
      }
    });

    // รีวิวสินค้า
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

      if (text !== '' && name !== '') {
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

    // เลือกสีสินค้า
    let selectedColor = '';
    let selectedImage = '';
    const colorButtons = document.querySelectorAll('.color-option');

    colorButtons.forEach(button => {
      button.addEventListener('click', () => {
        colorButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        selectedColor = button.dataset.value;
        selectedImage = button.dataset.img;

        // เปลี่ยนภาพตามสีที่เลือก
        document.getElementById('product-img').src = selectedImage;
        console.log('เลือกสี:', selectedColor);
      });
    });

    // ปุ่มซื้อสินค้า
    document.querySelector('.btn-buy').addEventListener('click', () => {
      if (!selectedColor) {
        alert('กรุณาเลือกสีสินค้าก่อนสั่งซื้อ');
        return;
      }
      // เปลี่ยนหน้าไปยังหน้าเดียวกันหรือไปที่ section อื่นในหน้าเดียวกัน
      window.location.href = "http://127.0.0.1:5500/%E0%B8%B4buy.html"; // หรือ window.location.href = window.location.href;
    });

    // ปุ่มเพิ่มไปยังรถเข็น
    document.querySelector('.btn-cart').addEventListener('click', () => {
      if (!selectedColor) {
        alert('กรุณาเลือกสีสินค้าก่อนเพิ่มลงรถเข็น');
        return;
      }
      alert('เพิ่มสินค้าเข้าสู่รถเข็น: ' + selectedColor);
    });