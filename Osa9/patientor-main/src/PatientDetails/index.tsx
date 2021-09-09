import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientDetails } from "../state";
import { Patient } from "../types";
import { Divider, Icon } from "semantic-ui-react";

function PatientDetails() {
  const [state, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = state.patientDetails[id];

  useEffect(() => {
    if (patient) return;

    void axios.get<Patient>(`${apiBaseUrl}/patients/${id}`).then((res) => {
      dispatch(setPatientDetails(res.data));
    });
  }, []);

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
    </div>
  );
}

export default PatientDetails;
