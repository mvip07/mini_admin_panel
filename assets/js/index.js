// index.js
import createUser from "./createUser.js";
import pagination from "./utils/pagination.js";
import analytics from "./utils/analytics.js";
import getUsers from "./getUsers.js";
import toasts from "./utils/toasts.js";

const user = JSON.parse(localStorage.getItem("user"));

if (user) {
    const tokenExpired = new Date() > new Date(user.tokenExpiresAt);
    if (tokenExpired) {
        toasts("error", "Verification code has expired");
        setTimeout(() => {
            window.location.href = "/login.html";
        }, 2000);
    }

    const userName = document.querySelector(".user-name");
    userName.firstElementChild.textContent = `${user.lastname} ${user.firstname}`;
    userName.lastElementChild.textContent = `${user.email.slice(0, 3)}*******${user.email.slice(user.email.indexOf("@"))}`;

    window.modalCreate = () => createUser("admin")

    const paginationStorage = JSON.parse(localStorage.getItem("pagination"));
    if (!paginationStorage) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const page = {
            page_size: 10,
            page_number: 1,
            userlist: users
        };
        localStorage.setItem("pagination", JSON.stringify(page));
    }

    pagination();
    analytics();
} else {
    window.location.href = "./login.html"
}

const sunOrMoonJson = localStorage.getItem("sunOrMoon") || "sun"

if (sunOrMoonJson) {
    const sunOrMoon = document.querySelector(".sunOrMoon")

    sunOrMoon.addEventListener(("click"), () => {
        sunOrMoon.classList.toggle("sunMoon")

        if (sunOrMoon.classList.contains("sunMoon")) {
            sunOrMoon.innerHTML = `<i class="fa-regular fa-moon fs-5"></i>`
            document.querySelector("body").classList.toggle("moon")
        } else {
            sunOrMoon.innerHTML = `<i class="fa-regular fa-sun fs-5"></i>`
        }
    })
}
