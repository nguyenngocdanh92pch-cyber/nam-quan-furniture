window.showTab = function (tabId, clickedBtn) {
  const allTabs = document.querySelectorAll(".k-tab");

  // 1. CHUYỂN TOÀN BỘ TABS VỀ TRẠNG THÁI MẶC ĐỊNH (INACTIVE)
  allTabs.forEach((btn) => {
    // Ép gỡ bỏ toàn bộ các class tạo "màu cam" (Trạng thái Active)
    btn.classList.remove(
      "bg-[#fff2e6]",
      "border-[#e87a00]",
      "text-[#e87a00]",
      "active", // Phòng trường hợp HTML còn sót class 'active'
    );
    // Ép thêm vào các class tạo "màu xám/trắng" (Trạng thái Inactive)
    btn.classList.add("bg-white", "border-[#d5d7da]", "text-[#333333]");
  });

  // 2. BẬT TRẠNG THÁI ACTIVE CHỈ CHO NÚT ĐƯỢC CLICK
  // Phải gỡ màu xám/trắng trước
  clickedBtn.classList.remove("bg-white", "border-[#d5d7da]", "text-[#333333]");
  // Rồi mới đắp màu cam lên
  clickedBtn.classList.add(
    "bg-[#fff2e6]",
    "border-[#e87a00]",
    "text-[#e87a00]",
    "active",
  );

  // 3. HIỆU ỨNG CHUYỂN BÀI VIẾT (GIẢ LẬP LOAD DATA)
  const contentBox = document.getElementById("knowledge-content");
  if (contentBox) {
    const articles = contentBox.querySelectorAll(".group"); // Các thẻ bài viết đang có class 'group'

    // Làm mờ nhanh
    contentBox.style.opacity = "0.2";
    contentBox.style.transition = "opacity 0.25s ease";

    setTimeout(() => {
      // Giả lập load lại: Trong thực tế, bạn sẽ ẩn hiện dữ liệu theo tham số 'tabId'
      articles.forEach((article) => {
        article.style.display = "flex";
      });

      // Hiển thị rõ lại
      contentBox.style.opacity = "1";
    }, 250);
  }
};
