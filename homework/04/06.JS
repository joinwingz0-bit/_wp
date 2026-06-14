/**
 * 練習 6：過濾質數
 * 核心技術：迴圈巢狀、if
 */
function isPrime(num) {
    if (num <= 1) return false; 
    
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false; 
        }
    }
    return true;
}

function getPrimesUpTo(max) {
    const primeArray = [];
    
    for (let i = 2; i <= max; i++) {
        if (isPrime(i)) {
            primeArray.push(i); 
        }
    }
    return primeArray;
}

// 測試
console.log(getPrimesUpTo(20)); // 輸出: [2, 3, 5, 7, 11, 13, 17, 19]