const req = { body: { title: "JS教學", content: "內容在此", author: "Gemini" } };

// 用一行程式碼從 req.body 中解構取出 title 和 content
const { title, content } = req.body;

console.log(title);   // 輸出："JS教學"
console.log(content); // 輸出："內容在此"