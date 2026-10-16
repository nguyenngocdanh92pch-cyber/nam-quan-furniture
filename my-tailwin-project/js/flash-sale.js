document.addEventListener("htmlLoaded", function () {
  const fsTabs = document.querySelectorAll(".fs-tab");
  const fsGrid = document.querySelector(".fs-grid");
  const fsCards = document.querySelectorAll(".fs-card");

  /* =========================================
     1. LƯU ẢNH GỐC & TƯƠNG TÁC CHỌN MÀU
  ========================================= */
  fsCards.forEach((card) => {
    const mainImg = card.querySelector(".fs-main-img");
    const colorDots = card.querySelectorAll(".fs-color-dot");

    if (mainImg && !card.hasAttribute("data-default-image")) {
      card.setAttribute("data-default-image", mainImg.src);
    }

    colorDots.forEach((dot) => {
      dot.addEventListener("click", function () {
        // Xóa viền cam của các chấm khác (Dùng class của Tailwind)
        colorDots.forEach((d) =>
          d.classList.remove("border", "border-brand-orange"),
        );

        // Thêm viền cam cho chấm đang bấm
        this.classList.add("border", "border-brand-orange");

        const newSrc = this.getAttribute("data-image");
        if (newSrc && mainImg) {
          mainImg.style.opacity = "0.5";
          mainImg.style.transition = "opacity 0.2s ease";
          setTimeout(() => {
            mainImg.src = newSrc;
            mainImg.style.opacity = "1";
          }, 200);
        }
      });
    });
  });

  /* =========================================
     2. TƯƠNG TÁC CHUYỂN TAB & RESET
  ========================================= */
  fsTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Đổi trạng thái màu Tailwind cho các Tabs
      fsTabs.forEach((t) => {
        t.classList.remove("bg-brand-green", "text-white");
        t.classList.add("bg-white", "text-brand-green");
      });
      // Active Tab hiện tại
      this.classList.remove("bg-white", "text-brand-green");
      this.classList.add("bg-brand-green", "text-white");

      // Logic Reset Sản phẩm
      fsCards.forEach((card) => {
        const mainImg = card.querySelector(".fs-main-img");
        const colorDots = card.querySelectorAll(".fs-color-dot");

        // Xóa viền
        colorDots.forEach((d) =>
          d.classList.remove("border", "border-brand-orange"),
        );

        // Đổi ảnh về gốc
        const defaultSrc = card.getAttribute("data-default-image");
        if (mainImg && defaultSrc) mainImg.src = defaultSrc;
      });

      // Hiệu ứng mờ grid
      if (fsGrid) {
        fsGrid.style.opacity = "0.5";
        fsGrid.style.transition = "opacity 0.2s ease";
        setTimeout(() => (fsGrid.style.opacity = "1"), 200);
      }
    });
  });
});
