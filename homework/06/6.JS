function myFilter(arr, callback) {
  const result = []; // 建立新陣列
  for (let i = 0; i < arr.length; i++) {
    // 若 callback 回傳 true，則放入新陣列
    if (callback(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
}

// 測試：篩選出大於 7 的數字
const numbers = [1, 5, 8, 12];
const filteredNumbers = myFilter(numbers, item => item > 7);

console.log(filteredNumbers); // 輸出：[8, 12]