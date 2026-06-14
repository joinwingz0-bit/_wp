/**
 * 練習 2：陣列數字總和與平均
 * 核心技術：array、for、function
 */
function analyzeScores(scores) {
    let sum = 0;
    
    for (let i = 0; i < scores.length; i++) {
        sum += scores[i];
    }
    
    const average = sum / scores.length;
    
    return {
        sum: sum,
        average: average
    };
}

// 測試
const scoreList = [80, 90, 60, 100, 75];
console.log(analyzeScores(scoreList)); // 輸出: { sum: 405, average: 81 }