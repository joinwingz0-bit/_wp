// 註：依題意要求對陣列中的字串內容進行前 10 個字元的擷取與切片處理
const contents = ["Very long content here", "Another Very long content here", "3rd Very long content here"];

const processedContents = contents.map(str => {
  // 使用 substring 取出前 10 個字元 (索引 0 到 10)，並拼接 "..."
  return str.substring(0, 10) + "...";
});

console.log(processedContents); 
// 輸出：[ 'Very long ...', 'Another Ve...', '3rd Very l...' ]