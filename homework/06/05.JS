function multiplier(factor) {
  // 回傳一個箭頭函數
  return n => n * factor;
}

const double = multiplier(2);
console.log(double(10)); // 輸出：20

const triple = multiplier(3);
console.log(triple(10)); // 輸出：30