// Hàm xử lý chuyển Tab (Được gọi từ thuộc tính onclick="showTab(..., this)" trong HTML)
window.showTab = function (tabId, clickedBtn) {
  // 1. Gỡ class 'active' (viền cam) khỏi tất cả các nút tab
  const allTabs = document.querySelectorAll(".k-tab");
  allTabs.forEach((btn) => btn.classList.remove("active"));

  // 2. Thêm class 'active' cho nút vừa được bấm
  clickedBtn.classList.add("active");

  // 3. Lấy khung chứa lưới bài viết
  const contentBox = document.getElementById("knowledge-content");

  // 4. Hiệu ứng làm mờ và "lọc" dữ liệu giả lập
  if (contentBox) {
    const articles = contentBox.querySelectorAll(".k-card");

    // Làm mờ đi để tạo cảm giác đang load dữ liệu từ server
    contentBox.style.opacity = "0.2";

    // Đợi 250ms (1/4 giây) rồi mới xử lý hiển thị lại
    setTimeout(() => {
      articles.forEach((article) => {
        article.style.display = "block";
      });

      // Hết thời gian chờ, hiển thị lại rõ nét lưới bài viết
      contentBox.style.opacity = "1";
    }, 250);
  }
};
