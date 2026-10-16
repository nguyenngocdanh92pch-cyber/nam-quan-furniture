document.addEventListener("DOMContentLoaded", function () {
  const catBtns = document.querySelectorAll(".cat-btn");
  const filterBtns = document.querySelectorAll(".filter-btn:not(.filter-main)");
  const showroomGrid = document.querySelector(".showroom-grid");
  const showroomCards = showroomGrid
    ? showroomGrid.querySelectorAll(".col-card")
    : [];

  // --- CÁC THÀNH PHẦN CHO POPUP ---
  const showroomViewAllBtn = document.querySelector(".showroom-view-all-btn");
  const modal = document.getElementById("allProductsModal");
  const modalGrid = document.getElementById("modalProductGrid");

  // Lưu ảnh gốc lúc mới load cho các card ở ngoài Showroom
  showroomCards.forEach((card) => {
    const mainImg = card.querySelector("img.col-card-img");
    if (mainImg && !card.hasAttribute("data-default-image")) {
      card.setAttribute("data-default-image", mainImg.src);
    }
  });

  function resetShowroomProducts() {
    showroomCards.forEach((card) => {
      const mainImage = card.querySelector("img.col-card-img");
      const colorDots = card.querySelectorAll(".color-dot");

      colorDots.forEach((d) => (d.style.border = ""));

      const defaultImageSrc = card.getAttribute("data-default-image");
      if (mainImage && defaultImageSrc) {
        mainImage.src = defaultImageSrc;
      }
    });

    if (showroomGrid) {
      showroomGrid.style.opacity = "0.5";
      setTimeout(() => (showroomGrid.style.opacity = "1"), 200);
    }
  }

  catBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      catBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      resetShowroomProducts();
    });
  });

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      this.classList.toggle("active-filter");
      resetShowroomProducts();
    });
  });

  // Hàm này giúp kích hoạt lại chức năng click chọn màu cho các card được copy vào trong Modal
  function initModalCardsInteraction(cardsList) {
    cardsList.forEach((card) => {
      const mainImg = card.querySelector("img.col-card-img");
      const dots = card.querySelectorAll(".color-dot");

      if (mainImg && !card.hasAttribute("data-default-image")) {
        card.setAttribute("data-default-image", mainImg.src);
      }

      dots.forEach((dot) => {
        dot.addEventListener("click", function () {
          dots.forEach((d) => (d.style.border = ""));
          this.style.border = "1px solid #e87a00";

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
  }

  if (showroomViewAllBtn && modal && modalGrid) {
    showroomViewAllBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // 1. Xóa sạch nội dung cũ trong Modal (nếu trước đó đã bấm từ phần Collection)
      modalGrid.innerHTML = "";

      // 2. Nhân bản các thẻ sản phẩm từ lưới Showroom nhét vào Modal
      // Demo: Nhét 2 lần để danh sách dài ra, thấy được thanh cuộn
      showroomCards.forEach((card) =>
        modalGrid.appendChild(card.cloneNode(true)),
      );
      showroomCards.forEach((card) =>
        modalGrid.appendChild(card.cloneNode(true)),
      );

      // 3. Kích hoạt tính năng bấm đổi màu cho các sản phẩm trong Modal
      const newModalCards = modalGrid.querySelectorAll(".col-card");
      initModalCardsInteraction(newModalCards);

      // 4. Hiển thị Popup và khóa cuộn nền
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }
});
