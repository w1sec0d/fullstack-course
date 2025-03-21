const calculateBMI = (height: number, mass: number): string => {
  if (height <= 0) {
    throw new Error('Heigth must be greater than 0');
  }
  if (mass <= 0) {
    throw new Error('Mass must be greater than 0');
  }

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

try {
  console.log(calculateBMI(180, 74));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error('Error:', error);
  }
}
