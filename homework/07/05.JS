function fetchData(id, callback) {
  const dataObject = { id: id, status: "success" };
  // 遵循 Node.js 錯誤優先原則：第一個參數傳入 null（代表無錯誤），第二個參數傳入資料
  callback(null, dataObject);
}

// 測試呼叫
fetchData(101, (err, data) => {
  if (err) {
    console.error("發生錯誤:", err);
    return;
  }
  console.log("成功獲取資料:", data); // 輸出：成功獲取資料: { id: 101, status: 'success' }
});