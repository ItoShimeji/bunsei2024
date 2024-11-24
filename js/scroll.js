// ページロード時のスムーズスクロール
window.addEventListener("load", function () {
  scrollToHash();
});

// アンカーリンククリック時のスムーズスクロール
document.addEventListener("click", function (event) {
  let target = event.target;

  // `LI`をクリックした場合、その子要素の`<a>`タグを取得
  if (target.tagName === "LI" && target.children[0]?.tagName === "A") {
    target = target.children[0]; // `<a>`タグをクリックターゲットに変更
    target.click(); // `<a>`タグのクリックイベントを発生
    return; // 以降の処理は不要
  }

  // `<a>`タグをクリックした場合
  if (target.tagName === "A" && target.hash) {
    const linkHost = target.host;
    const linkPath = target.pathname;
    checkSamePage(event, target, linkHost, linkPath);
  }
});

function checkSamePage(event, anchor, linkHost, linkPath) {
  // 同じページ内リンクであることを確認
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
