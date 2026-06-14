function cleanData(arr) {
  arr.pop();         // 移除最後一個元素（破壞性）
  arr.unshift("Start"); // 在最前面加上元素（破壞性）
}

let myData = [1, 2, 3];
cleanData(myData);

// 觀察原始陣列
console.log(myData); // 輸出：["Start", 1, 2]
// 原因：JavaScript 陣列在參數傳遞時是「傳址 (Pass by reference)」，函數內的操作會直接影響外部原始陣列。