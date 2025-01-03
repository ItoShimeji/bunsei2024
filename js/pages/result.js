/**
 * 指定された形式の JSON データから、対応する HTML を生成して返す関数
 * @param {Object} data 受験実績などの情報が入った JSON
 * @returns {string} 生成した HTML 文字列
 */
function generateSchoolHtml(data) {
  // --- 中学受験セクション ---
  const jOverview = data.junior_high.overview;
  let juniorHighHtml = `
  <section class="school junior-high">
    <div class="school-title">
      <span class="title">中学受験</span>
      <span class="abstract">在籍者${jOverview["在籍者"]}名 受験者${jOverview["受験者"]}名</span>
    </div>
  `;

  // junior_high テーブル一覧を生成
  data.junior_high.tables.forEach((table) => {
    juniorHighHtml += `
    <table class="school-table">
      <thead>
        <caption>
          ${table.title}
        </caption>
        <tr>
          <th>学校名</th>
          <th>コース</th>
          <th>人数</th>
        </tr>
      </thead>
      <tbody>
  `;
    // テーブルの内容がない場合はデフォルトの1行を表示
    if (table.data.length > 0) {
      table.data.forEach((row) => {
        juniorHighHtml += `
        <tr>
          <td>${row.name}</td>
          <td>${row.course}</td>
          <td>${row.students ? row.students + "名" : ""}</td>
        </tr>
  `;
      });
    } else {
      juniorHighHtml += `
        <tr>
          <td>学校名</td>
          <td></td>
          <td></td>
        </tr>
  `;
    }

    juniorHighHtml += `
      </tbody>
    </table>
  `;
  });

  juniorHighHtml += `
  </section>
  `;

  // --- 高校受験セクション ---
  const hOverview = data.high_school.overview;
  let highSchoolHtml = `
  <section class="school high-school">
    <div class="school-title">
      <span class="title">高校受験</span>
      <span class="abstract">在籍者${hOverview["在籍者"]}名 受験者${hOverview["受験者"]}名 進学${hOverview["進学"]}名</span>
    </div>
  `;

  // high_school テーブル一覧を生成
  data.high_school.tables.forEach((table) => {
    highSchoolHtml += `
    <table class="school-table">
      <thead>
        <caption>
          ${table.title}
        </caption>
        <tr>
          <th>学校名</th>
          <th>コース</th>
          <th>人数</th>
        </tr>
      </thead>
      <tbody>
  `;
    if (table.data.length > 0) {
      table.data.forEach((row) => {
        highSchoolHtml += `
        <tr>
          <td>${row.name}</td>
          <td>${row.course}</td>
          <td>${row.students ? row.students + "名" : ""}</td>
        </tr>
  `;
      });
    } else {
      highSchoolHtml += `
        <tr>
          <td>学校名</td>
          <td></td>
          <td></td>
        </tr>
  `;
    }

    highSchoolHtml += `
      </tbody>
    </table>
  `;
  });

  highSchoolHtml += `
  </section>
  `;

  // --- 大学受験セクション ---
  const uOverview = data.university.overview;
  let universityHtml = `
  <section class="school university">
    <div class="school-title">
      <span class="title">大学受験</span>
      <!-- ※サンプル HTML に合わせて「在籍者名○名」のように "名" が重なる部分がありますが、
           そのまま再現するため、下記のようにしてあります。 -->
      <span class="abstract">在籍者名${uOverview["在籍者"]}名 受験${uOverview["受験者"]}名</span>
    </div>
  `;

  // university テーブル一覧を生成
  data.university.tables.forEach((table) => {
    let thead = "";
    let tbodyContent = "";

    // タイトルごとにカラムヘッダが異なるため条件分岐
    if (table.title === "国公立大学") {
      thead = `
      <thead>
        <caption>
          ${table.title}
        </caption>
        <tr>
          <th>学校名</th>
          <th>学部学科</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
  `;
      if (table.data.length > 0) {
        table.data.forEach((row) => {
          tbodyContent += `
        <tr>
          <td>${row.name}</td>
          <td>${row.course}</td>
          <td>${row.students ? row.students + "名" : ""}</td>
        </tr>
  `;
        });
      } else {
        tbodyContent += `
        <tr>
          <td>学校名</td>
          <td></td>
          <td></td>
        </tr>
  `;
      }
      tbodyContent += `
      </tbody>
  `;
    } else if (table.title === "私立大学") {
      thead = `
      <thead>
        <caption>
          ${table.title}
        </caption>
        <tr>
          <th>学校名</th>
          <th>学部学科</th>
          <th>人数</th>
        </tr>
      </thead>
      <tbody>
  `;
      if (table.data.length > 0) {
        table.data.forEach((row) => {
          tbodyContent += `
        <tr>
          <td>${row.name}</td>
          <td>${row.course}</td>
          <td>${row.students ? row.students + "名" : ""}</td>
        </tr>
  `;
        });
      } else {
        tbodyContent += `
        <tr>
          <td>学校名</td>
          <td></td>
          <td></td>
        </tr>
  `;
      }
      tbodyContent += `
      </tbody>
  `;
    } else if (table.title === "海外大学") {
      thead = `
      <thead>
        <caption>
          ${table.title}
        </caption>
        <tr>
          <th>学校名</th>
          <th>コース</th>
          <th>人数</th>
        </tr>
      </thead>
      <tbody>
  `;
      if (table.data.length > 0) {
        table.data.forEach((row) => {
          tbodyContent += `
        <tr>
          <td>${row.name}</td>
          <td>${row.course}</td>
          <td>${row.students ? row.students + "名" : ""}</td>
        </tr>
  `;
        });
      } else {
        tbodyContent += `
        <tr>
          <td>学校名</td>
          <td></td>
          <td></td>
        </tr>
  `;
      }
      tbodyContent += `
      </tbody>
  `;
    }

    universityHtml += `
    <table class="school-table">
  ${thead}${tbodyContent}
    </table>
  `;
  });

  universityHtml += `
  </section>
  `;

  // すべて結合した HTML を返す
  return juniorHighHtml + highSchoolHtml + universityHtml;
}

function processHashString(hashString) {
  if (!hashString) return;
  // 先頭の # を削除
  const numberString = hashString.startsWith("#")
    ? hashString.slice(1)
    : hashString;

  // 整数かどうか判定
  if (/^\d+$/.test(numberString)) {
    return Number(numberString);
  } else {
    return null;
  }
}

export default async function resultLoader() {
  const { years: allYearsList } = await fetch(
    "/components/results/allYears.json"
  ).then((res) => res.json());

  const yearString = window.location.hash;
  let year = processHashString(yearString);

  if (!year) year = allYearsList[allYearsList.length - 1];
  if (!allYearsList.includes(year)) return;
  const path = `/components/results/${year}.json`;

  const yearJson = await fetch(path).then((res) => res.json());

  const resultHtml = generateSchoolHtml(yearJson);

  const container = document.querySelector("#result");
  if (container) {
    container.innerHTML = resultHtml;
  }
}
