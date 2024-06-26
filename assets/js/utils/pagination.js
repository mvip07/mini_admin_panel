// pagination.js
import getUsers from "../getUsers.js";

function sortUsers(users, criterion) {
    switch (criterion) {
        case "A-Z (First Name)":
            return users.sort((a, b) => a.firstname.localeCompare(b.firstname));
        case "Z-A (First Name)":
            return users.sort((a, b) => b.firstname.localeCompare(a.firstname));
        case "A-Z (Last Name)":
            return users.sort((a, b) => a.lastname.localeCompare(b.lastname));
        case "Z-A (Last Name)":
            return users.sort((a, b) => b.lastname.localeCompare(a.lastname));
        case "firstCreated":
            return users.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        case "lastCreated":
            return users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        default:
            return users;
    }
}

function filterUsers(users, search, searchField, activeStatus) {
    return users.filter(user => {
        const matchesSearch =  user[searchField || "firstname"]?.toUpperCase().search(search.toUpperCase()) >= 0;
        const matchesStatus = activeStatus === "" || (activeStatus === "active" ? user.isVerified : !user.isVerified);
        return matchesSearch && matchesStatus;
    });
}

function getPaginatedUsers(page) {
    const { page_number, page_size, userlist } = page;
    const start = (page_number - 1) * page_size;
    const end = start + page_size;
    const userSlice = userlist.slice(start, end);
    getUsers(userSlice, page_number, page_size, userlist.length);
}

function setLocal(page) {
    localStorage.setItem("pagination", JSON.stringify(page));
    getPaginatedUsers(page);
}

export default function pagination() {
    const users = JSON.parse(localStorage.getItem("users"));

    if (users) {
        const filterUserList = {
            sorted: "",
            searching: "",
            searchField: "",
            active_or_inactive: ""
        };

        const page = JSON.parse(localStorage.getItem("pagination")) || {
            page_number: 1,
            page_size: 10,
            userlist: users
        };

        const limit = document.querySelector("#rowPerPage");
        const nextPage = document.querySelector("#nextPage");
        const previousPage = document.querySelector("#previousPage");

        const sorted = document.querySelector("#sorted");
        const searching = document.querySelector("#searching");
        const searchField = document.querySelector("#searchField");
        const activeOrInActive = document.querySelector("#activeOrInActive");

        limit.value = page.page_size;
        sorted.value = filterUserList.sorted;
        searching.value = filterUserList.searching;
        searchField.value = filterUserList.searchField;
        activeOrInActive.value = filterUserList.active_or_inactive;

        limit.addEventListener("change", ({ target }) => {
            page.page_size = Number(target.value) || page.page_size;
            setLocal(page);
        });

        nextPage.addEventListener("click", () => {
            if (page.page_number * page.page_size < page.userlist.length) page.page_number += 1;
            setLocal(page);
        });

        previousPage.addEventListener("click", () => {
            if (page.page_number > 1) page.page_number -= 1;
            setLocal(page);
        });

        function updatePage() {
            let filteredUsers = filterUsers(users, filterUserList.searching, filterUserList.searchField, filterUserList.active_or_inactive);
            filteredUsers = sortUsers(filteredUsers, filterUserList.sorted);
            page.userlist = filteredUsers;
            page.page_number = 1;
            setLocal(page);
        }

        sorted.addEventListener("change", ({ target }) => {
            filterUserList.sorted = target.value;
            updatePage();
        });

        activeOrInActive.addEventListener("change", ({ target }) => {
            filterUserList.active_or_inactive = target.value;
            updatePage();
        });

        searchField.addEventListener("change", ({ target }) => {
            filterUserList.searchField = target.value;
            updatePage();
        });

        searching.addEventListener("input", ({ target }) => {
            filterUserList.searching = target.value;
            updatePage();
        });

        updatePage();
    }
}