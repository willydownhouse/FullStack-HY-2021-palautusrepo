import { Patient } from "./types";
import { Gender } from "./types";

import { v1 as uuid } from "uuid";

export const toNewPatient = (object: any): Patient => {
  const id = uuid();

  const newPatient = {
    id,
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };
  return newPatient;
};

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

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
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
