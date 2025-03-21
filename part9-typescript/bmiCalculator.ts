const calculateBMI = (height: number, mass: number): string => {
  // Calculates bmi with mass in kg and height in cm
  const bmi = mass / (height / 100) ** 2;
  let resultString = '';
  console.log('bmi', bmi);
  if (bmi < 18.5) {
    resultString = 'Underweight range';
  } else if (bmi >= 18.5 && bmi < 25) {
    resultString = 'Normal range';
  } else if (bmi >= 25 && bmi < 30) {
    resultString = 'Overweight range';
  } else if (bmi >= 30 && bmi < 35) {
    resultString = 'Obese range';
  } else if (bmi >= 35) {
    resultString = 'Extremely Obese range';
  }
  return resultString;
};

console.log(calculateBMI(180, 74));
