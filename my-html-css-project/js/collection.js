document.addEventListener("DOMContentLoaded", function () {
  const colTabs = document.querySelectorAll(".col-tab");
  const colGrid = document.querySelector(".collection-grid");
  const colCards = document.querySelectorAll(".col-card");

  const viewAllBtn = document.querySelector(".col-view-all");
  const modal = document.getElementById("allProductsModal");
  const closeBtn = document.querySelector(".modal-close-btn");
  const modalGrid = document.getElementById("modalProductGrid");

  function initProductCards(cardsNodeList) {
    cardsNodeList.forEach((card) => {
      const mainImage = card.querySelector("img.col-card-img");
      const colorDots = card.querySelectorAll(".color-dot");

      // Lưu lại ảnh mặc định
      if (mainImage && !card.hasAttribute("data-default-image")) {
        card.setAttribute("data-default-image", mainImage.src);
      }

      // Xử lý click đổi màu
      colorDots.forEach((dot) => {
        dot.addEventListener("click", function () {
          colorDots.forEach((d) => (d.style.border = ""));
          this.style.border = "1px solid #e87a00";

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
  }

  // Khởi tạo các thẻ bên ngoài giao diện
  initProductCards(colCards);

  /* =========================================
     C. TƯƠNG TÁC CHUYỂN TAB & RESET SẢN PHẨM
  ========================================= */
  colTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // 1. Chuyển UI Tab
      colTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // 2. Logic Reset Sản Phẩm
      colCards.forEach((card) => {
        const mainImage = card.querySelector("img.col-card-img");
        const colorDots = card.querySelectorAll(".color-dot");

        // Xóa viền cam
        colorDots.forEach((d) => (d.style.border = ""));

        // Khôi phục ảnh gốc
        const defaultImageSrc = card.getAttribute("data-default-image");
        if (mainImage && defaultImageSrc) {
          mainImage.src = defaultImageSrc;
        }
      });

      // 3. Hiệu ứng làm mờ giả lập load dữ liệu
      if (colGrid) {
        colGrid.style.opacity = "0.5";
        setTimeout(() => {
          colGrid.style.opacity = "1";
        }, 200);
      }
    });
  });

  /* =========================================
     D. TƯƠNG TÁC POPUP (XEM TẤT CẢ)
  ========================================= */
  if (viewAllBtn && modal && modalGrid) {
    // Khi bấm "Xem tất cả"
    viewAllBtn.addEventListener("click", function (e) {
      e.preventDefault(); // Ngăn trình duyệt nhảy trang

      // Xóa sạch nội dung cũ trong Modal (nếu có)
      modalGrid.innerHTML = "";

      // Clone (nhân bản) các thẻ sản phẩm bên ngoài nhét vào Modal
      // Demo: Nhét 2 lần để có 8 sản phẩm cho thanh cuộn xuất hiện
      colCards.forEach((card) => {
        let clonedCard = card.cloneNode(true);
        modalGrid.appendChild(clonedCard);
      });
      colCards.forEach((card) => {
        let clonedCard = card.cloneNode(true);
        modalGrid.appendChild(clonedCard);
      });

      // Kích hoạt chức năng đổi ảnh/màu cho các thẻ trong Modal vừa clone
      const newClonedCards = modalGrid.querySelectorAll(".col-card");
      initProductCards(newClonedCards);

      // Hiển thị Modal
      modal.classList.add("active");

      // Ngăn cuộn trang web bên dưới
      document.body.style.overflow = "hidden";
    });

    // Khi bấm dấu X để đóng
    closeBtn.addEventListener("click", function () {
      modal.classList.remove("active");
      // Trả lại thanh cuộn cho trang web
      document.body.style.overflow = "auto";
    });

    // Khi bấm ra ngoài vùng xám để đóng
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  }
});
