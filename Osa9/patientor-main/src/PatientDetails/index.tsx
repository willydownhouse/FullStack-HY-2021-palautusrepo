import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientDetails, setDiagnoses } from "../state";
import { Patient, Diagnose } from "../types";
import { Divider, Icon, List } from "semantic-ui-react";
import PatientEntries from "../components/PatientEntries";
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function isEmpty(obj: any) {
  return Object.keys(obj).length === 0;
}

function PatientDetails() {
  const [state, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = state.patientDetails[id];
  const diagnoses = state.diagnoses;

  useEffect(() => {
    if (patient) return;

    void axios.get<Patient>(`${apiBaseUrl}/patients/${id}`).then((res) => {
      dispatch(setPatientDetails(res.data));
    });
  }, []);

  useEffect(() => {
    if (!isEmpty(diagnoses)) return;

    void axios.get<Diagnose[]>(`${apiBaseUrl}/diagnoses`).then((res) => {
      dispatch(setDiagnoses(res.data));
    });
  }, []);

  console.log(state);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>
        {patient.name}{" "}
        <Icon name={patient.gender === "male" ? "mars" : "venus"} />
      </h3>
      <Divider hidden />
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <Divider hidden />
      <h4>entries</h4>
      <List divided relaxed>
        <PatientEntries entries={patient.entries} />
      </List>
    </div>
  );
}

export default PatientDetails;
