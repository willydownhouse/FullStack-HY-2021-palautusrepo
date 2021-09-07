import patientData from "../../data/patients.json";
import { NonSensitivePatient, Patient } from "../utils/types";

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

const createPatient = (patient: Patient): NonSensitivePatient => {
  patientData.concat(patient);

  return patient;
};

export default {
  getAllPatients,
  getAllPatientsNonSensitive,
  createPatient,
};
