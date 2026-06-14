const tasks = ["Task", "Completed"];

// 使用 setTimeout 延遲 2000 毫秒（2 秒）
setTimeout(() => {
  // 將陣列物件組合成字串
  console.log(tasks.join(" "));
}, 2000); 

// 預期在 2 秒後控制台輸出："Task Completed"