// fogotPassword.js
import toasts from "../utils/toasts.js";

window.forgotPassword = function () {
    const emailField = document.querySelector(".email");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (!emailField.value.trim()) {
        emailField.classList.remove("is-valid", "is-invalid");
        emailField.classList.add("is-invalid");
        return toasts("error", "Please enter an email address");
    }

    const user = users.find(user => user.email === emailField.value);

    if (user) {
        window.location.href = `/createPassword.html?email=${user.email}`;
    } else {
        emailField.classList.remove("is-valid", "is-invalid");
        emailField.classList.add("is-invalid");
        toasts("error", "No such user exists");
    }
};