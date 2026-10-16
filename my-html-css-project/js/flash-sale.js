document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".fs-tab");
  const grid = document.querySelector(".fs-grid");
  const productCards = document.querySelectorAll(".fs-card, .col-card");

  /* =========================================
     1. TƯƠNG TÁC CHỌN MÀU SẮC SẢN PHẨM & ĐỔI ẢNH
  ========================================= */
  productCards.forEach((card) => {
    const mainImage = card.querySelector("img.fs-card-img, img.col-card-img");
    const colorDots = card.querySelectorAll(".color-dot");

    // LƯU LẠI ẢNH MẶC ĐỊNH LÚC VỪA LOAD TRANG
    // Để lát nữa khi chuyển tab, ta có thể lấy ảnh này để phục hồi lại
    if (mainImage && !card.hasAttribute("data-default-image")) {
      card.setAttribute("data-default-image", mainImage.src);
    }

    colorDots.forEach((dot) => {
      dot.addEventListener("click", function () {
        // Xóa viền cam cũ và gán cho chấm mới
        colorDots.forEach((d) => (d.style.border = ""));
        this.style.border = "1px solid #e87a00";

        // Đổi ảnh
        const newImageSrc = this.getAttribute("data-image");
        if (newImageSrc && mainImage) {
          mainImage.style.opacity = "0.5";
          mainImage.style.transition = "opacity 0.2s ease";

          setTimeout(() => {
            mainImage.src = newImageSrc;
            mainImage.style.opacity = "1";
          }, 200);
        }
      });
    });
  });

  /* =========================================
     2. TƯƠNG TÁC CHUYỂN TAB THỜI GIAN & RESET SẢN PHẨM
  ========================================= */
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Bỏ active tab cũ, thêm cho tab mới
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // --- LOGIC RESET SẢN PHẨM ---
      productCards.forEach((card) => {
        const mainImage = card.querySelector(
          "img.fs-card-img, img.col-card-img",
        );
        const colorDots = card.querySelectorAll(".color-dot");

        // 1. Xóa viền cam của tất cả các chấm màu
        colorDots.forEach((d) => {
          d.style.border = "";
        });

        // Tùy chọn: Set lại viền cam cho chấm màu đầu tiên (mặc định) nếu bạn muốn
        if (colorDots.length > 0) {
          // colorDots[0].style.border = "1px solid #e87a00";
        }

        // 2. Lấy lại đường dẫn ảnh mặc định đã lưu và thay vào ảnh chính
        const defaultImageSrc = card.getAttribute("data-default-image");
        if (mainImage && defaultImageSrc) {
          mainImage.src = defaultImageSrc;
        }
      });

      // Hiệu ứng chớp mờ khung lưới
      if (grid) {
        grid.style.opacity = "0.5";
        setTimeout(() => {
          grid.style.opacity = "1";
        }, 200);
      }
    });
  });
});
