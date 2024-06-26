// createUser.js
import getUsers from "./getUsers.js";
import analytics from "./utils/analytics.js";
import generateCode from "./utils/generateCode.js";
import pagination from "./utils/pagination.js";

function hasUser(userEmail) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return !users.some(user => user.email === userEmail);
}

function validateField(field, condition) {
    field.classList.remove("is-valid", "is-invalid");
    field.classList.add(condition ? "is-valid" : "is-invalid");
}

export default function createUser(role) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const registerInputs = document.querySelectorAll(".rInput");

    if (registerInputs.length > 0) {
        const userObj = {};
        let isValid = true;

        registerInputs.forEach(input => {
            const { name, value } = input;
            let condition = false;

            switch (name) {
                case "firstname":
                case "lastname":
                    condition = /^[a-zA-Z]{3,50}$/.test(value);
                    break;
                case "email":
                    condition = value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && hasUser(value);
                    break;
                case "password":
                    condition = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*\(\)_\+\-=\[\]{};':"\\|,.<>/?]).{8,16}$/.test(value);
                    break;
                case "confirmPassword":
                    condition = value === userObj.password;
                    break;
            }

            validateField(input, condition);
            if (!condition) isValid = false;
            if (condition && name !== "confirmPassword") userObj[name] = value;
        });

        if (isValid) {
            const verificationExpiresAt = new Date(Date.now() + 3 * 60000); // 3 minutes from now

            Object.assign(userObj, {
                isVerified: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                id: generateCode(24, false),
                verificationCode: generateCode(6, true),
                verificationExpiresAt,
            });

            users.push(userObj);
            localStorage.setItem("users", JSON.stringify(users));

            if (role === "admin") {
                const users = JSON.parse(localStorage.getItem("users")) || []
                getUsers(users, 1, 10, users.length)
                analytics()
                pagination()
            } else {
                window.location.href = `./verify.html?email=${userObj.email}`;
            }
        }
    } else {
        localStorage.setItem("users", JSON.stringify([]));
    }
}