function fakeGet(sql, params, callback) {
  // 模擬資料庫非同步行為，不管 SQL 是什麼，直接回傳結果物件
  callback(null, { title: "Fake Title" });
}

// 測試呼叫 fakeGet
fakeGet("SELECT * FROM posts WHERE id = ?", [1], (err, row) => {
  if (err) {
    console.error(err);
    return;
  }
  // 在回呼函數中印出標題
  console.log("查詢到的標題為:", row.title); // 輸出：查詢到的標題為: Fake Title
});