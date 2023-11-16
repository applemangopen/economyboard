document.addEventListener("DOMContentLoaded", async () => {
    const clientConfig = await axios.get("/config");
    const apiUrl = clientConfig.data.apiUrl;

    document.getElementById("image").addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (!file) {
            console.log("No file selected.");
            return;
        }
        console.log(file);
        const formData = new FormData();
        formData.append("file", file); // 'file' 키 사용

        axios
            .post(`${apiUrl}/image`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(function (response) {
                console.log("Image uploaded successfully");
                console.log(response);

                // 업로드된 이미지의 URL 구성
                const uploadedImageUrl = `${apiUrl}/public/temp/${response.data.filename}`;

                // 이미지 미리보기 업데이트
                document.getElementById("imagePreview").src = uploadedImageUrl;

                // 필요하다면 추가적인 처리 (예: 업로드된 이미지 URL 저장)
                const imageInput = document.querySelector(".imageInput");
                imageInput.value = `${response.data.filename}`;
            })
            .catch(function (error) {
                console.error("Error uploading image: ", error);
            });
    });

    document.getElementById("modifyForm").addEventListener("submit", function (e) {
        e.preventDefault(); // 기본 제출 동작 방지

        const userId = window.location.pathname.split("/")[2];
        const nickname = document.getElementById("nickname").value; // 닉네임 값 가져오기
        const image = document.querySelector(".imageInput").value;
        const token = document.querySelector(".token").value; // 토큰 가져오기

        const updateData = {
            nickname: nickname,
            image: image,
        };

        axios
            .put(`${apiUrl}/users/${userId}`, JSON.stringify(updateData), {
                headers: {
                    Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
                    "Content-Type": "application/json", // JSON 타입으로 지정
                },
            })
            .then((response) => {
                console.log("업데이트 성공:", response);
                // 성공 시 처리 로직
            })
            .catch((error) => {
                console.error("업데이트 실패:", error);
                // 실패 시 처리 로직
            });
    });

    const deleteButton = document.getElementById("deleteButton"); // 삭제 버튼의 ID가 "deleteButton"이라고 가정
    if (deleteButton) {
        deleteButton.addEventListener("click", function (e) {
            e.preventDefault(); // 기본 동작 방지

            const userId = window.location.pathname.split("/")[2]; // 사용자 ID 추출
            const token = document.querySelector(".token").value; // 토큰 가져오기

            // Confirm dialog를 사용하여 사용자에게 삭제 확인 요청
            if (confirm("정말로 사용자를 삭제하시겠습니까?")) {
                axios
                    .delete(`${apiUrl}/users/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
                        },
                    })
                    .then((response) => {
                        console.log("삭제 성공:", response);
                        // 성공 시 처리 로직, 예를 들어 홈페이지로 리다이렉트
                        window.location.href = "/";
                    })
                    .catch((error) => {
                        console.error("삭제 실패:", error);
                        // 실패 시 처리 로직, 예를 들어 오류 메시지 표시
                        alert("사용자 삭제에 실패했습니다.");
                    });
            }
        });
    }
});
