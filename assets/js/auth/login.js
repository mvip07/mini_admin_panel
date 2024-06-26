// login.js
import toasts from "../utils/toasts.js";

window.login = function () {
    const users = JSON.parse(localStorage.getItem("users"));

    if (!users || users.length === 0) {
        return toasts("error", "Don't Find Data. Server Interval Error");
    }

    const emailField = document.querySelector(".email");
    const passwordField = document.querySelector(".password");

    if (!validateInput(emailField) || !validateInput(passwordField)) {
        return toasts("error", "Enter your information correctly");
    }

    const user = users.find(user => user.email === emailField.value && user.password === passwordField.value);

    if (user) {
        if (!user.isVerified) {
            return setTimeout(() => {
                window.location.href = `./verify.html?email=${user.email}`;
            }, 2000);
        }

        validateField(emailField, true);
        validateField(passwordField, true);

        if (document.querySelectorAll(".is-valid").length === 2) {
            storeUserSession(user);

            setTimeout(() => {
                window.location.href = "/";
            }, 2000);
        } else {
            toasts("error", "Enter your information correctly");
        }
    } else {
        validateField(emailField, false);
        validateField(passwordField, false);
        toasts("error", "Invalid email or password");
    }
};

function validateInput(field) {
    const isValid = field.value.trim() !== "";
    validateField(field, isValid);
    return isValid;
}

function validateField(field, condition) {
    field.classList.remove("is-valid", "is-invalid");
    field.classList.add(condition ? "is-valid" : "is-invalid");
}

function storeUserSession(user) {
    const currentDate = new Date();
    const verificationExpiresAt = new Date(currentDate);
    verificationExpiresAt.setMinutes(verificationExpiresAt.getMinutes() + 60);

    localStorage.setItem("user", JSON.stringify({
        id: user.id,
        email: user.email,
        lastname: user.lastname,
        firstname: user.firstname,
        isVerified: user.isVerified,
        tokenExpiresAt: verificationExpiresAt,
    }));
}