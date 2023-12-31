const loginWithCredentials = async (credentials) => {
    try {
        const { data } = await axios.post("http://localhost:4000/auth/login", credentials);
        console.log(data.message);

        if (data.success) {
            document.cookie = `token=${data.token}; path=/; max-age=3600;`;
            // 1시간 동안 유효한 쿠키

            alert(data.message);
            window.location.href = "/";
        }
    } catch (e) {
        alert(e.response.data.message);
        console.error(e);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#loginForm");
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;

        loginWithCredentials({ username, password });
    });
});
