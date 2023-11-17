function formatDateTime(dateTimeStr) {
    const date = new Date(dateTimeStr);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${year}.${month}.${day} ${hours}:${minutes}`;
}

document.addEventListener("DOMContentLoaded", async function () {
  // Nav 토글버튼 클릭 이벤트 처리
  const navToggle = document.getElementById("navToggle");
  navToggle.addEventListener("click", function () {
    toggleNavigation();
  });

  // 주가 슬라이더 기능
  const slider = document.getElementById("stock-slider");
  startStockSlider(slider);

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

    // 날짜, 시간 형식 변환

    const textarea = document.querySelector("textarea");
    textarea.style.height = textarea.scrollHeight + "px";

    const createdAtElement = document.getElementById("createdAt");
    if (createdAtElement) {
        const formattedDate = formatDateTime(createdAtElement.textContent);
        createdAtElement.textContent = formattedDate;
    }

    const deleteButton = document.querySelector(".view__buttons__delete");
    if (deleteButton) {
        deleteButton.addEventListener("click", function (event) {
            event.preventDefault();
            deletePost();
        });
    }

    async function deletePost() {
        // 현재 페이지의 URL에서 게시물 ID 추출
        const pathArray = window.location.pathname.split("/");
        const postId = pathArray[pathArray.indexOf("board_id") + 1];

        // 게시물 ID가 존재하는 경우에만 삭제 요청을 수행
        if (postId) {
            try {
                const response = await axios.delete(`/boards/board_id/${postId}`);
                console.log(response.data);

                // isDeleted 키를 확인하여 처리
                if (response.data.isDeleted) {
                    alert("글이 성공적으로 삭제됐습니다.");
                    window.location.href = "/";
                } else {
                    alert("글 삭제를 하는 중, 오류가 발생했습니다");
                }
            } catch (error) {
                console.error("Delete request error:", error);
                alert("글 삭제를 하는 중, 오류가 발생했습니다");
            }
        } else {
            console.error("Post ID not found in URL");
        }
    }

  }


  // ===== Like(좋아요) 처리 로직 =====
  const likeButton = document.querySelector(".view__buttons_button__like");

  if (likeButton) {
    likeButton.addEventListener("click", async function (event) {
      event.preventDefault();
      try {
        // 현재 페이지의 URL에서 게시물 ID와 사용자 ID 추출
        const pathArray = window.location.pathname.split("/");
        const boardId = pathArray[pathArray.indexOf("board_id") + 1];
        const userIdElement = document.getElementById("userId");
        const userId = userIdElement.textContent;

        // POST 요청을 보내는 부분
        const response = await axios.post(
          `/boards/board_id/${boardId}/user_id/${userId}`
        );
        // console.log(response);
        // console.log("1111111111111111111111111111");

        if (response.status === 201) {
          // 요청이 성공적이라면 페이지를 새로고침
          window.location.reload();
        } else {
          // 실패 메시지를 보여줌
          alert(
            "이미 좋아요를 하였거나, 오류가 발생하였습니다. 다음에 다시 시도하여 주십시오."
          );
        }
      } catch (error) {
        console.error("Like request error : ", error);
        alert(
          "이미 좋아요를 하였거나, 오류가 발생하였습니다. 다음에 다시 시도하여 주십시오."
        );
      }
    });
  }

  // ===== Dislike(좋아요 취소) 로직
  const dislikeButton = document.querySelector(
    ".view__buttons_button__dislike"
  );

  if (dislikeButton) {
    dislikeButton.addEventListener("click", async function (event) {
      event.preventDefault();
      try {
        // 현재 페이지의 URL에서 게시물 ID와 사용자 ID 추출
        const pathArray = window.location.pathname.split("/");
        const boardId = pathArray[pathArray.indexOf("board_id") + 1];
        const userIdElement = document.getElementById("userId");
        const userId = userIdElement.textContent;

        // POST 요청을 보내는 부분
        const response = await axios.delete(
          `/boards/board_id/${boardId}/user_id/${userId}`
        );
        // console.log(response);
        // console.log("1111111111111111111111111111");

        if (response.status === 201) {
          // 요청이 성공적이라면 페이지를 새로고침
          window.location.reload();
        } else {
          // 실패 메시지를 보여줌
          alert(
            "이미 좋아요 취소를 하였거나, 오류가 발생하였습니다. 다음에 다시 시도하여 주십시오."
          );
        }
      } catch (error) {
        console.error("Dislike request error : ", error);
        alert(
          "이미 좋아요 취소를 하였거나, 오류가 발생하였습니다. 다음에 다시 시도하여 주십시오."
        );
      }
    });
  }
});
