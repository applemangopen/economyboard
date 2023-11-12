document.addEventListener("DOMContentLoaded", () => {
    // URL에서 토큰 추출
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    let userInfo = null;

    if (token) {
        // 쿠키에 토큰 저장
        document.cookie = `token=${token};path=/;max-age=3600`;
        // 쿼리 파라미터 제거 후 리디렉션
        window.location.href = "http://localhost:3000";
    } else {
        // 쿠키에서 토큰 추출
        const cookieToken = getCookie("token");
        if (cookieToken) {
            // 토큰 디코드하여 사용자 정보 추출
            const base64Url = cookieToken.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            userInfo = JSON.parse(window.atob(base64));

            // 닉네임 디코드
            userInfo.nickname = decodeURIComponent(userInfo.nickname);

            // 사용자 정보를 HTML에 렌더링
            const userInfoDiv = document.getElementById("user-info");
            userInfoDiv.innerHTML = `
            <p>안녕하세요, ${userInfo.nickname || "사용자"}님!</p>
            <p>사용자 ID: ${userInfo.id}</p>
            ${
                userInfo.image
                    ? `<img src="${userInfo.image}" alt="프로필 사진" style="width:100px; height:100px;"/>`
                    : ""
            }
            `;
        }
    }

    // 로그아웃 버튼 클릭 이벤트 리스너 추가
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            // 쿠키에서 토큰 제거
            document.cookie = "token=;path=/;max-age=0";
            // 로그인 페이지 또는 홈페이지로 리디렉션
            window.location.href = "/";
        });
    }
    // 유저 정보 수정 링크 업데이트
    const userModifyLink = document.getElementById("user-modify-link");
    if (userModifyLink && userInfo) {
        userModifyLink.href = `/user/${userInfo.id}`;
    }
});

// 쿠키에서 값 추출 함수
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}
