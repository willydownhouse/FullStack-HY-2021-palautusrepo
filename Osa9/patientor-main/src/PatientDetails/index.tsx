import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { apiBaseUrl } from "../constants";
import {
  useStateValue,
  setPatientDetails,
  setDiagnoses,
  setPatientEntries,
} from "../state";
import { Patient, Diagnose, Entry } from "../types";
import { Divider, Icon, List, Button } from "semantic-ui-react";
import PatientEntries from "../components/PatientEntries";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

//import AddPatientModal from "../AddPatientModal";
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function isEmpty(obj: any) {
  return Object.keys(obj).length === 0;
}

function PatientDetails() {
  const [state, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = state.patientDetails[id];
  const diagnoses = state.diagnoses;

  //Modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = (): void => {
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const onFormSubmit = async (values: EntryFormValues) => {
    try {
      await axios
        .post<Entry>(`${apiBaseUrl}/patients/${patient.id}/entries`, values)
        .then((res) => {
          console.log("action dispatched with this data:");
          console.log(res.data);
          dispatch(setPatientEntries(patient.id, res.data));
          closeModal();
        });
    } catch (err) {
      console.log(err);
    }
  };

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

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={onFormSubmit}
      />
      <Button onClick={() => openModal()}>Add entry</Button>
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
