import express from "express";

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

const port = 3001;

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { weight, height } = req.query;

  if (!weight || !height || isNaN(+weight) || isNaN(+height)) {
    res.status(400).json({
      error: "malformed parameters",
    });
  }

  const message = calculateBmi(Number(height), Number(weight));

  res.json({
    weight,
    height,
    message,
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { target, daily_exercises } = req.body;

  console.log(target, daily_exercises);

  if (!target || !daily_exercises) {
    return res.status(400).json({
      error: "parameters missing",
    });
  }

  if (isNaN(+target) || daily_exercises.some(isNaN)) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  const data = calculateExercises(daily_exercises, target);

  return res.status(200).json({
    data,
  });
});

app.listen(port, () => {
  console.log(`App listening port ${port}`);
});
