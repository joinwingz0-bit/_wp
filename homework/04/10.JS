/**
 * 練習 10：學生學期成績評等
 * 核心技術：綜合大魔王 (JSON, array, object, for, if-else)
 */
const rawData = '[{"name":"Alex","scores":[85,90,92]},{"name":"Bella","scores":[70,68,75]},{"name":"Charlie","scores":[95,98,100]}]';

const students = JSON.parse(rawData);

function getAverage(scores) {
    let sum = 0;
    for (let i = 0; i < scores.length; i++) {
        sum += scores[i];
    }
    return sum / scores.length;
}

for (let i = 0; i < students.length; i++) {
    const avg = getAverage(students[i].scores);
    
    let grade = "";
    if (avg >= 90) {
        grade = "A";
    } else if (avg >= 80) {
        grade = "B";
    } else if (avg >= 70) {
        grade = "C";
    } else {
        grade = "D";
    }
    
    students[i].average = Math.round(avg); 
    students[i].grade = grade;
}

const resultJSON = JSON.stringify(students, null, 2); 
console.log(resultJSON);