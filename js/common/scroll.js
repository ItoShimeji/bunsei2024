export default function attachPageTransitionEvents() {
  // ページロード時のスムーズスクロール
  window.addEventListener("load", function () {
    scrollToHash();
  });

  // アンカーリンククリック時のスムーズスクロール
  document.addEventListener("click", function (event) {
    let target = event.target;

    if (target.tagName === "LI" && target.children[0]?.tagName === "A") {
      target = target.children[0];
    }

    if (target.tagName === "A" && target.hash) {
      const linkHost = target.host;
      const linkPath = target.pathname;
      checkSamePage(event, target, linkHost, linkPath);
    }
  });
}

function checkSamePage(event, anchor, linkHost, linkPath) {
  if (
    linkHost === window.location.host &&
    linkPath === window.location.pathname
  ) {
    event.preventDefault(); // デフォルトのアンカーリンクの動作を無効化
    history.pushState(null, null, anchor.hash); // URLにハッシュを追加
    scrollToHash(100);
  }
}

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
