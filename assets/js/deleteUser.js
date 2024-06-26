// deleteUser.js
import pagination from "./utils/pagination.js";
import analytics from "./utils/analytics.js";

window.deleteUser = function (id) {
    const body = document.body;
    const myModal = document.querySelector("#userDeleteToggle");
    const deleteUserButton = document.querySelector("#deleteUser");
    const doNotDeleteUserButton = document.querySelector("#doNotDeleteUser");

    const showModal = () => {
        body.style.overflow = "hidden";
        myModal.classList.add("show", "d-block");
    };

    const hideModal = () => {
        body.style.overflow = "auto";
        myModal.classList.remove("show", "d-block");
    };

    const deleteUser = () => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.filter(user => user.id !== id);

        localStorage.setItem("users", JSON.stringify(updatedUsers));

        pagination();
        analytics();
        hideModal();
    };

    showModal();

    deleteUserButton.addEventListener("click", deleteUser);
    doNotDeleteUserButton.addEventListener("click", hideModal);
};