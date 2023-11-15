document.addEventListener("DOMContentLoaded", async function () {
  // Nav 토글버튼 클릭 이벤트 처리
  const navToggle = document.getElementById("navToggle");
  navToggle.addEventListener("click", function () {
    toggleNavigation();
  });

  // 주가 슬라이더 기능
  const slider = document.getElementById("stock-slider");
  startStockSlider(slider);

  // Like 버튼 클릭 이벤트
  const likeButton = document.querySelector(".view__buttons_button__like");
  if (likeButton) {
    likeButton.addEventListener("click", async function (event) {
      event.preventDefault();
      await sendLikeRequest();
    });
  }

  async function toggleNavigation() {
    const nav = document.querySelector(".nav");
    const navImg = document.querySelector(".nav__logo__img");
    const header = document.querySelector(".header");
    const contentWrapper = document.querySelector(".content-wrapper");
    const navVisible = nav.classList.contains("nav-expanded");

    if (navVisible) {
      nav.classList.add("nav-collapsed");
      nav.classList.remove("nav-expanded");
      navImg.style.display = "none";
      header.classList.add("header-expanded");
      navToggle.querySelector(".fa-angles-left").style.display = "none";
      navToggle.querySelector(".fa-angles-right").style.display = "inline";
      contentWrapper.classList.add("content-wrapper--collapsed");
      contentWrapper.classList.remove("content-wrapper--expanded");
    } else {
      nav.classList.remove("nav-collapsed");
      nav.classList.add("nav-expanded");
      navImg.style.display = "block";
      header.classList.remove("header-expanded");
      navToggle.querySelector(".fa-angles-left").style.display = "inline";
      navToggle.querySelector(".fa-angles-right").style.display = "none";
      contentWrapper.classList.remove("content-wrapper--collapsed");
      contentWrapper.classList.add("content-wrapper--expanded");
    }
  }
  function startStockSlider(slider) {
    const items = slider.getElementsByClassName("stock-item");
    const itemHeight = slider.offsetHeight;
    items[items.length - 1].style.bottom = "0%";
    let activeIndex = items.length - 1;

    setInterval(() => {
      for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let itemBottom = parseInt(window.getComputedStyle(item).bottom, 10);
        item.style.bottom = itemBottom + itemHeight + "px";
      }

      let activeItem = items[activeIndex];
      activeItem.addEventListener(
        "transitionend",
        function () {
          activeItem.style.transition = "none";
          activeItem.style.bottom = "-100%";
          setTimeout(() => {
            activeItem.style.transition = "bottom 0.5s ease-in-out";
          }, 50);
        },
        { once: true }
      );

      activeIndex = (activeIndex - 1 + items.length) % items.length;
    }, 3000);
  }
  async function sendLikeRequest() {
    try {
      const pathArray = window.location.pathname.split("/");
      const boardId = pathArray[pathArray.indexOf("board_id") + 1];
      const userIdElement = document.querySelector("header .header__user p");
      const userId = userIdElement ? userIdElement.textContent : null;

      if (boardId && userId) {
        const response = await axios.post(
          `/boards/board_id/${boardId}/user_id/${userId}`,
          {},
          {
            headers: {}, // 추가적인 헤더는 {}로 설정
          }
        );
        console.log("POST 요청 성공:", response);
      } else {
        console.error("Board ID 또는 User ID를 찾을 수 없음");
      }
    } catch (error) {
      console.error("POST 요청 실패:", error);
    }
  }
});

// // ----- 페이지 내 JS 요소 -----
// document.addEventListener("DOMContentLoaded", async function () {
//   // 현재 URL 경로 가져오기
//   const currentPath = window.location.pathname;
//   // Nav 토글버튼 클릭
//   const navToggle = document.getElementById("navToggle");
//   const nav = document.querySelector(".nav");
//   const navImg = document.querySelector(".nav__logo__img");
//   const header = document.querySelector(".header");
//   const contentWrapper = document.querySelector(".content-wrapper");
//   // dotenv 정보 받아오기
//   const clientConfig = await axios.get("/config");
//   const apiUrl = clientConfig.data.apiUrl;
//   let navVisible = true;

//   navToggle.addEventListener("click", function () {
//     if (navVisible) {
//       nav.classList.add("nav-collapsed");
//       nav.classList.remove("nav-expanded");
//       navImg.style.display = "none";
//       header.classList.add("header-expanded");
//       navToggle.querySelector(".fa-angles-left").style.display = "none";
//       navToggle.querySelector(".fa-angles-right").style.display = "inline";
//       contentWrapper.classList.add("content-wrapper--collapsed");
//       contentWrapper.classList.remove("content-wrapper--expanded");
//     } else {
//       nav.classList.remove("nav-collapsed");
//       nav.classList.add("nav-expanded");
//       navImg.style.display = "block";
//       header.classList.remove("header-expanded");
//       navToggle.querySelector(".fa-angles-left").style.display = "inline";
//       navToggle.querySelector(".fa-angles-right").style.display = "none";
//       contentWrapper.classList.remove("content-wrapper--collapsed");
//       contentWrapper.classList.add("content-wrapper--expanded");
//     }
//     navVisible = !navVisible;
//   });

//   // ----- Header 주가 슬라이더 -----
//   const slider = document.getElementById("stock-slider");
//   const items = slider.getElementsByClassName("stock-item");
//   const itemHeight = slider.offsetHeight;

//   // 첫 번째 아이템이 화면에 나타나도록 설정
//   items[items.length - 1].style.bottom = "0%";

//   let activeIndex = items.length - 1;

//   function moveItemsUp() {
//     for (let i = 0; i < items.length; i++) {
//       let item = items[i];
//       let itemBottom = parseInt(window.getComputedStyle(item).bottom, 10);
//       item.style.bottom = itemBottom + itemHeight + "px";
//     }

//     let activeItem = items[activeIndex];
//     activeItem.addEventListener(
//       "transitionend",
//       function () {
//         activeItem.style.transition = "none";
//         activeItem.style.bottom = "-100%";
//         setTimeout(() => {
//           activeItem.style.transition = "bottom 0.5s ease-in-out";
//         }, 50);
//       },
//       { once: true }
//     );

//     activeIndex = (activeIndex - 1 + items.length) % items.length;
//   }
//   setInterval(moveItemsUp, 3000);
// });
