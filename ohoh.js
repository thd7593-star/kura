// 모달 : 페이지가 로드된 후 실행
document.addEventListener("DOMContentLoaded", () => {
  const dialog = document.getElementById("postImagePreview");
  const openBtn = document.querySelector(".post__image"); // 이미지 버튼 클래스 확인

  if (openBtn && dialog) {
    openBtn.addEventListener("click", () => {
      // .show()가 아니라 .showModal()을 써야 배경이 어두워집니다.
      dialog.showModal();
    });
  } else {
    console.error("버튼이나 모달을 찾을 수 없습니다. 클래스명을 확인하세요.");
  }
});
