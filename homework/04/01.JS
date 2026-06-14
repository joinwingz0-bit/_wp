function calculateBMI(weight, height) {
    // BMI 公式：體重 / (身高^2)
    const bmi = weight / (height * height);
    
    if (bmi < 18.5) {
        return "過輕";
    } else if (bmi >= 18.5 && bmi < 24) {
        return "正常";
    } else {
        return "過重";
    }
}

// 測試
console.log(calculateBMI(65, 1.75));