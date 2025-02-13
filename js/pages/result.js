function generateSchoolHtml(data) {
  let html = "";

  data.schools.forEach((section) => {
    // セクションのタイトルは、section.school に「受験」を結合して自動生成
    const displayTitle = `${section.school}受験`;

    // 各項目の表示順序とラベルを定義（JSON に記述があればその項目を表示）
    const overviewOrder = ["total_students", "exam_takers", "advancers"];
    const overviewLabels = {
      total_students: "在籍",
      exam_takers: "受験",
      advancers: "進学",
    };

    // JSON に記述されている項目のみ抽出（値が存在していれば表示）
    const overviewParts = overviewOrder.reduce((parts, key) => {
      if (section.overview[key] != null && section.overview[key] !== 0) {
        parts.push(`${overviewLabels[key]}${section.overview[key]}名`);
      }
      return parts;
    }, []);
    const abstract = overviewParts.join(" ");

    html += `
    <section class="school">
      <div class="school-title">
        <span class="title">${displayTitle}</span>
        <span class="abstract">${abstract}</span>
      </div>
    `;

    // 各テーブルの生成
    section.tables
      .filter((table) => table.data.length > 0)
      .forEach((table) => {
        let tableHtml = `<table class="school-table">
        <thead>
          <caption>${table.title}</caption>`;

        // 大学の場合はテーブルタイトルによりヘッダーを変える（必要に応じて拡張）
        if (section.school === "大学") {
          tableHtml += `
          <tr>
            <th>学校名</th>
            <th>学部学科</th>
            <th>人数</th>
          </tr>`;
        } else {
          // 中学、高校の場合は共通のヘッダー
          tableHtml += `
          <tr>
            <th>学校名</th>
            <th>コース</th>
            <th>人数</th>
          </tr>`;
        }

        tableHtml += `
        </thead>
        <tbody>`;

        // テーブルのデータ行生成
        if (table.data) {
          table.data.forEach((row) => {
            tableHtml += `
          <tr>
            <td>${row.name}</td>
            <td>${row.course}</td>
            <td>${row.students ? row.students + "名" : "1名"}</td>
          </tr>`;
          });
        } else {
          tableHtml += `
          <tr>
            <td>学校名</td>
            <td></td>
            <td></td>
          </tr>`;
        }
        tableHtml += `
        </tbody>
      </table>`;

        html += tableHtml;
      });

    html += `
    </section>`;
  });

  return html;
}

function processSearchParams(yearString, allYearsList) {
  let year;

  if (yearString) year = Number(new URLSearchParams(yearString).get("year"));

  // ハッシュが不正な場合は最新年度を使用
  if (!year || !allYearsList.includes(year))
    year = allYearsList[allYearsList.length - 1];

  return year;
}

function generateLinksHtml(allYearsList, currentPageYear) {
  const html = allYearsList
    .reverse()
    .map(
      (year) =>
        `
        <li class="result-grid-item ${
          year === currentPageYear && "result-now"
        }">
          <a href="/result/?year=${year}">${year}年</a>
        </li>
        `
    )
    .join("");

  return html;
}

function switchLinks() {
  const linksSideDiv = document.querySelector(".result-links-side");
  const linksDiv = document.querySelector(".result-links");
  const main = document.querySelector("main");
  const resutDiv = document.querySelector("#result");

  // 画面の幅によってレイアウトを変更
  const adjustContentForViewport = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 960) {
      linksDiv.remove();
      main.insertAdjacentElement("beforebegin", linksSideDiv);
    } else {
      linksSideDiv.remove();
      resutDiv.insertAdjacentElement("afterend", linksDiv);
    }
  };

  if (linksSideDiv && linksDiv) {
    adjustContentForViewport();
    window.addEventListener("resize", adjustContentForViewport);
  }
}

export default async function resultLoader() {
  // 年度一覧の JSON を取得
  const { years: allYearsList } = await fetch("/result/allYears.json").then(
    (res) => res.json()
  );

  const searchParamsString = window.location.search;
  const year = processSearchParams(searchParamsString, allYearsList);

  // 該当年度の JSON を取得して HTML を生成
  const path = `/result/years/${year}.json`;
  const yearJson = await fetch(path).then((res) => res.json());
  const resultHtml = generateSchoolHtml(yearJson);

  const LinksHtml = generateLinksHtml(allYearsList, year);

  // 生成した HTML を指定のコンテナに挿入
  const heading = document.querySelector(".result-heading");
  if (heading) {
    heading.innerHTML = `${year}年入試結果`;
  }

  const container = document.querySelector("#result");
  if (container) {
    container.innerHTML = resultHtml;
  }

  const yearsContainers = document.querySelectorAll(".result-grid-container");
  Array.from(yearsContainers).forEach((yearsContainer) => {
    yearsContainer.innerHTML = LinksHtml;
  });

  // 他の年度のリンク欄の表示を変更
  switchLinks();
}
