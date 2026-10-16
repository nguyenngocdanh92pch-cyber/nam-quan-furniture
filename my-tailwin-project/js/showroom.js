document.addEventListener("htmlLoaded", function () {
  const catBtns = document.querySelectorAll(".sr-cat-btn");
  const filterBtns = document.querySelectorAll(".sr-filter-btn");
  const showroomGrid = document.querySelector(".sr-grid");
  const showroomCards = document.querySelectorAll(".sr-card");

  const viewAllBtn = document.querySelector(".sr-view-all-btn");
  const modal = document.getElementById("allProductsModal"); // Nằm ở index_4.html
  const modalGrid = document.getElementById("modalProductGrid");

  // --- Hàm Reset chung ---
  function resetShowroomProducts() {
    showroomCards.forEach((card) => {
      const mainImage = card.querySelector(".sr-main-img");
      const colorDots = card.querySelectorAll(".sr-color-dot");
      colorDots.forEach((d) =>
        d.classList.remove("border", "border-brand-orange"),
      );

      const defaultImageSrc = card.getAttribute("data-default-image");
      if (mainImage && defaultImageSrc) mainImage.src = defaultImageSrc;
    });

    if (showroomGrid) {
      showroomGrid.style.opacity = "0.5";
      showroomGrid.style.transition = "opacity 0.2s ease";
      setTimeout(() => (showroomGrid.style.opacity = "1"), 200);
    }
  }

  // --- Khởi tạo Lưu ảnh gốc và Đổi màu ---
  function initCards(cardsList) {
    cardsList.forEach((card) => {
      const mainImg = card.querySelector(".sr-main-img");
      const dots = card.querySelectorAll(".sr-color-dot");

      if (mainImg && !card.hasAttribute("data-default-image")) {
        card.setAttribute("data-default-image", mainImg.src);
      }

      dots.forEach((dot) => {
        dot.addEventListener("click", function () {
          dots.forEach((d) =>
            d.classList.remove("border", "border-brand-orange"),
          );
          this.classList.add("border", "border-brand-orange");

          const newSrc = this.getAttribute("data-image");
          if (newSrc && mainImg) {
            mainImg.style.opacity = "0.5";
            setTimeout(() => {
              mainImg.src = newSrc;
              mainImg.style.opacity = "1";
            }, 200);
          }
        });
      });
    });
  }
  initCards(showroomCards);

  // --- Tương tác Danh mục phòng ---
  catBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Reset Tailwind classes cho nút: text-brand-green, gạch chân...
      catBtns.forEach((b) => {
        b.classList.remove("text-brand-green");
        b.classList.add("text-[#666666]");
        // Tắt gạch chân (after:w-full) -> (after:w-0)
        b.classList.remove(
          "after:w-full",
          "after:h-0.5",
          "after:bg-brand-green",
        );
      });

      this.classList.remove("text-[#666666]");
      this.classList.add(
        "text-brand-green",
        "after:w-full",
        "after:h-0.5",
        "after:bg-brand-green",
      );

      resetShowroomProducts();
    });
  });

  // --- Tương tác Nút Lọc ---
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Toggle Tailwind classes
      this.classList.toggle("bg-[#f0faf0]");
      this.classList.toggle("text-brand-greenTitle");
      this.classList.toggle("border-brand-greenTitle");
      resetShowroomProducts();
    });
  });

  // --- Nút Xem tất cả (Modal Popup) ---
  if (viewAllBtn && modal && modalGrid) {
    viewAllBtn.addEventListener("click", function (e) {
      e.preventDefault();
      modalGrid.innerHTML = "";

      // Clone sản phẩm ném vào Modal
      showroomCards.forEach((card) =>
        modalGrid.appendChild(card.cloneNode(true)),
      );

      // Kích hoạt lại tính năng đổi màu cho Card trong Modal
      initCards(modalGrid.querySelectorAll(".sr-card"));

      // Bật modal bằng cách bỏ opacity-0, pointer-events-none (Tailwind)
      // Lưu ý: Cần thêm id và style tương ứng trong file html tổng cho modal
      modal.classList.add("opacity-100", "visible");
      modal.classList.remove("opacity-0", "invisible");
      document.body.style.overflow = "hidden";
    });

    // (Bổ sung logic tắt modal nếu cần)
  }
});
