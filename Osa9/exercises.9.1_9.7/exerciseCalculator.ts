interface Result {
  periodlength: number;
  trainingDays: number;
  success: boolean;
  rating: number | undefined;
  ratingDescription: string | undefined;
  target: number;
  average: number;
}

interface calcExValues {
  goal: number;
  arrayOfDailyHours: Array<number>;
}

const parseArgs = (args: Array<string>): calcExValues => {
  const goal = +process.argv[2];

  const arrayOfDailyHours = args.splice(3).map((val) => +val);

  console.log(goal, arrayOfDailyHours);

  if (isNaN(goal)) throw new Error("Please give your weakly goal as a number");

  if (arrayOfDailyHours.length === 0) {
    throw new Error("Please insert your daily exercise hours");
  }

  arrayOfDailyHours.forEach((item) => {
    if (isNaN(item)) {
      throw new Error("Please insert daily hours as a number");
    }
  });

  return { goal, arrayOfDailyHours };
};

export const calculateExercises = (arr: number[], goal: number): Result => {
  const average = arr.reduce((acc, a) => acc + a, 0) / arr.length;

  let rating;
  let ratingDescription;

  if (average === 0) {
    rating = 1;
    ratingDescription = "Maybe you should do something you piece of sh....t!!!";
  }

  if (average >= goal) {
    rating = 3;
    ratingDescription = "Good work buddy";
  }

  if (average < goal) {
    rating = 2;
    ratingDescription =
      "Not quite what we planned buddy, better luck next week!";
  }

  return {
    periodlength: arr.length,
    trainingDays: arr.filter((num) => num !== 0).length,
    success: average >= goal,
    rating,
    ratingDescription,
    target: goal,
    average,
  };
};

try {
  const { goal, arrayOfDailyHours } = parseArgs(process.argv);
  console.log(calculateExercises(arrayOfDailyHours, goal));
} catch (err) {
  console.log(err.message);
}
