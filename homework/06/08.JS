// 8. 參數傳址陷阱：重新賦值 vs 修改
// 解釋：listA 被修改因為push改變了原陣列；listB 不變因為b = [100] 是重新賦值，不影響原陣列
let listA = [1, 2];
let listB = [3, 4];

function process(a, b) {
  a.push(99);
  b = [100];
}
process(listA, listB);
console.log("listA:", listA); // [1, 2, 99]
console.log("listB:", listB); // [3, 4]