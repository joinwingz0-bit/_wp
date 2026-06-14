/**
 * 練習 4：通訊錄物件操作
 * 核心技術：object、function、if
 */
const person = {
    name: "Alex",
    age: 20,
    isPremium: true
};

function checkAccess(user) {
    if (user.isPremium && user.age >= 18) {
        return "允許進入 VIP 廳";
    } else {
        return "權限不足";
    }
}

// 測試
console.log(checkAccess(person)); // 輸出: 允許進入 VIP 廳