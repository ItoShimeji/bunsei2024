// フッターのテンプレートを読み込む関数
function loadResult() {
  const result = document.querySelector("#result");
  fetch("/components/results/result.html") // フッターHTMLファイルを取得
    .then((response) => {
      if (!response.ok) {
        throw new Error("ヘッダーの読み込みに失敗しました");
      }
      return response.text();
    })
    .then((html) => {
      result.innerHTML = html; // headerタグに読み込んだHTMLを挿入
    })
    .catch((error) => {
      console.error(error);
    });
}

// ページが読み込まれたらヘッダーを読み込む
document.addEventListener("DOMContentLoaded", loadResult);
