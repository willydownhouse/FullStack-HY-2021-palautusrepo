import React, { useState, useEffect } from "react";
import axios from "axios";

import FilterNames from "./FilterNames";
import AddNewPersonForm from "./AddNewPersonForm";
import Numbers from "./Numbers";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      setPersons(res.data);
    });
  }, []);

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (!persons.map((person) => person.name).includes(newName)) {
      setPersons([...persons, { name: newName, number: phoneNumber }]);
      setNewName("");
      setPhoneNumber("");
      return;
    }

    alert(`${newName} is already in phonebook`);
    console.log(persons);
  };

  return (
    <div className="ui container">
      <h2>Phonebook</h2>

      <FilterNames
        placeholder="Filter names..."
        filter={filter}
        setFilter={setFilter}
      />

      <AddNewPersonForm
        onFormSubmit={onFormSubmit}
        newName={newName}
        setNewName={setNewName}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />

      <Numbers title="Numbers" filter={filter} persons={persons} />
    </div>
  );
};

export default App;
