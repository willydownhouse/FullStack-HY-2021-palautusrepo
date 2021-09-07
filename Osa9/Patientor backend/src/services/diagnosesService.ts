import diagnoseData from "../../data/diagnoses.json";

import { Diagnose } from "../utils/types";

const diagnoses: Array<Diagnose> = diagnoseData;

const getAllDiagnoses = (): Array<Diagnose> => {
  return diagnoses;
};

export default {
  getAllDiagnoses,
};
