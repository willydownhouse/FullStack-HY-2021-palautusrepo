import React from "react";

const Numbers = ({ title, persons, filter }) => {
  const renderNamesAndNumbers = () => {
    return persons.map((person) => {
      if (person.name.toLowerCase().includes(filter)) {
        return (
          <div key={person.name}>
            {person.name} {person.number ? person.number : "No phonenumber"}
          </div>
        );
      }
      return null;
    });
  };
  return (
    <div>
      <h2>{title}</h2>
      <div>{renderNamesAndNumbers()}</div>
    </div>
  );
};

export default Numbers;
