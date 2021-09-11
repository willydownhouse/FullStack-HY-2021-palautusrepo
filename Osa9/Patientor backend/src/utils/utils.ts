import { Patient, Entry } from "./types";
import { Gender } from "./types";

import { v1 as uuid } from "uuid";

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): Patient => {
  const id = uuid();

  const newPatient = {
    id,
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: [],
  };
  return newPatient;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender ${gender}`);
  }
  return gender;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (val: unknown): string => {
  if (!val || !isString(val)) {
    throw new Error(`Incorrect or missing ${val}`);
  }
  return val;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date of birth: " + date);
  }
  return date;
};

const parseSsn = (str: unknown): string => {
  if (!str || !isString(str)) {
    throw new Error(`Incorrect or missing ssn`);
  }
  return str;
};
const parseOccupation = (str: unknown): string => {
  if (!str || !isString(str)) {
    throw new Error(`Incorrect or missing occupation`);
  }
  return str;
};

export const toNewEntry = ({
  type,
  description,
  date,
  specialist,
  diagnosisCodes,
  healthCheckRating,
  employerName,
  sickLeave,
  discharge,
}: {
  type: any;
  description: any;
  date: any;
  specialist: any;
  diagnosisCodes: any;
  healthCheckRating: any;
  employerName: any;
  sickLeave: any;
  discharge: any;
}): Entry | Error => {
  if (!type || !description || !date || !specialist) {
    return new Error(
      "Entry needs to have at least type, description, date and specialist fields."
    );
  }
  const id = uuid();

  const newEntry = {
    id,
    type,
    description,
    date,
    specialist,
    diagnosisCodes,
  };

  switch (type) {
    case "Hospital":
      if (!discharge || !discharge.date || !discharge.criteria) {
        return new Error(
          "Entry type 'Hospital' must have a field discharge with subfields  date and criteria"
        );
      }
      return {
        ...newEntry,
        discharge,
      };
    case "HealthCheck":
      if (!healthCheckRating) {
        return new Error(
          "Entry type 'HealhCheck' must have a field healthCheckRating"
        );
      }
      return {
        ...newEntry,
        healthCheckRating,
      };
    case "OccupationalHealthcare":
      if (
        !employerName ||
        !sickLeave ||
        !sickLeave.startDate ||
        !sickLeave.endDate
      ) {
        return new Error(
          "Entry type 'OccupationalHealthcare' must have a field employerName and sickLeave with subfields  startDate and endDate"
        );
      }
      return {
        ...newEntry,
        employerName,
        sickLeave,
      };
    default:
      return new Error("No such  Entry type");
  }
};
