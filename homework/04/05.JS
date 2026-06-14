/**
 * 練習 5：尋找陣列中的最大值
 * 核心技術：array、for、if
 */
function findMax(numbers) {
    if (numbers.length === 0) return null; 
    
    let max = numbers[0]; 
    
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
    
    return max;
}

// 測試
console.log(findMax([12, 45, 7, 89, 23])); // 輸出: 89