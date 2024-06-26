// analytics.js
function getLastMonthData(data) {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    return data.filter(item => {
        const createdAt = new Date(item.createdAt);
        return createdAt >= lastMonth && createdAt <= now;
    });
}

export default function analytics() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const totalUser = document.querySelector("#totalUser");
    const isActive = document.querySelector("#isActive");
    const isInActive = document.querySelector("#isInActive");
    const lastMonthCreated = document.querySelector("#lastMonthCreated");

    if (users.length > 0) {
        const activeCount = users.filter(user => user.isVerified).length;
        const inActiveCount = users.length - activeCount;

        totalUser.innerText = users.length;
        isActive.innerText = activeCount;
        isInActive.innerText = inActiveCount;
        lastMonthCreated.innerText = getLastMonthData(users).length;
    }
}
