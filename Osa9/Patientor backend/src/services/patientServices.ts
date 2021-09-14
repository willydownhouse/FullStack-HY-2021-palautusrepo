//import patientData from "../../data/patients.json";
let { patientData } = require("../../data/patients");
import { NonSensitivePatient, Patient, Entry } from "../utils/types";

const getAllPatients = (): Patient[] => {
  return patientData;
};

const getAllPatientsNonSensitive = (): NonSensitivePatient[] => {
  return patientData.map(
    ({ id, name, dateOfBirth, gender, occupation }: NonSensitivePatient) => {
      return {
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
      };
    }
  );
};

const getOnePatient = (id: string): Patient | undefined => {
  const patient = patientData.find((ob: Patient) => ob.id === id);

  return patient;
};

const createPatient = (patient: Patient): NonSensitivePatient => {
  patientData = patientData.concat(patient);

  return patient;
};

const addEntryToPatientEntries = (patient: Patient, entry: Entry) => {
  const updatedPatient = {
    ...patient,
    entries: [...patient.entries, entry],
  };

  patientData = patientData.map((patient: Patient) =>
    patient.id === updatedPatient.id ? updatedPatient : patient
  );
};

export default {
  getAllPatients,
  getAllPatientsNonSensitive,
  createPatient,
  getOnePatient,
  addEntryToPatientEntries,
};
