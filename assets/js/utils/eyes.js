// eyes.js
document.querySelectorAll(".eyes").forEach(eyeIcon => {
    const passwordInput = document.querySelector(`#${eyeIcon.dataset.passwordid}`);
    eyeIcon.addEventListener("click", () => {
        const isPasswordType = passwordInput.type === "password";
        passwordInput.type = isPasswordType ? "text" : "password";
        eyeIcon.innerHTML = `<i class="fa-solid fa-eye${isPasswordType ? '-slash' : ''}"></i>`;
    });
});