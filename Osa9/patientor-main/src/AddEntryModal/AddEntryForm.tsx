import { Formik, Form, Field } from "formik";

import React from "react";
import { Button, Divider, Grid } from "semantic-ui-react";
import {
  DiagnosisSelection,
  NumberField,
  TextField,
} from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { HealthCheckEntry, HealthCheckRating } from "../types";

export type EntryFormValues = Omit<HealthCheckEntry, "id">;

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
          healthCheckRating: HealthCheckRating.Healthy,
        }}
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredError = "Field is required";

          const errors: { [field: string]: string } = {};

          if (!values.type) {
            errors.name = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }

          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.healthCheckRating) {
            errors.healthCheckRating = requiredError;
          }

          if (!Date.parse(values.date)) {
            errors.date = "Not a valid date";
          }

          return errors;
        }}
      >
        {({ dirty, isValid, setFieldValue, setFieldTouched }) => {
          return (
            <Form className="form ui">
              <label>Type</label>
              <Field as="select" name="type">
                <option value="HealthCheck">HealthCheck</option>
              </Field>

              <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
              />
              <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
              />
              <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
              />

              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
              />

              <Field
                label="healthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />

              <Divider hidden />
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
