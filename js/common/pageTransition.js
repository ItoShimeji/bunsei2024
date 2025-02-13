import { scrollToHash } from "./smoothScroll.js";

export function setupPageTransition({ samePageOffset, crossPageOffset } = {}) {
  document.addEventListener("click", (event) => {
    // クリックイベント発生箇所の最も近い li 要素を取得
    const li = event.target.closest("li");
    if (!li) return;

    // li の直下（:scope > a）に a 要素が存在する場合のみ対象とする
    const directAnchor = li.querySelector(":scope > a ");
    if (!directAnchor) return;

    // ここからは li のクリックを a のクリックと同様の動作として処理
    const linkUrl = new URL(directAnchor.href, window.location.href);

    if (
      linkUrl.host === window.location.host &&
      linkUrl.pathname === window.location.pathname
    ) {
      // 【同一ページ内リンク】
      event.preventDefault();
      history.pushState(null, "", directAnchor.hash);
      scrollToHash(samePageOffset);
    } else {
      // 【異ページリンク】
      // 次ページでのスクロールオフセットとして crossPageOffset を利用できるよう保存
      sessionStorage.setItem("crossPageOffset", crossPageOffset);
      event.preventDefault();
      window.location.href = directAnchor.href;
    }
  });
}
