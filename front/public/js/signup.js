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

  // ===== Signup =====

  // 쿠키에 값을 저장하는 함수
  function setCookie(name, value, hours) {
    const date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }
  const signupForm = document.getElementById("signup-form");

  signupForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(signupForm);
    console.log("formData : ", formData);
    const signupData = {
      username: formData.get("email"),
      password: formData.get("password"),
      nickname: formData.get("nickname"),
      image: "",
    };

    // 이미지 파일이 존재하는 경우, 서버에 업로드합니다.
    const imageFile = formData.get("file");
    if (imageFile && imageFile instanceof File) {
      try {
        const response = await axios.post(
          "http://15.164.233.146:4000/image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("responsoe : ", response);
        // 서버로부터 반환된 파일명을 signupData 객체에 할당합니다.
        signupData.image = response.data.filename;
      } catch (error) {
        console.error("이미지 업로드 중 오류가 발생했습니다:", error);
        return;
      }
    }

    // 이미지 업로드 완료 후, 최종 signupData 객체를 출력합니다.
    const tokenResponse = await axios.post(
      "http://15.164.233.146:4000/auth/signup",
      signupData
    );
    console.log("tokenResponse : ", tokenResponse);
    if (tokenResponse) {
      // 성공 메시지 표시
      const successMessage = document.getElementById("signup-success-message");
      successMessage.style.display = "block";

      // 3초 후 로그인 페이지로 리다이렉트
      setTimeout(function () {
        window.location.href = "/auth/login";
      }, 3000);
    }

    // const jwtToken = tokenResponse.data.token;
    // console.log(jwtToken);
    // // 쿠키에 JWT 토큰 저장, 유효기간 1시간
    // setCookie("token", jwtToken, 1);
  });
});
