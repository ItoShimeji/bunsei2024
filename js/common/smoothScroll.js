export function initSmoothScroll(samePageOffset) {
  window.addEventListener("load", () => {
    // セッションに crossPageOffset が保存されていれば利用（異ページ遷移時）
    const storedOffset = sessionStorage.getItem("crossPageOffset");
    const offset = storedOffset ? parseInt(storedOffset, 10) : samePageOffset;
    // 使用済みなので削除
    sessionStorage.removeItem("crossPageOffset");
    scrollToHash(offset);
  });
}

export function scrollToHash(offset) {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 960) {
    offset += 30;
  }

  const hash = window.location.hash;
  if (hash && /^#[a-zA-Z]/.test(hash)) {
    const target = document.querySelector(hash);
    if (target) {
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  }
}
