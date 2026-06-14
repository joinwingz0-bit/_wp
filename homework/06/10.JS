function calculateTotal(cart, discountFunc) {
  // 先將 cart 內所有商品價格相加
  const sum = cart.reduce((total, price) => total + price, 0);
  // 再將總和傳入 discountFunc 處理後回傳
  return discountFunc(sum);
}

// 測試：傳入商品價格陣列，並透過匿名函數扣除 50 元
const myCart = [100, 200, 300]; // 總和 600
const finalPrice = calculateTotal(myCart, function(total) {
  return total - 50;
});

console.log(finalPrice); // 輸出：550 (600 - 50)