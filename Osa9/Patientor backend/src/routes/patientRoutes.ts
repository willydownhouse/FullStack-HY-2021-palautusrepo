import express from "express";
import patientServices from "../services/patientServices";
import { toNewPatient } from "../utils/utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientServices.getAllPatientsNonSensitive());
});

router.get("/:id", (req, res) => {
  const patient = patientServices.getOnePatient(req.params.id);

  if (!patient) {
    return res.sendStatus(404);
  }

  return res.send(patient);
});

router.post("/", (req, res) => {
  try {
    const patient = toNewPatient(req.body);

    res.send(patientServices.createPatient(patient));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).send(err.message);
  }
});

export default router;
