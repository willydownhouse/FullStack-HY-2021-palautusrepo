export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const result = weight / (heightInMeters * heightInMeters);

  if (result < 16) {
    return "Underweight (Severe thinness)";
  }
  if (result >= 16 && result <= 16.9) {
    return "Underweight (Moderate thinness)	";
  }
  if (result >= 17 && result <= 18.4) {
    return "Underweight (Mild thinness)	";
  }
  if (result >= 18.5 && result <= 24.9) {
    return "Normal (healthy weight)";
  }
  if (result >= 25 && result <= 29.9) {
    return "Overweight (Pre-obese)";
  }
  if (result >= 30 && result <= 34.9) {
    return "Obese (Class I)";
  }
  if (result >= 35 && result <= 39.9) {
    return "Obese (Class II)";
  }
  if (result >= 40) {
    return "Obese (Class III)";
  }

  return "Could not calculate BMI";
};

interface InputValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): InputValues => {
  const values = args.slice(2).map((val) => +val);
  console.log(values);

  if (values.length === 0) {
    throw new Error("Please enter your height and weight");
  }

  values.forEach((val) => {
    if (isNaN(val)) {
      throw new Error("Please enter your height and weight as a number");
    }
  });

  return {
    value1: values[0],
    value2: values[1],
  };
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (err) {
  console.log(err.message);
}
