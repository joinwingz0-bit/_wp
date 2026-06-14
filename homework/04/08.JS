/**
 * 練習 8：終極密碼
 * 核心技術：while 隨機猜數字
 */
function guessNumberGame(target) {
    let min = 1;
    let max = 100;
    
    while (true) {
        let guess = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log(`電腦在 ${min} ~ ${max} 之間猜了：${guess}`);
        
        if (guess === target) {
            console.log("恭喜猜中！");
            break; 
        } else if (guess > target) {
            console.log("太高了");
            max = guess - 1; 
        } else {
            console.log("太低了");
            min = guess + 1; 
        }
    }
}

// 測試
guessNumberGame(42);