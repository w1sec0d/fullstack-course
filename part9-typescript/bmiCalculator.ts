interface bmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<number | string>): bmiValues => {
  if (args.length < 4) throw new Error('Not Enough Arguments, expected 4');
  if (args.length > 4) throw new Error('Too many Arguments, expected 4');
  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error('Arguments must be numbers');
  }
  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  };
};

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
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBMI(height, weight));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error('Error:', error);
  }
}
