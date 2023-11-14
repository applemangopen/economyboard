// ----- 페이지 내 JS 요소 -----
document.addEventListener("DOMContentLoaded", function () {
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

  // Announcement-slide
  const slides = document.querySelectorAll(".slide-item");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide) => {
      slide.style.top = "100%";
      slide.style.transition = "none";
    });
    slides[index].style.top = "0";
    slides[index].style.transition = "top 0.5s ease-in-out";
  }

  function nextSlide() {
    slides[currentSlide].style.top = "-100%";
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.top = "100%";
    setTimeout(() => {
      showSlide(currentSlide);
    }, 200); // Delay before showing the next slide
  }
  setInterval(nextSlide, 3000);
  showSlide(currentSlide);

  // =====  =====
});
