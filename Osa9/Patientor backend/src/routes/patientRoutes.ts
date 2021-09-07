import express from "express";
import patientServices from "../services/patientServices";
import { toNewPatient } from "../utils/utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientServices.getAllPatientsNonSensitive());
});

router.post("/", (req, res) => {
  try {
    const patient = toNewPatient(req.body);

    res.send(patientServices.createPatient(patient));
  } catch (err: any) {
    res.status(400).send(err.message);
  }
});

export default router;
