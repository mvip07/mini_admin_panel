// getUsers.js
export default function getUsers(users, pageNumber, pageSize, len) {
    const getUserListNum = document.querySelector("#getUserListNum");
    const tbody = document.querySelector(".tbody");
    getUserListNum.innerText = `${Math.min(pageNumber * pageSize, len)} / ${len}`;
    tbody.innerHTML = "";
    const rowsHTML = users.map((user, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${user?.firstname}</td>
            <td>${user.lastname}</td>
            <td>${user.email}</td>
            <td>${user.isVerified ? `<span class="badge bg-success py-2 px-3">Active</span>` : `<span class="badge bg-danger py-2 px-3">Inactive</span>`}</td>
            <td class="text-end">
                <div class="btn-group">
                    <button type="button" class="btn btn-dark rounded-circle px-3" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li class="dropdown-item">
                            <a href="./view.html?userId=${user.id}" class="btn btn-primary shadow-none w-100 text-start text-white">
                                <i class="fa-solid fa-eye me-2"></i>View
                            </a>
                        </li>
                        <li class="dropdown-item">
                            <button onclick="updateUser('${user.id}')" data-bs-target="#userUpdateToggle" data-bs-toggle="modal" class="btn btn-warning shadow-none w-100 text-start text-white">
                                <i class="fa-solid fa-trash-can me-2"></i>Update
                            </button>
                        </li>
                        <li class="dropdown-item">
                            <button onclick="deleteUser('${user.id}')" class="deleteUserBtn btn btn-danger shadow-none w-100 text-start text-white">
                                <i class="fa-solid fa-pen-to-square me-2"></i>Delete
                            </button>
                        </li>
                    </ul>
                </div>
            </td>
        </tr>
    `).join('');

    tbody.innerHTML = rowsHTML;
}