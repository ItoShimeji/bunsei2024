export default function attachAccessEvents() {
  // 要素の取得
  const addressDiv = document.querySelector("#access .address");
  const newAddressDiv = addressDiv.cloneNode(true);
  const mapDiv = document.querySelector("#access .map");
  const accessDiv = document.querySelector("#access .access");

  // 画面の幅によってレイアウトを変更
  let screenWidth = window.innerWidth;
  const adjustContentForViewport = () => {
    screenWidth = window.innerWidth;
    if (screenWidth >= 960) {
      addressDiv.remove();
      accessDiv.insertAdjacentElement("beforebegin", newAddressDiv);
    } else {
      newAddressDiv.remove();
      mapDiv.insertAdjacentElement("beforebegin", addressDiv);
    }
  };

  if (addressDiv && accessDiv) {
    adjustContentForViewport();
    window.addEventListener("resize", adjustContentForViewport);
  }
}
