// Hàm xử lý khi bấm nút "PHÂN TÍCH NGAY" ở mục Trợ lý AI Phong Thủy
function showAIResult() {
  const resultBox = document.getElementById("aiResultBox");
  if (resultBox) {
    // Thêm class 'show-result' để bảng bên phải hết bị mờ và hiển thị rõ ràng lên
    resultBox.classList.add("show-result");
  }
}
