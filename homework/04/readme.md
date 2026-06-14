## 習題4

ai問答 https://gemini.google.com/app/0ffdd270da4a51bb?hl=zh-TW

## 摘要

這裡提供上述 10 個 JavaScript 練習題的參考答案與詳細程式碼解析。你可以用來對照自己寫的程式碼！

---

### 練習 1：BMI 計算機（`function`、`if-else`）

```javascript
function calculateBMI(weight, height) {
    // BMI 公式：體重 / (身高^2)
    const bmi = weight / (height * height);
    
    if (bmi < 18.5) {
        return "過輕";
    } else if (bmi >= 18.5 && bmi < 24) {
        return "正常";
    } else {
        return "過重";
    }
}

// 測試
console.log(calculateBMI(65, 1.75)); // 輸出: 正常
console.log(calculateBMI(50, 1.80)); // 輸出: 過輕

```

---

### 練習 2：陣列數字總和與平均（`array`、`for`、`function`）

```javascript
function analyzeScores(scores) {
    let sum = 0;
    
    // 使用 for 迴圈加總陣列中的每個數字
    for (let i = 0; i < scores.length; i++) {
        sum += scores[i];
    }
    
    // 計算平均值
    const average = sum / scores.length;
    
    // 回傳物件
    return {
        sum: sum,
        average: average
    };
}

// 測試
const scoreList = [80, 90, 60, 100, 75];
console.log(analyzeScores(scoreList)); // 輸出: { sum: 405, average: 81 }

```

---

### 練習 3：倒數計時器（`while`）

```javascript
function countdown(start) {
    let count = start;
    
    // 當 count 大於 0 時持續執行
    while (count > 0) {
        console.log(count);
        count--; // 每次減 1，避免無窮迴圈
    }
    
    console.log("Blast off!");
}

// 測試
countdown(5); 
// 依序輸出: 5, 4, 3, 2, 1, "Blast off!"

```

---

### 練習 4：通訊錄物件操作（`object`、`function`、`if`）

```javascript
const person = {
    name: "Alex",
    age: 20,
    isPremium: true
};

function checkAccess(user) {
    // 條件：必須是 VIP (isPremium 為 true) 且年齡大於等於 18
    if (user.isPremium && user.age >= 18) {
        return "允許進入 VIP 廳";
    } else {
        return "權限不足";
    }
}

// 測試
console.log(checkAccess(person)); // 輸出: 允許進入 VIP 廳

```

---x

### 練習 5：尋找陣列中的最大值（`array`、`for`、`if`）

```javascript
function findMax(numbers) {
    if (numbers.length === 0) return null; // 安全檢查：若陣列為空則回傳 null
    
    let max = numbers[0]; // 先假設第一個數字是最大的
    
    for (let i = 1; i < numbers.length; i++) {
        // 如果發現更大的數字，就更新 max
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
    
    return max;
}

// 測試
console.log(findMax([12, 45, 7, 89, 23])); // 輸出: 89

```

---

### 練習 6：過濾質數（迴圈巢狀、`if`）

```javascript
// 判斷是否為質數的函式
function isPrime(num) {
    if (num <= 1) return false; // 1 和以下的數字不是質數
    
    // 檢查是否有 2 到該數平方根之間的因數
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false; // 能被整除就不是質數
        }
    }
    return true;
}

// 找出 2 到 max 之間所有質數的函式
function getPrimesUpTo(max) {
    const primeArray = [];
    
    for (let i = 2; i <= max; i++) {
        if (isPrime(i)) {
            primeArray.push(i); // 如果是質數就推進陣列
        }
    }
    return primeArray;
}

// 測試
console.log(getPrimesUpTo(20)); // 輸出: [2, 3, 5, 7, 11, 13, 17, 19]

```

---

### 練習 7：JSON 資料解析與過濾（`JSON`、`array`、`for`）

```javascript
const jsonString = "[{\"name\": \"Apple\", \"price\": 25, \"instock\": true}, {\"name\": \"Banana\", \"price\": 10, \"instock\": false}, {\"name\": \"Cherry\", \"price\": 50, \"instock\": true}]";

// 1. 將 JSON 字串解析為 JavaScript 陣列物件
const products = JSON.parse(jsonString);
const instockProducts = [];

// 2. 迴圈過濾出有庫存的商品
for (let i = 0; i < products.length; i++) {
    if (products[i].instock === true) {
        instockProducts.push(products[i].name);
    }
}

// 測試
console.log(instockProducts); // 輸出: ["Apple", "Cherry"]

```

---

### 練習 8：終極密碼（`while` 隨機猜數字）

```javascript
function guessNumberGame(target) {
    let min = 1;
    let max = 100;
    
    while (true) {
        // 隨機在當前 min 到 max 範圍內產生一個猜測值
        let guess = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log(`電腦在 ${min} ~ ${max} 之間猜了：${guess}`);
        
        if (guess === target) {
            console.log("恭喜猜中！");
            break; // 猜中跳出迴圈
        } else if (guess > target) {
            console.log("太高了");
            max = guess - 1; // 答案比猜測值小，將上限調整
        } else {
            console.log("太低了");
            min = guess + 1; // 答案比猜測值大，將下限調整
        }
    }
}

// 測試（假設正確答案是 42）
guessNumberGame(42);

```

---

### 練習 9：購物車總金額計算（`array`、`object`、`for`、`if-else`）

```javascript
const myCart = [
    { name: "手錶", price: 3000, quantity: 1 },
    { name: "耳機", price: 1500, quantity: 2 },
    { name: "保護貼", price: 200, quantity: 3 }
];

function calculateTotal(cart) {
    let total = 0;
    
    // 計算未打折前的總金額
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
    }
    
    // 依據金額判斷折扣
    if (total > 5000) {
        total = total * 0.8; // 打 8 折
    } else if (total > 2000) {
        total = total * 0.9; // 打 9 折
    }
    
    return total;
}

// 測試 (3000*1 + 1500*2 + 200*3 = 6600，超過 5000 打 8 折)
console.log(calculateTotal(myCart)); // 輸出: 5280

```

---

### 練習 10：學生學期成績評等（綜合大魔王）

```javascript
const rawData = '[{"name":"Alex","scores":[85,90,92]},{"name":"Bella","scores":[70,68,75]},{"name":"Charlie","scores":[95,98,100]}]';

// 1. 解析 JSON 資料
const students = JSON.parse(rawData);

// 2. 計算平均分數的函式
function getAverage(scores) {
    let sum = 0;
    for (let i = 0; i < scores.length; i++) {
        sum += scores[i];
    }
    return sum / scores.length;
}

// 3. 遍歷學生陣列，計算平均並加上等第
for (let i = 0; i < students.length; i++) {
    const avg = getAverage(students[i].scores);
    
    // 根據平均決定級別
    let grade = "";
    if (avg >= 90) {
        grade = "A";
    } else if (avg >= 80) {
        grade = "B";
    } else if (avg >= 70) {
        grade = "C";
    } else {
        grade = "D";
    }
    
    // 為物件動態新增屬性
    students[i].average = Math.round(avg); // 四捨五入取整數
    students[i].grade = grade;
}

// 4. 將更新後的資料轉回 JSON 字串
const resultJSON = JSON.stringify(students, null, 2); // 加上參數讓排版更漂亮

console.log(resultJSON);
/* 輸出結果：
[
  { "name": "Alex", "scores": [85, 90, 92], "average": 89, "grade": "B" },
  { "name": "Bella", "scores": [70, 68, 75], "average": 71, "grade": "C" },
  { "name": "Charlie", "scores": [95, 98, 100], "average": 98, "grade": "A" }
]
*/

```
這 10 個練習題在控制台（Console）執行的**最終輸出結果**如下：

---

### 練習 1：BMI 計算機

當輸入體重 65 公斤、身高 1.75 公尺時：

```text
正常

```

### 練習 2：陣列數字總和與平均

輸入分數陣列 `[80, 90, 60, 100, 75]` 後，回傳的物件結構：

```json
{
  "sum": 405,
  "average": 81
}

```

### 練習 3：倒數計時器

呼叫 `countdown(5)` 後，控制台會依序換行印出：

```text
5
4
3
2
1
Blast off!

```

### 練習 4：通訊錄物件操作

判斷符合 `isPremium: true` 且 `age: 20`（大於 18）後的結果：

```text
允許進入 VIP 廳

```

### 練習 5：尋找陣列中的最大值

輸入陣列 `[12, 45, 7, 89, 23]` 後，找出並回傳的值：

```text
89

```

---

### 練習 6：過濾質數

呼叫 `getPrimesUpTo(20)` 找出 2 到 20 之間的所有質數陣列：

```json
[2, 3, 5, 7, 11, 13, 17, 19]

```

### 練習 7：JSON 資料解析與過濾

解析原始商品 JSON 並過濾出 `instock: true` 的商品名稱陣列：

```json
["Apple", "Cherry"]

```

### 練習 8：終極密碼

*（註：因使用隨機數，每次執行過程會不同，以下為其中一次模擬的猜測軌跡，假設答案是 42）*

```text
電腦在 1 ~ 100 之間猜了：57
太高了
電腦在 1 ~ 56 之間猜了：23
太低了
電腦在 24 ~ 56 之間猜了：48
太高了
電腦在 24 ~ 47 之間猜了：35
太低了
電腦在 36 ~ 47 之間猜了：42
恭喜猜中！

```

### 練習 9：購物車總金額計算

原始總價為 $3000 \times 1 + 1500 \times 2 + 200 \times 3 = 6600$ 元。
超過 5000 元打 8 折（$6600 \times 0.8$）後的結果：

```text
5280

```

### 練習 10：學生學期成績評等（綜合大魔王）

將原始 JSON 解析、運算平均值、貼上等第（Grade）標籤後，重新轉回 JSON 字串的最終排版輸出：

```json
[
  {
    "name": "Alex",
    "scores": [85, 90, 92],
    "average": 89,
    "grade": "B"
  },
  {
    "name": "Bella",
    "scores": [70, 68, 75],
    "average": 71,
    "grade": "C"
  },
  {
    "name": "Charlie",
    "scores": [95, 98, 100],
    "average": 98,
    "grade": "A"
  }
]

```