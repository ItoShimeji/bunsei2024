// ページロード時のスムーズスクロール
window.addEventListener("load", function () {
  scrollToHash();
});

// アンカーリンククリック時のスムーズスクロール
document.addEventListener("click", function (event) {
  if (event.target.tagName === "A" && event.target.hash) {
    event.preventDefault(); // デフォルトのアンカーリンクの動作を無効化
    history.pushState(null, null, event.target.hash); // URLにハッシュを追加
    scrollToHash(100);
  }
});

function scrollToHash(offset = 80) {
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  }
}
