const user = "Guest";

// 使用反引號建立 HTML 字串，並在 ${} 內使用三元運算子判斷
const htmlHeader = `<h1>Welcome, ${user ? user : "Stranger"}</h1>`;

console.log(htmlHeader); // 輸出："<h1>Welcome, Guest</h1>"

// 驗證當 user 為空值 (例如 null 或空字串) 時：
const emptyUser = "";
const htmlStranger = `<h1>Welcome, ${emptyUser ? emptyUser : "Stranger"}</h1>`;
console.log(htmlStranger); // 輸出："<h1>Welcome, Stranger</h1>"