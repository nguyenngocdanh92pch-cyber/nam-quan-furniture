document.addEventListener("htmlLoaded", function () {
  // Lấy các DOM elements bằng các class "mỏ neo" bạn đã gắn trong HTML
  const colTabs = document.querySelectorAll(".col-tab");
  const colGrid = document.querySelector(".collection-grid");
  const colCards = document.querySelectorAll(".col-card");

  const viewAllBtn = document.querySelector(".col-view-all");
  const modal = document.getElementById("allProductsModal");
  const modalGrid = document.getElementById("modalProductGrid");

  // HÀM KHỞI TẠO TƯƠNG TÁC ĐỔI MÀU CHO SẢN PHẨM
  function initProductCards(cardsNodeList) {
    cardsNodeList.forEach((card) => {
      const mainImage = card.querySelector(".col-main-img");
      const colorDots = card.querySelectorAll(".col-color-dot");

      // Lưu lại ảnh gốc khi vừa tải trang
      if (mainImage && !card.hasAttribute("data-default-image")) {
        card.setAttribute("data-default-image", mainImage.src);
      }

      // Gắn sự kiện click cho từng chấm màu
      colorDots.forEach((dot) => {
        dot.addEventListener("click", function () {
          // Xóa viền cam của tất cả các chấm khác
          colorDots.forEach((d) =>
            d.classList.remove("border", "border-brand-orange"),
          );

          // Thêm viền cam cho chấm đang chọn
          this.classList.remove("border-transparent");
          this.classList.add("border", "border-brand-orange");

          // Lấy link ảnh từ thuộc tính data-image
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

  // Khởi chạy hàm cho lưới Collection ngoài giao diện chính
  if (colCards.length > 0) initProductCards(colCards);

  // ==========================================
  // TƯƠNG TÁC CHUYỂN TAB & RESET SẢN PHẨM
  // ==========================================
  if (colTabs.length > 0) {
    colTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        // 1. Chuyển UI Tab (Đổi màu nền và màu chữ bằng Tailwind)
        colTabs.forEach((t) => {
          t.classList.remove(
            "bg-[#ddefd8]",
            "text-[#175214]",
            "sm:shadow-[-50vw_0_0_0_#ddefd8]",
          );
          t.classList.add("bg-transparent", "text-[#219653]");
        });

        this.classList.remove("bg-transparent", "text-[#219653]");
        this.classList.add(
          "bg-[#ddefd8]",
          "text-[#175214]",
          "sm:shadow-[-50vw_0_0_0_#ddefd8]",
        );

        // 2. Logic Reset lại màu/ảnh sản phẩm
        colCards.forEach((card) => {
          const mainImage = card.querySelector(".col-main-img");
          const colorDots = card.querySelectorAll(".col-color-dot");

          // Xóa viền màu đang chọn, trả về viền trong suốt
          colorDots.forEach((d) => {
            d.classList.remove("border", "border-brand-orange");
            d.classList.add("border-transparent");
          });

          // Phục hồi lại ảnh ban đầu
          const defaultImageSrc = card.getAttribute("data-default-image");
          if (mainImage && defaultImageSrc) mainImage.src = defaultImageSrc;
        });

        // 3. Hiệu ứng chớp nháy lưới
        if (colGrid) {
          colGrid.style.opacity = "0.5";
          colGrid.style.transition = "opacity 0.2s ease";
          setTimeout(() => (colGrid.style.opacity = "1"), 200);
        }
      });
    });
  }

  // TƯƠNG TÁC POPUP MODAL (XEM TẤT CẢ)
  if (viewAllBtn && modal && modalGrid) {
    // Tìm nút tắt Modal (dấu X)
    const closeBtn = modal.querySelector(".modal-close-btn");

    // Hàm Đóng Modal
    const closeModal = () => {
      modal.classList.remove("opacity-100", "visible");
      modal.classList.add("opacity-0", "invisible");
      document.body.style.overflow = "auto";
    };

    // Bật Modal khi bấm nút "Xem tất cả"
    viewAllBtn.addEventListener("click", function (e) {
      e.preventDefault();

      modalGrid.innerHTML = "";

      // Copy các Card vào Popup
      if (colCards.length > 0) {
        colCards.forEach((card) => modalGrid.appendChild(card.cloneNode(true)));
        colCards.forEach((card) => modalGrid.appendChild(card.cloneNode(true)));
      }

      // Kích hoạt chức năng click màu cho các thẻ BÊN TRONG MODAL
      initProductCards(modalGrid.querySelectorAll(".col-card"));

      // Hiển thị Modal
      modal.classList.remove("opacity-0", "invisible");
      modal.classList.add("opacity-100", "visible");
      document.body.style.overflow = "hidden";
    });

    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    // Bấm ra ngoài nền đen để tắt
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
  } else {
    console.warn("⚠️ Lỗi: Không tìm thấy Modal Popup hoặc nút Xem tất cả.");
  }
});
