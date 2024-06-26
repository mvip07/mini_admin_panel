// newPassword.js 
import toasts from "../utils/toasts.js";

window.createPassword = function () {
    const getUrl = new URLSearchParams(window.location.search);
    const email = getUrl.get("email");

    if (!email) {
        return window.location.href = "/forgotPassword.html";
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(i => i.email === email);

    if (!user) {
        toasts("error", "No such user exists");
        return setTimeout(() => window.location.href = "/forgotPassword.html", 3000);
    }

    const passwordField = document.querySelector(".password");
    const confirmPasswordField = document.querySelector(".confirmPassword");

    const isPasswordValid = validatePassword(passwordField);
    const isConfirmPasswordValid = validateConfirmPassword(passwordField, confirmPasswordField);

    if (isPasswordValid && isConfirmPasswordValid) {
        user.password = passwordField.value;
        localStorage.setItem("users", JSON.stringify(users));
        setTimeout(() => {
            window.location.href = "/login.html";
        }, 2000);
    } else {
        toasts("error", "Enter your information correctly");
    }
}

function validatePassword(field) {
    const isValid = field.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*\(\)_\+\-=\[\]{};':"\\|,.<>/?])/) && field.value.trim().length >= 8 && field.value.trim().length <= 16;
    field.classList.remove("is-valid", "is-invalid");
    field.classList.add(isValid ? "is-valid" : "is-invalid");
    return isValid;
}

function validateConfirmPassword(passwordField, confirmPasswordField) {
    const isValid = passwordField.value === confirmPasswordField.value;
    confirmPasswordField.classList.remove("is-valid", "is-invalid");
    confirmPasswordField.classList.add(isValid ? "is-valid" : "is-invalid");
    return isValid;
}