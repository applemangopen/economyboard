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

  // // Announcement-slide
  // const slides = document.querySelectorAll(".slide-item");
  // let currentSlide = 0;

  // function showSlide(index) {
  //   slides.forEach((slide) => {
  //     slide.style.top = "100%";
  //     slide.style.transition = "none";
  //   });
  //   slides[index].style.top = "0";
  //   slides[index].style.transition = "top 0.5s ease-in-out";
  // }

  // function nextSlide() {
  //   slides[currentSlide].style.top = "-100%";
  //   currentSlide = (currentSlide + 1) % slides.length;
  //   slides[currentSlide].style.top = "100%";
  //   setTimeout(() => {
  //     showSlide(currentSlide);
  //   }, 200); // Delay before showing the next slide
  // }
  // setInterval(nextSlide, 3000);
  // showSlide(currentSlide);

  // ----- Lower Categories 카테고리별 좋아요 순으로 5개씩 글 출력 -----
  // const posts = {
  //   "domestic-stocks": [
  //     {
  //       title: "삼성전자 주가 전망: 실적 기대감 상승",
  //       likes: 15,
  //       url: "#link1",
  //     },
  //     {
  //       title: "현대자동차: 전기차 시장에서의 성장 가능성",
  //       likes: 25,
  //       url: "#link2",
  //     },
  //     { title: "네이버 vs 카카오: 어디에 투자할까?", likes: 5, url: "#link3" },
  //     {
  //       title: "바이오주 투자 전략: 주목해야 할 종목은?",
  //       likes: 10,
  //       url: "#link4",
  //     },
  //     { title: "코스피, 코스닥 시장 동향 분석", likes: 20, url: "#link5" },
  //   ],
  //   "international-stocks": [
  //     {
  //       title: "애플 주식 분석: 아이폰 판매 호조로 상승세",
  //       likes: 30,
  //       url: "#link6",
  //     },
  //     {
  //       title: "테슬라 주가 전망: 신차 출시와 재고 문제",
  //       likes: 28,
  //       url: "#link7",
  //     },
  //     { title: "아마존의 클라우드 사업 성장세 지속", likes: 12, url: "#link8" },
  //     { title: "구글 vs 메타: 투자자들의 선택은?", likes: 7, url: "#link9" },
  //     {
  //       title: "미국 주식 시장의 인플레이션 영향 분석",
  //       likes: 19,
  //       url: "#link10",
  //     },
  //   ],
  //   bitcoin: [
  //     {
  //       title: "비트코인의 최근 변동성: 투자 전략은?",
  //       likes: 45,
  //       url: "#link11",
  //     },
  //     {
  //       title: "암호화폐 시장의 신규 프로젝트 동향",
  //       likes: 35,
  //       url: "#link12",
  //     },
  //     {
  //       title: "이더리움 2.0 업그레이드와 투자자들의 반응",
  //       likes: 25,
  //       url: "#link13",
  //     },
  //     {
  //       title: "암호화폐 세금 정책 변화와 투자 영향",
  //       likes: 40,
  //       url: "#link14",
  //     },
  //     {
  //       title: "비트코인 대 이더리움: 장기 투자 가치 비교",
  //       likes: 20,
  //       url: "#link15",
  //     },
  //   ],
  // };

  // function populatePosts(categoryId, postsData) {
  //   const categoryElement = document.getElementById(categoryId);
  //   const postList = categoryElement.querySelector(".post-list");

  //   postsData.forEach((post, index) => {
  //     const postElement = document.createElement("li");
  //     const numberSpan = document.createElement("span");
  //     numberSpan.textContent = `${index + 1}. `;
  //     numberSpan.style.color = index === 0 ? "red" : "black";
  //     const link = document.createElement("a");
  //     link.href = post.url;
  //     // 게시글 제목 옆에 likes 수를 추가
  //     link.textContent = `${post.title} (${post.likes})`;
  //     postElement.appendChild(numberSpan);
  //     postElement.appendChild(link);
  //     postList.appendChild(postElement);
  //   });
  // }

  // // 각 카테고리에 게시글 채우기
  // for (const categoryId in posts) {
  //   populatePosts(categoryId, posts[categoryId]);
  // }

  // // 카테고리 제목 스타일 지정
  // const categoryTitles = document.querySelectorAll(".category h2");
  // categoryTitles.forEach((title) => {
  //   title.style.fontSize = "1.4rem";
  //   title.style.color = "rgb(18, 18, 18)";
  // });

  // ----- Lower-Ranks 좋아요순 10개, 댓글순 10개씩 게시글 출력 -----
  // const rankedPosts = {
  //   lower__ranks__likes: [
  //     {
  //       title: "삼성전자 주가 전망: 2023년 기대감 상승",
  //       likes: 220,
  //       comments: 45,
  //       url: "#link1",
  //     },
  //     {
  //       title: "비트코인 투자, 지금이 적기인가?",
  //       likes: 185,
  //       comments: 50,
  //       url: "#link2",
  //     },
  //     {
  //       title: "미국 증시 동향 분석: 기술주 중심으로 회복세",
  //       likes: 160,
  //       comments: 30,
  //       url: "#link3",
  //     },
  //     {
  //       title: "유럽 중앙은행의 금리 결정과 투자 전략",
  //       likes: 145,
  //       comments: 25,
  //       url: "#link4",
  //     },
  //     {
  //       title: "ESG 투자 전망: 지속 가능한 투자의 미래",
  //       likes: 130,
  //       comments: 40,
  //       url: "#link5",
  //     },
  //     {
  //       title: "중국 부동산 시장 분석: 투자 기회와 위험",
  //       likes: 125,
  //       comments: 35,
  //       url: "#link6",
  //     },
  //     {
  //       title: "기술주 투자 전략: 어떤 종목이 유망한가?",
  //       likes: 120,
  //       comments: 20,
  //       url: "#link7",
  //     },
  //     {
  //       title: "환율 변동성과 헤지 전략",
  //       likes: 110,
  //       comments: 15,
  //       url: "#link8",
  //     },
  //     {
  //       title: "주식시장 초보자를 위한 투자 가이드",
  //       likes: 100,
  //       comments: 50,
  //       url: "#link9",
  //     },
  //     {
  //       title: "연금 투자, 어떻게 시작해야 할까?",
  //       likes: 95,
  //       comments: 10,
  //       url: "#link10",
  //     },
  //   ],
  //   lower__ranks__comments: [
  //     {
  //       title: "최근 주식시장의 변동성: 전문가 의견은?",
  //       likes: 90,
  //       comments: 120,
  //       url: "#link11",
  //     },
  //     {
  //       title: "이번 주 주목할 주식: 투자자들의 선택은?",
  //       likes: 85,
  //       comments: 110,
  //       url: "#link12",
  //     },
  //     {
  //       title: "테슬라 주가 전망: 성장의 한계는 어디인가?",
  //       likes: 80,
  //       comments: 100,
  //       url: "#link13",
  //     },
  //     {
  //       title: "금융 위기 이후의 시장 동향",
  //       likes: 75,
  //       comments: 95,
  //       url: "#link14",
  //     },
  //     {
  //       title: "ETF 투자 전략: 다양성이 핵심",
  //       likes: 70,
  //       comments: 90,
  //       url: "#link15",
  //     },
  //     {
  //       title: "주식 시장에서 분산 투자의 중요성",
  //       likes: 65,
  //       comments: 85,
  //       url: "#link16",
  //     },
  //     {
  //       title: "경제 불확실성 시대의 안전 자산은?",
  //       likes: 60,
  //       comments: 80,
  //       url: "#link17",
  //     },
  //     {
  //       title: "인플레이션 대비 투자 전략",
  //       likes: 55,
  //       comments: 75,
  //       url: "#link18",
  //     },
  //     {
  //       title: "주식시장의 심리학: 투자 결정의 영향",
  //       likes: 50,
  //       comments: 70,
  //       url: "#link19",
  //     },
  //     {
  //       title: "부동산 시장의 최근 동향과 전망",
  //       likes: 45,
  //       comments: 65,
  //       url: "#link20",
  //     },
  //   ],
  // };

  // // '좋아요'와 '댓글' 순으로 정렬된 게시글을 각 섹션에 추가하는 함수
  // function populateRankedPosts(categoryId, postsData) {
  //   const categoryElement = document.querySelector(`.${categoryId}`);
  //   const sortedPosts = postsData.sort(
  //     (a, b) => b[categoryId.split("__")[2]] - a[categoryId.split("__")[2]]
  //   );

  //   sortedPosts.slice(0, 10).forEach((post, index) => {
  //     const postElement = document.createElement("div");
  //     postElement.className = "ranked-post";
  //     postElement.innerHTML = `<span>${index + 1}. </span><a href="${
  //       post.url
  //     }">${post.title} (${post.comments})</a>`;
  //     categoryElement.appendChild(postElement);
  //   });
  // }

  // populateRankedPosts(
  //   "lower__ranks__likes",
  //   rankedPosts["lower__ranks__likes"]
  // );
  // populateRankedPosts(
  //   "lower__ranks__comments",
  //   rankedPosts["lower__ranks__comments"]
  // );
});
