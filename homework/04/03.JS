/**
 * 練習 3：倒數計時器
 * 核心技術：while
 */
function countdown(start) {
    let count = start;
    
    while (count > 0) {
        console.log(count);
        count--; 
    }
    
    console.log("Blast off!");
}

// 測試
countdown(5);