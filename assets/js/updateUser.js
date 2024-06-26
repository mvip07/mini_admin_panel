// updateUser.js
import analytics from "./utils/analytics.js";
import pagination from "./utils/pagination.js";

window.updateUser = function (id) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.id === id);

    if (!user) {
        console.error(`User with id ${id} not found.`);
        return;
    }

    const updateInputs = document.querySelectorAll(".updateInput");

    updateInputs.forEach(input => {
        if (input.name === "isVerified") {
            input.checked = !!user[input.name];
        } else {
            input.value = user[input.name] || "";
        }
    });

    document.querySelector("#updateUser").addEventListener("click", () => {
        updateInputs.forEach(input => {
            if (input.name === "isVerified") {
                user[input.name] = input.checked;
            } else {
                user[input.name] = input.value.trim();
            }
        });

        user.updatedAt = new Date().toISOString();

        localStorage.setItem("users", JSON.stringify(users));

        pagination();
        analytics();
    });
};