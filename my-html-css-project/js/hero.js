document.addEventListener("DOMContentLoaded", function () {
  // Lấy tất cả các thẻ a có class sub-nav-link
  const navLinks = document.querySelectorAll(".sub-nav-list .sub-nav-link");

  if (navLinks.length > 0) {
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        // Ngăn trình duyệt load lại trang nếu có href="#"
        e.preventDefault();

        // Xóa class 'active' khỏi tất cả các nút
        navLinks.forEach((l) => l.classList.remove("active"));

        // Thêm class 'active' cho nút vừa bị click
        this.classList.add("active");

        // Console để bạn debug dễ dàng (F12)
        // console.log("Chuyển menu tới: ", this.innerText);
      });
    });
  }

  const searchInput = document.querySelector(".search-input");
  const searchIcon = document.querySelector(".search-icon");

  if (searchInput) {
    // Khi ấn phím Enter trong ô tìm kiếm
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault(); // Ngăn submit form (nếu có)
        const keyword = this.value.trim();

        if (keyword !== "") {
          alert("Hệ thống đang tìm kiếm từ khóa: " + keyword);
          // Xóa nội dung đi sau khi đã tìm kiếm
          this.value = "";
          this.blur(); // Bỏ con trỏ nhấp nháy khỏi ô input
        }
      }
    });
  }

  if (searchIcon && searchInput) {
    // Khi bấm thẳng vào icon kính lúp
    searchIcon.addEventListener("click", function () {
      searchInput.focus(); // Tự động chèn con trỏ vào ô để gõ
    });
  }
});
