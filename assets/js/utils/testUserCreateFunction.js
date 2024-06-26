function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(getRandomInt(0, chars.length - 1));
    }
    return result;
}

function getRandomEmail() {
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'example.com'];
    return `${getRandomString(5)}@${domains[getRandomInt(0, domains.length - 1)]}`;
}

function getRandomDate(pastYears) {
    const date = new Date();
    date.setFullYear(date.getFullYear() - getRandomInt(0, pastYears));
    date.setMonth(getRandomInt(0, 11));
    date.setDate(getRandomInt(1, 28));
    date.setHours(getRandomInt(0, 23));
    date.setMinutes(getRandomInt(0, 59));
    date.setSeconds(getRandomInt(0, 59));
    date.setMilliseconds(getRandomInt(0, 999));
    return date.toISOString();
}

function generateRandomUsers(count) {
    const users = [];

    for (let i = 0; i < count; i++) {
        const createdAt = getRandomDate(5); // Random date within the past 5 years
        const updatedAt = createdAt;
        const verificationExpiresAt = new Date(new Date(createdAt).getTime() + 3 * 60 * 1000).toISOString(); // 3 minutes after createdAt

        const user = {
            firstname: getRandomString(7),
            lastname: getRandomString(7),
            email: getRandomEmail(),
            password: getRandomString(10) + '@#$', // Ensuring the password has some special characters
            isVerified: Math.random() < 0.5,
            createdAt: createdAt,
            updatedAt: updatedAt,
            id: getRandomString(20),
            verificationCode: getRandomInt(100000, 999999).toString(),
            verificationExpiresAt: verificationExpiresAt
        };

        users.push(user);
    }

    return users;
}



// const randomUsers = generateRandomUsers(1000);

// let u = JSON.parse(localStorage.getItem("users"))

// u.push(...randomUsers)

// console.log(u);

// localStorage.setItem("users", JSON.stringify(u))

function chunkArray(array, chunkSize) {
    let result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        let chunk = array.slice(i, i + chunkSize);
        result.push(chunk);
    }
    return result;
}

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let chunkSize = 3;
let chunks = chunkArray(array, chunkSize);

console.log(chunks);