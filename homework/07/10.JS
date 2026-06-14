function checkAdmin(role, callback) {
  if (role !== "admin") {
    // 發生錯誤，第一個參數傳入錯誤訊息
    callback("Access Denied", null);
  } else {
    // 成功，第一個參數傳入 null
    callback(null, "Welcome");
  }
}

// === 測試狀況一：有錯誤（非 admin） ===
checkAdmin("guest", (err, result) => {
  if (err) {
    console.log("測試一攔截錯誤:", err); // 輸出：測試一攔截錯誤: Access Denied
    return;
  }
  console.log(result);
});

// === 測試狀況二：沒錯誤（是 admin） ===
checkAdmin("admin", (err, result) => {
  if (err) {
    console.log("發生錯誤:", err);
    return;
  }
  console.log("測試二成功回應:", result); // 輸出：測試二成功回應: Welcome
});