import { Field, FormikProps } from "formik";
import React from "react";
import { FormField } from "semantic-ui-react";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Entry } from "../types";
//import { Entry } from "../types";

const entryOptions = ["HealthCheck", "OccupationalHealthcare", "Hospital"];

function BaseEntryFormFields({
  //type,
  setType,
  setFieldValue,
  setFieldTouched,
}: {
  //type: Entry["type"];
  setType: React.Dispatch<React.SetStateAction<Entry["type"]>>;

  setFieldValue:
    | FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"]
    | FormikProps<{ type: string }>["setFieldValue"];

  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) {
  const [{ diagnoses }] = useStateValue();
  return (
    <>
      <FormField>
        <label>Type</label>
        <Field
          onChange={(e: any) => {
            setFieldValue("type", e.target.value);
            setType(e.target.value);
          }}
          as="select"
          name="type"
          className="ui dropdown"
          //value={type}
        >
          {entryOptions.map((op) => {
            return (
              <option key={op} value={op}>
                {op}
              </option>
            );
          })}
        </Field>
      </FormField>

      <DiagnosisSelection
        setFieldValue={setFieldValue}
        setFieldTouched={setFieldTouched}
        diagnoses={Object.values(diagnoses)}
      />
      <Field
        label="Date"
        placeholder="YYYY-MM-DD"
        name="date"
        component={TextField}
      />
      <Field
        label="Description"
        placeholder="Description"
        name="description"
        component={TextField}
      />
      <Field
        label="Specialist"
        placeholder="Specialist"
        name="specialist"
        component={TextField}
      />
    </>
  );
}

export default BaseEntryFormFields;
