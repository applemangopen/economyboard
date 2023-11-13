document.addEventListener("DOMContentLoaded", () => {
    const modifyForm = document.getElementById("modifyForm");
    const nicknameInput = document.getElementById("nickname");
    const imageInput = document.getElementById("image");
    const imagePreview = document.getElementById("imagePreview");

    // 쿠키에서 토큰 추출 및 사용자 정보 디코드
    const token = getCookie("token");
    let userInfo = null;

    if (token) {
        userInfo = decodeToken(token);
        if (userInfo) {
            nicknameInput.value = userInfo.nickname || "";
            imageInput.value = userInfo.image || "";

            if (userInfo.image) {
                imagePreview.src = userInfo.image;
            }
        }
    }

    modifyForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nickname = nicknameInput.value;
        const image = imageInput.value;
        const userId = userInfo ? userInfo.id : null;

        if (!userId) {
            alert("사용자 정보를 찾을 수 없습니다.");
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:4000/auth/user/${userId}`,
                {
                    nickname,
                    image,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // 쿠키에서 추출한 JWT 토큰
                    },
                }
            );

            if (response.status === 200) {
                document.cookie = `token=${response.data.token};path=/;max-age=3600`;
                alert("사용자 정보가 업데이트되었습니다.");
                window.location.href = "http://localhost:3000"; // 메인 페이지로 리디렉션
            } else {
                alert("몬가 문제가 있당");
            }
        } catch (error) {
            console.error("업데이트 실패:", error);
            alert("업데이트 중 오류가 발생했습니다.");
        }
    });
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

function decodeToken(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );

    let payload = JSON.parse(jsonPayload);
    payload.nickname = decodeURIComponent(payload.nickname);
    return payload;
}

document.getElementById("deleteUserButton").addEventListener("click", async () => {
    const token = getCookie("token");
    let userInfo = null;
    if (token) {
        userInfo = decodeToken(token);
    }
    if (!confirm("정말로 회원 탈퇴를 하시겠습니까?")) return;

    try {
        const userId = userInfo ? userInfo.id : null;
        if (!userId) {
            alert("사용자 정보를 찾을 수 없습니다.");
            return;
        }

        const response = await axios.delete(`http://localhost:4000/auth/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            alert("회원 탈퇴가 완료되었습니다.");
            document.cookie = "token=;path=/;max-age=0";
            window.location.href = "/";
        } else {
            alert("오류가 발생했습니다.");
        }
    } catch (error) {
        console.error("회원 탈퇴 실패:", error);
        alert("오류가 발생했습니다.");
    }
});
