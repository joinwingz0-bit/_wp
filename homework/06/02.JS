(function() {
  const count = 100; // 區域變數
  console.log("Count is: " + count);
})(); // 立即執行

// 驗證外部是否能存取
try {
  console.log(count);
} catch (error) {
  console.log("外部無法存取 count，驗證成功。"); // 觸發錯誤：count is not defined
}