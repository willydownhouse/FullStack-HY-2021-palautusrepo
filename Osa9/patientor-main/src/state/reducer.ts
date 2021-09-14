import { State } from "./state";
import { Patient, Diagnose, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT_DETAILS";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSE";
      payload: Diagnose[];
    }
  | {
      type: "ADD_ENTRY";
      payload: {
        entry: Entry;
        patientId: string;
      };
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };

    case "SET_PATIENT_DETAILS":
      return {
        ...state,
        patientDetails: {
          ...state.patientDetails,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_DIAGNOSE":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnoses,
        },
      };
    case "ADD_ENTRY":
      const updatedPatient = {
        ...state.patientDetails[action.payload.patientId],
      };

      updatedPatient.entries = [
        ...updatedPatient.entries,
        action.payload.entry,
      ];

      return {
        ...state,
        patientDetails: {
          ...state.patientDetails,
          [action.payload.patientId]: updatedPatient,
        },
      };
    default:
      return state;
  }
};

export const setPatientList = (data: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: data,
  };
};

export const setPatientDetails = (data: Patient): Action => {
  return {
    type: "SET_PATIENT_DETAILS",
    payload: data,
  };
};

export const setDiagnoses = (data: Diagnose[]): Action => {
  return {
    type: "SET_DIAGNOSE",
    payload: data,
  };
};

export const setPatientEntries = (patientId: string, data: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    payload: {
      patientId,
      entry: data,
    },
  };
};
