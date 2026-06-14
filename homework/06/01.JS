// 定義 mathTool 函數
function mathTool(num1, num2, action) {
  return action(num1, num2);
}

// 測試：傳入匿名函數進行相加
const addResult = mathTool(10, 5, function(a, b) {
  return a + b;
});

// 測試：傳入匿名函數進行相減
const subResult = mathTool(10, 5, function(a, b) {
  return a - b;
});

console.log(addResult); // 輸出：15
console.log(subResult); // 輸出：5