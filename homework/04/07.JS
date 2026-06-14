/**
 * 練習 7：JSON 資料解析與過濾
 * 核心技術：JSON、array、for
 */
const jsonString = "[{\"name\": \"Apple\", \"price\": 25, \"instock\": true}, {\"name\": \"Banana\", \"price\": 10, \"instock\": false}, {\"name\": \"Cherry\", \"price\": 50, \"instock\": true}]";

const products = JSON.parse(jsonString);
const instockProducts = [];

for (let i = 0; i < products.length; i++) {
    if (products[i].instock === true) {
        instockProducts.push(products[i].name);
    }
}

// 測試
console.log(instockProducts); // 輸出: ["Apple", "Cherry"]