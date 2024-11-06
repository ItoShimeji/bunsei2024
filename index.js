document.addEventListener("DOMContentLoaded", () => {
  const noticeLinks = document.querySelectorAll(".notice-grid-item");

  noticeLinks.forEach((item) => {
    item.addEventListener("click", (event) => {
      // 要素内のaタグを取得
      const link = item.querySelector("a");

      // aタグが存在し、href属性がある場合のみ実行
      if (link && link.href) {
        // ページをリンク先に遷移
        window.location.href = link.href;
      }
    });
  });
});
