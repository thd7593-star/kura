const dotsContainer = document.querySelector(".slider-dots");

let currentIndex = 0;

document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".slider-track");
  let slides = Array.from(document.querySelectorAll(".slide"));
  const dotsContainer = document.querySelector(".slider-dots");

  const slideCount = slides.length;

  // 🔥 양쪽으로 3개씩 복제 (자연스러운 infinite)
  slides.forEach((slide) => {
    const clone = slide.cloneNode(true);
    track.appendChild(clone);
  });

  slides = Array.from(track.children);

  let index = slideCount; // 중앙 시작

  // 도트 3개
  dotsContainer.innerHTML = "";
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => moveTo(i));
    dotsContainer.appendChild(dot);
  }

  const dots = Array.from(document.querySelectorAll(".dot"));

  function update() {
    const slideWidth = slides[0].offsetWidth;

    // ⭐ 중앙 고정 계산
    const offset =
      slideWidth * index - (window.innerWidth / 2 - slideWidth / 2);

    track.style.transform = `translateX(-${offset}px)`;

    slides.forEach((s) => s.classList.remove("active"));
    slides[index].classList.add("active");

    const realIndex = index % slideCount;

    dots.forEach((d) => d.classList.remove("active"));
    dots[realIndex].classList.add("active");
  }

  function moveTo(i) {
    index = slideCount + i;
    update();
  }

  function next() {
    index++;
    update();

    // 자연스러운 리셋
    if (index >= slides.length - slideCount) {
      setTimeout(() => {
        track.style.transition = "none";
        index = slideCount;
        update();
        track.offsetHeight;
        track.style.transition = "transform 0.6s ease";
      }, 600);
    }
  }

  update();
  setInterval(next, 3000);
});

// nigiri로 이동
function scrollToDestination() {
  const element = document.getElementById("nigiri");

  // 부드럽게(smooth) 스크롤
  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
// 바닥으로 이동
function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight, // 문서의 전체 높이만큼 이동
    behavior: "smooth", // 부드러운 애니메이션 효과
  });
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const pathGroups = document.querySelectorAll(".path-group");
  const areaBtns = document.querySelectorAll(".area-btn, .sub-btn");

  function updateActive(area, isActive) {
    const targetElements = document.querySelectorAll(`[data-area="${area}"]`);
    targetElements.forEach((el) => {
      isActive ? el.classList.add("active") : el.classList.remove("active");
    });
  }

  // 지도 -> 버튼 연동
  pathGroups.forEach((path) => {
    path.addEventListener("mouseenter", () =>
      updateActive(path.dataset.area, true),
    );
    path.addEventListener("mouseleave", () =>
      updateActive(path.dataset.area, false),
    );
  });

  // 버튼 -> 지도 연동
  areaBtns.forEach((btn) => {
    if (!btn.dataset.area) return;
    btn.addEventListener("mouseenter", () =>
      updateActive(btn.dataset.area, true),
    );
    btn.addEventListener("mouseleave", () =>
      updateActive(btn.dataset.area, false),
    );
  });
});
