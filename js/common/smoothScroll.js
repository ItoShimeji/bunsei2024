export function initSmoothScroll(defaultOffset = 80) {
  window.addEventListener("load", () => {
    // crossPageOffsetがセッションに保存されている場合はそちらを利用
    const storedOffset = sessionStorage.getItem("crossPageOffset");
    const offset = storedOffset ? parseInt(storedOffset, 10) : defaultOffset;
    // 使用後は削除しておくと、次回ロード時に影響しません
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
