// ===== Login =====
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

  // ===== Login =====

  // 로그인 이벤트 핸들러
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", handleLoginSubmit);
});

async function handleLoginSubmit(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await login(email, password);
    onLoginSuccess(response.data);
  } catch (error) {
    onLoginError(error);
  }
}

async function login(email, password) {
  return await axios.post("/auth/login", {
    username: email,
    password: password,
  });
}

function onLoginSuccess(data) {
  if (data.success) {
    const successMessage = document.getElementById("login-success-message");
    successMessage.style.display = "block";
    setTimeout(() => {
      window.location.href = data.redirectUrl;
    }, 3000);
  }
}

function onLoginError(error) {
  console.error("로그인 실패:", error);
  // 사용자에게 실패 메시지 표시
  const errorMessage = document.getElementById("login-error-message");
  errorMessage.style.display = "block";
}
