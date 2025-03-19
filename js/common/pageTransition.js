import { scrollToHash } from "./smoothScroll.js";

function setAnchor(e) {
  if (e.target.tagName === "A") {
    e.preventDefault(); // 通常のリンク遷移をキャンセル
    return e.target;
  } else if (e.target.tagName === "LI") {
    const li = e.target; // クリックされた li 要素を取得

    // li の直近の親要素が対象のコンテナかチェック
    const parent = li.parentElement;
    if (
      !parent ||
      (!parent.classList.contains("expanded-click-container") &&
        !parent.classList.contains("rectangle-button-container"))
    ) {
      return; // 対象のコンテナでなければ何もしない
    }

    return li.querySelector("a"); // li 内の a タグを返す
  }
}

function pageTransition(anchor) {
  if (anchor.target === "_blank") {
    // ケース1: 別タブを開く
    window.open(anchor.href, "_blank", "noopener,noreferrer");
  } else {
    // ケース2,3: それ以外のページ遷移
    window.location.href = anchor.href;
    if (
      anchor.host === window.location.host &&
      anchor.pathname === window.location.pathname
    ) {
      // ケース3: 同一ページ内の遷移
      // ページ内の場合はloadイベントが発火しないため、明示的に発火する
      const loadEvent = new Event("load");
      window.dispatchEvent(loadEvent);
    }
  }
}

export function setupPageTransition() {
  document.addEventListener("click", (e) => {
    const anchor = setAnchor(e);
    if (!anchor) return;

    pageTransition(anchor);
  });
}

function setOffset(e, defaultOffset, offsets) {
  const nextPath = e.target.location.pathname;
  const offset = offsets.find(
    (page) =>
      page.pathname === nextPath || `${page.pathname}index.html` === nextPath
  );
  return offset ? offset.offset : defaultOffset;
}

export function attachLoadEvent(defaultOffset, offsets) {
  window.addEventListener("load", (e) => {
    // ページ読み込み時にハッシュがなければ何もしない
    const hash = window.location.hash;

    if (!hash || !/^#[a-zA-Z]/.test(hash)) return;

    const offset = setOffset(e, defaultOffset, offsets);

    scrollToHash(offset);
  });
}
