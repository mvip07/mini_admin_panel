// generateCode.js
export default function generateCode(num, onlyNumber) {
    const chars = onlyNumber ? "1234567890" : "qwertyuiopasdfghjklzxcvbnm1234567890MNBVCXZLKJHGFDSAPOIUYTREWQ";
    let code = Array.from({ length: num }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    return code;
}