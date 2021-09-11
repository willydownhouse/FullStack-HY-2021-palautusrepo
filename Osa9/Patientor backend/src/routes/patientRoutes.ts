import express from "express";
import patientServices from "../services/patientServices";
import { toNewPatient, toNewEntry } from "../utils/utils";

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

router.post("/:id/entries", (req, res) => {
  const patient = patientServices.getOnePatient(req.params.id);

  if (!patient) {
    return res.status(404).send("No patient with that ID");
  }

  const entry = toNewEntry(req.body);

  if (entry instanceof Error) {
    return res.status(400).send(entry.message);
  }

  //update data
  patientServices.addEntryToPatientEntries(patient, entry);

  return res.send(entry);
});

export default router;
