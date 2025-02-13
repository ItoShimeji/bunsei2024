import templateLoder from "./common/templateLoader.js";
import { setupPageTransition } from "./common/pageTransition.js";
import { initSmoothScroll } from "./common/smoothScroll.js";
import attachHeaderEvents from "./common/attachHeaderEvents.js";
import attachAccessEvents from "./pages/home.js";
import resultLoader from "./pages/result.js";

//即時実行関数
(async () => {
  //イベントリスナー登録(非同期処理の前に行わないとスクロール処理は間に合わない)
  setupPageTransition({ samePageOffset: 100, crossPageOffset: 80 });
  initSmoothScroll();

  // ヘッダーとフッターをロード
  await templateLoder("/components/header.html", "header");
  await templateLoder("/components/footer.html", "footer");

  //イベントリスナー登録
  attachHeaderEvents();

  //個別のページに対する処理
  const currentPath = window.location.pathname;

  switch (currentPath) {
    case "/":
      attachAccessEvents();
      break;
    case "/result/":
      await resultLoader();
      break;
  }
})();
