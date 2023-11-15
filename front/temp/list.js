// ----- 페이지 내 JS 요소 -----
document.addEventListener("DOMContentLoaded", function () {
  // 현재 URL 경로 가져오기
  const currentPath = window.location.pathname;

  // Nav 토글버튼 클릭
  const navToggle = document.getElementById("navToggle");
  const nav = document.querySelector(".nav");
  const navImg = document.querySelector(".nav__logo__img");
  const header = document.querySelector(".header");
  const contentWrapper = document.querySelector(".content-wrapper");
  let navVisible = true;

  navToggle.addEventListener("click", function () {
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
    navVisible = !navVisible;
  });

  // ----- Header 주가 슬라이더 -----
  const slider = document.getElementById("stock-slider");
  const items = slider.getElementsByClassName("stock-item");
  const itemHeight = slider.offsetHeight;

  // 첫 번째 아이템이 화면에 나타나도록 설정
  items[items.length - 1].style.bottom = "0%";

  let activeIndex = items.length - 1;

  function moveItemsUp() {
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
  }
  setInterval(moveItemsUp, 3000);

  // ===== Board List Menu Text 설정 =====
  const menuTextElement = document.querySelector(".board__list__menu__text");
  switch (currentPath) {
    case "/boards/announcement":
      menuTextElement.textContent = "공지사항 게시판";
      highlightCategory('a[href="/boards/announcement"]');
      break;
    case "/boards/domestic":
      menuTextElement.textContent = "국내주식 게시판";
      highlightCategory('a[href="/boards/domestic"]');
      break;
    case "/boards/foreign":
      menuTextElement.textContent = "해외주식 게시판";
      highlightCategory('a[href="/boards/foreign"]');
      break;
    case "/boards/bitcoin":
      menuTextElement.textContent = "비트코인 게시판";
      highlightCategory('a[href="/boards/bitcoin"]');
      break;
    default:
      menuTextElement.textContent = "게시판";
      break;
  }

  // ===== Board Category 하이라이트 함수 =====
  function highlightCategory(selector) {
    const categoryButton = document.querySelector(selector);
    if (categoryButton) {
      categoryButton.parentNode.classList.add("active-category");
    }
  }

  // ===== Pagination =====
  const numberOfPages = 10; // 총 페이지 수
  const paginationUl = document.querySelector(".pagination");

  function createPageButton(pageNumber) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = pageNumber;
    button.addEventListener("click", function () {
      // 페이지 버튼 클릭 시의 동작
      console.log("Page " + pageNumber);
    });
    li.appendChild(button);
    return li;
  }

  for (let i = 1; i <= numberOfPages; i++) {
    paginationUl.insertBefore(
      createPageButton(i),
      paginationUl.querySelector(".next").parentNode
    );
  }

  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  // '이전' 버튼의 초기 상태 설정
  prevButton.classList.add("disabled");

  let currentPage = 1;

  prevButton.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      console.log("Current Page:", currentPage);
      // 추가 기능 구현
    }
    if (currentPage === 1) {
      prevButton.classList.add("disabled");
    }
    if (currentPage < numberOfPages) {
      nextButton.classList.remove("disabled");
    }
  });

  nextButton.addEventListener("click", function () {
    if (currentPage < numberOfPages) {
      currentPage++;
      console.log("Current Page:", currentPage);
      // 추가 기능 구현
    }
    if (currentPage === numberOfPages) {
      nextButton.classList.add("disabled");
    }
    if (currentPage > 1) {
      prevButton.classList.remove("disabled");
    }
  });
});
