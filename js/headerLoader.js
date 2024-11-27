// ヘッダーのテンプレートを読み込む関数
function loadHeader() {
  const header = document.querySelector("header");
  fetch("/components/header.html") // ヘッダーHTMLファイルを取得
    .then((response) => {
      if (!response.ok) {
        throw new Error("ヘッダーの読み込みに失敗しました");
      }
      return response.text();
    })
    .then((html) => {
      header.innerHTML = html; // headerタグに読み込んだHTMLを挿入
      attachHeaderEvents(); // イベントリスナーを登録
    })
    .catch((error) => {
      console.error(error);
    });
}

// ヘッダー内のボタンやナビゲーションの制御を登録
function attachHeaderEvents() {
  const ham = document.querySelector("#js-hamburger");
  const nav = document.querySelector("#js-nav");

  if (ham && nav) {
    ham.addEventListener("click", function () {
      ham.classList.toggle("active");
      nav.classList.toggle("active");
    });
  }
}

// ページが読み込まれたらヘッダーを読み込む
document.addEventListener("DOMContentLoaded", loadHeader);
