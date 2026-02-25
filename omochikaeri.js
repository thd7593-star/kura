// 클릭 이동*************************************************
document.addEventListener("DOMContentLoaded", () => {
  const buttonGroup = document.querySelector(".button-group");

  if (buttonGroup) {
    buttonGroup.addEventListener("click", (e) => {
      const btn = e.target.closest(".price-btn");
      if (!btn) return;

      const targetId = btn.getAttribute("data-target");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  } else {
    console.error(".button-group을 찾을 수 없습니다.");
  }
});
