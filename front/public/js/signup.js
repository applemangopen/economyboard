const signupWithFormData = async (formData) => {
    try {
        const { data } = await axios.post("http://localhost:4000/auth/signup", formData);
        console.log(data.message);
        if (data.success) {
            alert(data.message);
            window.location.href = "/";
        }
    } catch (e) {
        alert(e.message);
        console.log(e);
        console.log(e.message);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const frm = document.querySelector("#frm");
    frm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        signupWithFormData(formData);
    });
});
