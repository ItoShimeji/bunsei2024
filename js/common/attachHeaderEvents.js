export default function attachHeaderEvents() {
  //ハンバーガーのクリック管理
  const ham = document.querySelector("#js-hamburger");
  const nav = document.querySelector("#js-nav");

  if (ham && nav) {
    ham.addEventListener("click", function () {
      ham.classList.toggle("active");
      nav.classList.toggle("active");
    });
  }

  // header文字列の入れ替え
  const obog = document.querySelector("#ob-og");
  let screenWidth = window.innerWidth;

  if (obog) {
    window.addEventListener("resize", () => {
      if (screenWidth === window.innerWidth) return;
      screenWidth = window.innerWidth;
      if (screenWidth >= 960) {
        obog.innerHTML = "OB/OG";
      } else {
        obog.innerHTML = "大人になったぶんのすけ達";
      }
    });
  }
}
