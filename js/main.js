import templateLoder from "./common/templateLoader.js";
import attachHeaderEvents from "./common/attachHeaderEvents.js";
import attachPageTransitionEvents from "./common/scroll.js";

//即時実行関数
(async () => {
  //イベントリスナー登録(非同期処理の前に行わないとスクロール処理は間に合わない)
  attachPageTransitionEvents();

  // ヘッダーとフッターをロード
  await templateLoder("/components/header.html", "header");
  await templateLoder("/components/footer.html", "footer");

  //イベントリスナー登録
  attachHeaderEvents();

  //個別のページに対する処理
  const currentPath = window.location.pathname;

  if (currentPath.includes("result")) {
    await templateLoder("/components/results/result.html", "#result");
  }
})();
