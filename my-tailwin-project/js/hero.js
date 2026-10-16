// Lắng nghe sự kiện htmlLoaded từ load-parts.js thay vì DOMContentLoaded
document.addEventListener("htmlLoaded", function () {
  /* =========================================
     1. TƯƠNG TÁC CHUYỂN MENU ĐIỀU HƯỚNG
  ========================================= */
  const navLinks = document.querySelectorAll(".sub-nav-link");

  if (navLinks.length > 0) {
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        // Gỡ trạng thái 'nav-active' và thanh gạch ngang (w-0)
        navLinks.forEach((l) => {
          l.classList.remove("nav-active", "font-bold");
          const indicator = l.nextElementSibling;
          if (indicator) indicator.classList.replace("w-full", "w-0");
        });

        // Kích hoạt nút hiện tại: in đậm và kéo dài thanh gạch ngang (w-full)
        this.classList.add("nav-active", "font-bold");
        const myIndicator = this.nextElementSibling;
        if (myIndicator) myIndicator.classList.replace("w-0", "w-full");
      });
    });
  }

  /* =========================================
     2. TƯƠNG TÁC THANH TÌM KIẾM
  ========================================= */
  const searchInput = document.querySelector(".search-input");
  const searchIcon = document.querySelector(".search-icon");

  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        const keyword = this.value.trim();
        if (keyword !== "") {
          alert("Hệ thống đang tìm kiếm từ khóa: " + keyword);
          this.value = "";
          this.blur();
        }
      }
    });
  }

  if (searchIcon && searchInput) {
    searchIcon.addEventListener("click", function () {
      searchInput.focus();
    });
  }
});
