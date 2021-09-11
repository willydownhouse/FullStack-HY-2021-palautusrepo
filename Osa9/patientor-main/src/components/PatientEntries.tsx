import React from "react";
import { Entry } from "../types";
import {
  Divider,
  Header,
  List,
  ListContent,
  ListItem,
} from "semantic-ui-react";
import { useStateValue } from "../state";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const PatientEntries = ({ entries }: { entries: Entry[] }) => {
  const [state] = useStateValue();

  const renderEntries = () => {
    return entries.map((entry, i) => {
      const baseInfo = () => {
        return (
          <List.Content>
            <List.Header as="h3">
              {entry.date} <List.Icon name="doctor" size="large" />
            </List.Header>

            <List.Description>{entry.description}</List.Description>
            <List>
              {entry.diagnosisCodes?.map((code, i) => {
                return (
                  <List.Item key={i}>
                    {code}
                    {"  "}
                    {state.diagnoses[code] ? state.diagnoses[code].name : null}
                  </List.Item>
                );
              })}
            </List>
          </List.Content>
        );
      };

      switch (entry.type) {
        case "HealthCheck":
          return (
            <ListItem key={i}>
              {baseInfo()}
              <ListContent>
                HealthCheckRating: {entry.healthCheckRating}
                <Divider />
              </ListContent>
            </ListItem>
          );
        case "OccupationalHealthcare":
          return (
            <ListItem key={i}>
              {baseInfo()}
              <ListContent>
                <Divider />
                {entry.sickLeave ? (
                  <div>
                    <Header as="h4">Sickleave</Header>
                    <p>Start {entry.sickLeave.startDate}</p>
                    <p>End {entry.sickLeave.endDate}</p>
                  </div>
                ) : null}
                <Divider />
              </ListContent>
            </ListItem>
          );
        case "Hospital":
          return (
            <ListItem key={i}>
              {baseInfo()}
              <ListContent>
                <Divider />
                <div>
                  <Header as="h4">Discharge</Header>
                  <p>Start {entry.discharge.date}</p>
                  <p>End {entry.discharge.criteria}</p>
                </div>
                <Divider />
              </ListContent>
            </ListItem>
          );
        default:
          return assertNever(entry);
      }
    });
  };

  return <div>{renderEntries()}</div>;
};

export default PatientEntries;
