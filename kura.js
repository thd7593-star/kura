// 1 slide
const sliderRoot = document.querySelector(".slider");

if (sliderRoot) {
  const track = sliderRoot.querySelector(".slider-track");
  const dotsContainer = sliderRoot.querySelector(".slider-dots");
  const prevBtn = sliderRoot.querySelector(".prev");
  const nextBtn = sliderRoot.querySelector(".next");

  if (track && dotsContainer) {
    const originalSlides = Array.from(track.querySelectorAll(".slide"));

    if (originalSlides.length > 0) {
      const AUTO_INTERVAL_MS = 3500;
      const SWIPE_THRESHOLD_PX = 50;
      const TRANSITION_VALUE = "transform 0.5s ease-in-out";

      // clone for visual infinite loop: [lastClone, ...original, firstClone]
      const firstClone = originalSlides[0].cloneNode(true);
      const lastClone =
        originalSlides[originalSlides.length - 1].cloneNode(true);
      track.insertBefore(lastClone, originalSlides[0]);
      track.appendChild(firstClone);

      const renderedSlides = Array.from(track.querySelectorAll(".slide"));
      let visualIndex = 1;
      let autoTimer = null;
      let isDragging = false;
      let dragStartX = 0;
      let dragDeltaX = 0;
      let suppressClick = false;

      dotsContainer.innerHTML = "";
      originalSlides.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
          goToVisual(i + 1, true);
          startAutoSlide();
        });
        dotsContainer.appendChild(dot);
      });
      const dots = dotsContainer.querySelectorAll(".dot");

      sliderRoot.querySelectorAll("img").forEach((img) => {
        img.draggable = false;
      });

      function logicalIndexFromVisual(index) {
        return (index - 1 + originalSlides.length) % originalSlides.length;
      }

      function getBaseOffset(visualIdx) {
        const slideStyle = window.getComputedStyle(renderedSlides[0]);
        const marginLeft = parseFloat(slideStyle.marginLeft) || 0;
        const marginRight = parseFloat(slideStyle.marginRight) || 0;
        const slideStep =
          renderedSlides[0].offsetWidth + marginLeft + marginRight;
        return (
          -(visualIdx * slideStep) +
          track.offsetWidth / 2 -
          renderedSlides[0].offsetWidth / 2
        );
      }

      function updateActiveStates() {
        const logicalIndex = logicalIndexFromVisual(visualIndex);
        renderedSlides.forEach((slide) => slide.classList.remove("active"));
        if (renderedSlides[visualIndex])
          renderedSlides[visualIndex].classList.add("active");
        dots.forEach((dot, i) =>
          dot.classList.toggle("active", i === logicalIndex),
        );
      }

      function renderAt(offset, useTransition) {
        track.style.transition = useTransition ? TRANSITION_VALUE : "none";
        track.style.transform = `translateX(${offset}px)`;
      }

      function goToVisual(index, useTransition) {
        visualIndex = index;
        renderAt(getBaseOffset(visualIndex), useTransition);
        updateActiveStates();
      }

      function normalizeLoopIfNeeded() {
        if (visualIndex === 0) {
          goToVisual(originalSlides.length, false);
        } else if (visualIndex === originalSlides.length + 1) {
          goToVisual(1, false);
        }
      }

      function nextSlide() {
        goToVisual(visualIndex + 1, true);
      }

      function prevSlide() {
        goToVisual(visualIndex - 1, true);
      }

      function stopAutoSlide() {
        if (autoTimer) {
          clearInterval(autoTimer);
          autoTimer = null;
        }
      }

      function startAutoSlide() {
        stopAutoSlide();
        autoTimer = setInterval(nextSlide, AUTO_INTERVAL_MS);
      }

      function getClientX(event) {
        if (event.touches && event.touches.length > 0)
          return event.touches[0].clientX;
        if (event.changedTouches && event.changedTouches.length > 0)
          return event.changedTouches[0].clientX;
        return event.clientX;
      }

      function startDrag(event) {
        isDragging = true;
        suppressClick = false;
        dragStartX = getClientX(event);
        dragDeltaX = 0;
        stopAutoSlide();
      }

      function moveDrag(event) {
        if (!isDragging) return;
        dragDeltaX = getClientX(event) - dragStartX;
        if (Math.abs(dragDeltaX) > 5) suppressClick = true;
        renderAt(getBaseOffset(visualIndex) + dragDeltaX, false);
      }

      function endDrag() {
        if (!isDragging) return;
        isDragging = false;

        if (Math.abs(dragDeltaX) >= SWIPE_THRESHOLD_PX) {
          if (dragDeltaX < 0) nextSlide();
          else prevSlide();
        } else {
          goToVisual(visualIndex, true);
        }

        dragDeltaX = 0;
        startAutoSlide();
      }

      track.addEventListener("transitionend", (event) => {
        if (event.propertyName !== "transform") return;
        normalizeLoopIfNeeded();
      });

      sliderRoot.addEventListener(
        "click",
        (event) => {
          if (!suppressClick) return;
          event.preventDefault();
          event.stopPropagation();
          suppressClick = false;
        },
        true,
      );

      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          nextSlide();
          startAutoSlide();
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          prevSlide();
          startAutoSlide();
        });
      }

      sliderRoot.addEventListener("mouseenter", stopAutoSlide);
      sliderRoot.addEventListener("mouseleave", startAutoSlide);
      sliderRoot.addEventListener("mousedown", startDrag);
      window.addEventListener("mousemove", moveDrag);
      window.addEventListener("mouseup", endDrag);
      sliderRoot.addEventListener("touchstart", startDrag, { passive: true });
      sliderRoot.addEventListener("touchmove", moveDrag, { passive: true });
      sliderRoot.addEventListener("touchend", endDrag, { passive: true });
      sliderRoot.addEventListener("touchcancel", endDrag, { passive: true });
      window.addEventListener("resize", () => goToVisual(visualIndex, false));

      goToVisual(1, false);
      startAutoSlide();
    }
  }
}

$(window).on("scroll", function () {
  if ($(window).scrollTop() > 50) {
    $(".header").addClass("shrink");
  } else {
    $(".header").removeClass("shrink");
  }
});

// 2 slide
$(function () {
  if ($(".bxslider-topic").length) {
    $(".bxslider-topic").bxSlider({
      mode: "horizontal",
      captions: false,
      auto: true,
      controls: false,
      touchEnabled: false,
    });
  }
});
// 뉴스
const newsData = [
  {
    date: "2026.2. 5",
    title: "御徒町店が2/5にオープンしました！（東京都台東区）",
    link: "#",
  },
  {
    date: "2026.1.29",
    title:
      "プラス型店舗 京都寺町通店が1/29にオープンしました！（京都市中京区）",
    link: "./newsBottom.html",
  },
  {
    date: "2026.1.28",
    title: "第30期定時株主総会でのご質問における対応について",
    link: "#",
  },
  { date: "2025.12.26", title: "年末年始のお持ち帰りについて", link: "#" },
  { date: "2025.12.12", title: "年末年始 営業時間のご案内", link: "#" },
];

// 3 slide
$(function () {
  if ($(".bxslider-cards").length) {
    $(".bxslider-cards").bxSlider({
      mode: "horizontal",
      captions: false,
      slideWidth: 300,
      minSlides: 3,
      maxSlides: 3,
      moveSlides: 1,
      slideMargin: 30,
      pager: true,
      controls: true,
      auto: true,
      pause: 3000,
      speed: 600,
      infiniteLoop: true,
      touchEnabled: false,
    });
  }
});

const newsList = document.getElementById("newsList");
const loadMoreBtn = document.getElementById("loadMoreBtn");
let itemsToShow = 5;

function renderNews() {
  if (!newsList || !loadMoreBtn) return;
  newsList.innerHTML = "";

  newsData.slice(0, itemsToShow).forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("news-item");
    li.innerHTML = `
      <span class="news-date">${item.date}</span>
      <a href="${item.link}" class="news-link">${item.title}</a>
    `;
    newsList.appendChild(li);
  });
}

if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // TODO: connect to your own news page when ready.
  });
}

renderNews();

document.querySelectorAll(".sns-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    console.log(`${e.currentTarget.getAttribute("href")} -> open`);
  });
});

const btnTop = document.querySelector(".btn-top");
if (btnTop) {
  btnTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
// 헤더 언어 js
const languageSelector = document.querySelector(".language-selector");
const languageBtn = document.querySelector(".language-btn");

if (languageSelector && languageBtn) {
  languageBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const willOpen = !languageSelector.classList.contains("open");
    languageSelector.classList.toggle("open");
    languageBtn.setAttribute("aria-expanded", String(willOpen));
  });

  document.addEventListener("click", (e) => {
    if (!languageSelector.contains(e.target)) {
      languageSelector.classList.remove("open");
      languageBtn.setAttribute("aria-expanded", "false");
    }
  });
}

$(document).ready(function () {
  $(".sns-icons a").on("click", function () {
    const snsName = $(this).find("img").attr("alt");
    console.log(`${snsName} -> open`);
  });

  $(".sns-policy").hover(
    function () {
      $(this).css("color", "#b31217");
    },
    function () {
      $(this).css("color", "#666");
    },
  );
});

document.getElementById("loadMoreBtn").addEventListener("click", function () {
  window.location.href = "https://www.kurasushi.co.jp/news/index.html";
});
