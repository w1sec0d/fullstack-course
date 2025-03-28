interface exerciseInfo {
  // the number of days
  periodLength: number;
  // the number of training days
  trainingDays: number;
  // boolean value describing if the target was reached
  success: boolean;
  // a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
  rating: number;
  // a text value explaining the rating, you can come up with the explanations
  ratingDescription: string;
  // the original target value
  target: number;
  // the calculated average time
  average: number;
}

const rateExerciseHours = (target: number, current: number): number => {
  let difference = Math.abs(target - current);
  if (difference === 0) {
    return 3;
  } else if (difference > 4) {
    return 1;
  } else {
    return 2 - Math.round((difference / 2) * 100) / 100 + 1;
  }
};

const getRatingDescription = (rating: number): string => {
  if (rating === 1) {
    return 'You have a long way ahead, push yourself!';
  } else if (rating === 3) {
    return 'Excellent! You achieved your goal';
  } else {
    return 'You are close! Try harder!';
  }
};

const calculateExercise = (
  exerciseHours: Array<number>,
  targetHours: number
): exerciseInfo => {
  if (exerciseHours.length === 0) {
    throw new Error('Invalid or empty array');
  }
  let averageHours =
    exerciseHours.reduce((sum, value) => sum + value, 0) / exerciseHours.length;
  return {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.reduce(
      (accumulator, days) => (days > 0 ? accumulator + 1 : accumulator),
      0
    ),
    target: targetHours,
    average: averageHours,
    success: targetHours <= averageHours,
    rating: rateExerciseHours(targetHours, averageHours),
    ratingDescription: getRatingDescription(
      rateExerciseHours(targetHours, averageHours)
    ),
  };
};

try {
  console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error('Error:', error);
  }
}
