import { scrollToHash } from "./smoothScroll.js";

export function setupPageTransition({ samePageOffset, crossPageOffset }) {
  document.addEventListener("click", (event) => {
    // クリックされた要素が含まれる li 要素を取得
    const li = event.target.closest("li");
    if (!li) return; // li がない場合は対象外

    // li の直近の親要素が対象のコンテナかチェック
    const parent = li.parentElement;
    if (
      !parent ||
      (!parent.classList.contains("expanded-click-container") &&
        !parent.classList.contains("rectangle-button-container"))
    ) {
      return; // 対象のコンテナでなければ何もしない
    }

    // li 内に a タグが存在するかチェック
    const anchor = li.querySelector("a");
    if (!anchor) return;

    // スクロール処理が必要か判定
    if (anchor.hash && /^#[a-zA-Z]/.test(anchor.hash)) {
      // 同一ページ内リンクか異ページリンクか判定
      const linkUrl = new URL(anchor.href, window.location.href);
      if (
        linkUrl.host === window.location.host &&
        linkUrl.pathname === window.location.pathname
      ) {
        // ケース1: 同一ページ内移動
        event.preventDefault();
        history.pushState(null, "", anchor.hash);
        scrollToHash(samePageOffset);
      } else {
        // ケース2: 異ページ移動
        event.preventDefault();
        sessionStorage.setItem("crossPageOffset", crossPageOffset);
        window.location.href = anchor.href;
      }
    } else {
      if (anchor.target === "_blank") {
        // ケース3: 別タブを開く
        window.open(anchor.href, "_blank", "noopener,noreferrer");
      } else {
        // ケース4: それ以外の通常の移動
        window.location.href = anchor.href;
      }
    }
  });
}
