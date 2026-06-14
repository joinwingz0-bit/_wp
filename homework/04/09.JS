/**
 * 練習 9：購物車總金額計算
 * 核心技術：array、object、for、if-else
 */
const myCart = [
    { name: "手錶", price: 3000, quantity: 1 },
    { name: "耳機", price: 1500, quantity: 2 },
    { name: "保護貼", price: 200, quantity: 3 }
];

function calculateTotal(cart) {
    let total = 0;
    
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
    }
    
    if (total > 5000) {
        total = total * 0.8; 
    } else if (total > 2000) {
        total = total * 0.9; 
    }
    
    return total;
}

// 測試
console.log(calculateTotal(myCart)); // 輸出: 5280