// verify.js
import generateCode from "../utils/generateCode.js";
import toasts from "../utils/toasts.js";

const getUrl = new URLSearchParams(window.location.search);
const email = getUrl.get("email");

const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
if (email && emailRegex.test(email)) {
    const putEmail = document.querySelector(".putEmail");
    putEmail.innerHTML = `Code has been sent to <b>${maskEmail(email)}</b>`;
    sendCode(email);
} else {
    window.location.href = "./register.html";
}

function maskEmail(email) {
    const [localPart, domain] = email.split("@");
    return `${localPart.slice(0, 3)}*******@${domain}`;
}

function sendCode(email) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email);

    if (!user) {
        toasts("error", "No such user exists");
        setTimeout(() => window.location.href = "./register.html", 2000);
        return;
    }
    if (user.isVerified) {
        window.location.href = "./login.html";
        return;
    }

    toasts("success", `Send new verification code ${user.verificationCode}`);
}

window.confirmCode = function () {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email);

    const getCode = Array.from(document.querySelectorAll(".vCode")).map(input => input.value).join("");

    if (new Date() > new Date(user.verificationExpiresAt)) {
        return toasts("error", "Verification code has expired");
    }
    if (!getCode) {
        return toasts("error", "Submit the code");
    }
    if (getCode !== user.verificationCode) {
        return toasts("error", "The verification code did not match");
    }

    user.isVerified = true;
    localStorage.setItem("users", JSON.stringify(users));
    toasts("success", "You have successfully verified");
    setTimeout(() => {
        window.location.href = "./login.html";
    }, 2000);
};

window.resetCode = function () {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email);

    if (!user) {
        toasts("error", "No such user exists");
        return;
    }

    const currentDate = new Date();
    const verificationExpiresAt = new Date(currentDate.getTime() + 3 * 60000);

    user.verificationCode = generateCode(6, true);
    user.verificationExpiresAt = verificationExpiresAt;

    toasts("success", `Send new verification code ${user.verificationCode}`);

    localStorage.setItem("users", JSON.stringify(users));
};