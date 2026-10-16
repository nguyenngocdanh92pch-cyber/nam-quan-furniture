async function loadComponent(id, filePath) {
  try {
    const element = document.getElementById(id);
    if (!element) return;
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Lỗi tải: ${filePath}`);
    element.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
}

async function initApp() {
  // Chờ tất cả các phần được tải xong HTML
  await Promise.all([
    loadComponent("header-placeholder", "sections/header.html"),
    loadComponent("hero-placeholder", "sections/hero.html"),
    loadComponent("category-about-placeholder", "sections/category-about.html"),
    loadComponent("flash-sale-placeholder", "sections/flash-sale.html"),
    loadComponent("collection-placeholder", "sections/collection.html"),
    loadComponent("showroom-placeholder", "sections/showroom.html"),
    loadComponent("bst-placeholder", "sections/bst.html"),
    loadComponent("news-placeholder", "sections/news.html"),
    loadComponent("knowledge-placeholder", "sections/knowledge.html"),
    loadComponent("partner-placeholder", "sections/partner.html"),
    loadComponent("consult-placeholder", "sections/consult.html"),
    loadComponent("ai-placeholder", "sections/ai-section.html"),
    loadComponent("footer-placeholder", "sections/footer.html"),

    // TẢI FILE MODAL RIÊNG
    loadComponent("modal-placeholder", "sections/popup-modal.html"),
  ]);

  // PHÁT TÍN HIỆU CHO TOÀN BỘ CÁC FILE JS KHÁC BIẾT LÀ HTML ĐÃ SẴN SÀNG
  const event = new Event("htmlLoaded");
  document.dispatchEvent(event);

  console.log("Tất cả HTML đã được nạp. Các file JS con bắt đầu thực thi!");
}

initApp();
