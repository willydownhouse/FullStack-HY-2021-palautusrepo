import express from "express";
import cors from "cors";

import patientRouter from "./src/routes/patientRoutes";
import diagnoseRouter from "./src/routes/diagnoseRoutes";

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.use(express.json());

const port = 3001;

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/patients", patientRouter);
app.use("/api/diagnoses", diagnoseRouter);

app.listen(port, () => {
  console.log(`App listening port ${port}`);
});
