//import patientData from "../../data/patients.json";
import { patientData } from "../../data/patients";
import { NonSensitivePatient, Patient, Entry } from "../utils/types";

const getAllPatients = (): Patient[] => {
  return patientData;
};

const getAllPatientsNonSensitive = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

const getOnePatient = (id: string): Patient | undefined => {
  const patient = patientData.find((ob) => ob.id === id);

  return patient;
};

const createPatient = (patient: Patient): NonSensitivePatient => {
  patientData.concat(patient);

  return patient;
};

const addEntryToPatientEntries = (patient: Patient, entry: Entry) => {
  const updatedPatient = {
    ...patient,
    entries: [...patient.entries, entry],
  };

  const a = patientData.map((patient) =>
    patient.id === updatedPatient.id ? updatedPatient : patient
  );

  console.log(a);
};

export default {
  getAllPatients,
  getAllPatientsNonSensitive,
  createPatient,
  getOnePatient,
  addEntryToPatientEntries,
};
