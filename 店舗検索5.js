document.addEventListener("DOMContentLoaded", () => {

  // ✅ sub-area 버튼 클릭 시 해당 URL로 이동
document.querySelectorAll(".sub-area-all .area-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const url = btn.dataset.url;
    if (!url) return;
    window.location.href = url;
  });
});


  const whereBtn = document.querySelector(".where");

  whereBtn.addEventListener("click", () => {
    alert("ご指定の検索条件に合う店舗が見つかりませんでした。大変お手数ですが、条件を変えて再度検索してください。");
  });





  const buttons = [

    {

      btn: document.getElementById("all-area-btn"),

      area: document.getElementById("sub-area"),

    },

    {

      btn: document.getElementById("hok-area-btn"),

      area: document.getElementById("sub-area2"),

    },

    {

      btn: document.getElementById("kanto-area-btn"),

      area: document.getElementById("sub-area3"),

    },

    {

      btn: document.getElementById("hoku-area-btn"),

      area: document.getElementById("sub-area4"),

    },

    {

      btn: document.getElementById("dokai-area-btn"),

      area: document.getElementById("sub-area5"),

    },

    {

      btn: document.getElementById("kansai-area-btn"),

      area: document.getElementById("sub-area6"),

    },

     {

      btn: document.getElementById("chu-area-btn"),

      area: document.getElementById("sub-area7"),

    },

     {

      btn: document.getElementById("siko-area-btn"),

      area: document.getElementById("sub-area8"),

    },

     {

      btn: document.getElementById("khu-area-btn"),

      area: document.getElementById("sub-area9"),

    },

  ];

 const keywordBox = document.querySelector(".keyword"); /* 추가*/

  buttons.forEach(({ btn, area }) => {

    btn.addEventListener("click", () => {

      buttons.forEach(({ btn: otherBtn, area: otherArea }) => {

        if (otherArea !== area) {

          otherArea.classList.remove("active");

          otherBtn.classList.remove("active");

        }

      });



      area.classList.toggle("active");

      btn.classList.toggle("active");

      // 🔥 sub-area 열림 여부 확인
const anyOpen = buttons.some(({ area }) =>
  area.classList.contains("active")
);



// 키워드 위치 조정
keywordBox.classList.toggle("compact", anyOpen);

    });

  });

  // ✅ 키워드 검색 기능
const keywordInput = document.querySelector('.keyword input[type="text"]');
const keywordSearchBtn = document.querySelector(".keyword-search");

function goSearch() {
  const keyword = keywordInput.value.trim();
  if (!keyword) return;

  const url = `https://shop.kurasushi.co.jp/all?keyword=${encodeURIComponent(keyword)}`;
  window.location.href = url;
}

keywordSearchBtn.addEventListener("click", goSearch);

keywordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") goSearch();
});




// ✅ 체크박스 검색 전용


keywordSearchBtn.addEventListener("click", () => {

  const checkedBoxes = document.querySelectorAll(
    '.cbgroup input[type="checkbox"]:checked'
  );

  // 🔥 아무것도 체크 안 했으면 아무 일도 안 함
  if (checkedBoxes.length === 0) return;

  const services = Array.from(checkedBoxes)
    .map((cb) =>
      cb.closest("label")?.textContent.replace(/\s+/g, " ").trim() ?? ""
    )
    .filter(Boolean);

  const url =
    "https://shop.kurasushi.co.jp/all?services=" +
    encodeURIComponent(services.join(","));

  window.location.assign(url);
});



// ✅ 리セット 버튼: 선택/입력/체크 전부 초기화
const resetBtn = document.querySelector(".reset-btn");

resetBtn.addEventListener("click", () => {
  // 1) 체크박스 전부 해제
  document
    .querySelectorAll('.cbgroup input[type="checkbox"]')
    .forEach((cb) => (cb.checked = false));

});

});
