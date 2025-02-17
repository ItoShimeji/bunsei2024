import templateLoder from "./common/templateLoader.js";
import {
  setupPageTransition,
  attachLoadEvent,
} from "./common/pageTransition.js";
import attachHeaderEvents from "./common/attachHeaderEvents.js";
import attachAccessEvents from "./pages/home.js";
import resultLoader from "./pages/result.js";

const defaultPageOffset = 110;
const pageOffsets = [
  { pathname: "/", offset: 110 },
  { pathname: "/notice/", offset: 80 },
];

//即時実行関数
(async () => {
  //イベントリスナー登録(非同期処理の前に行わないとスクロール処理は間に合わない)
  setupPageTransition();
  attachLoadEvent(defaultPageOffset, pageOffsets);

  // ヘッダーとフッターをロード
  await templateLoder("/components/header.html", "header");
  await templateLoder("/components/footer.html", "footer");

  //イベントリスナー登録
  attachHeaderEvents();

  //個別のページに対する処理
  const currentPath = window.location.pathname;

  switch (currentPath) {
    case "/":
    case "/index.html":
      attachAccessEvents();
      break;
    case "/result/":
    case "/result/index.html":
      await resultLoader();
      break;
  }
})();
