import { Formik, Form, Field } from "formik";
import { TextField } from "../AddPatientModal/FormField";
import React from "react";
import { Button, Grid, FormField } from "semantic-ui-react";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Entry } from "../types";

export type EntryFormValues = Omit<Entry, "id">;

const entryOptions = ["HealthCheck", "OccupationalHealthcare", "Hospital"];

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

function AddEntryForm({ onCancel, onSubmit }: Props) {
  const [{ diagnoses }] = useStateValue();
  return (
    <div>
      <Formik
        initialValues={{
          type: "HealthCheck",
          date: "",
          description: "",
          specialist: "",
        }}
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          if (!values.type) {
            errors.name = requiredError;
          }
          if (!values.date) {
            errors.ssn = requiredError;
          }
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }

          return errors;
        }}
      >
        {({ dirty, isValid, setFieldValue, setFieldTouched }) => {
          return (
            <Form className="form ui">
              <FormField>
                <label>Type</label>
                <Field as="select" name="type" className="ui dropdown">
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
                placeholder="Date"
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

              <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">
                    Cancel
                  </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default AddEntryForm;
