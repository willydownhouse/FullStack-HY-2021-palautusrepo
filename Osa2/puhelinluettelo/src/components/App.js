import React, { useState, useEffect } from "react";

import Notification from "./Notification";
import FilterNames from "./FilterNames";
import AddNewPersonForm from "./AddNewPersonForm";
import PhoneNumberList from "./PhoneNumberList";
import phoneService from "../services/PhoneNumbers";

const App = () => {
  const [phoneBook, setPhoneBook] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    phoneService
      .getAll()
      .then((numbers) => {
        setPhoneBook(numbers);
      })
      .catch((err) => {
        setErrorMessage(err.message);

        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  }, []);

  return (
    <div className="ui container">
      <h1 className="ui header">Phonebook</h1>

      <FilterNames
        placeholder="Filter names..."
        filter={filter}
        setFilter={setFilter}
      />

      <AddNewPersonForm
        phoneBook={phoneBook}
        setPhoneBook={setPhoneBook}
        newName={newName}
        setNewName={setNewName}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage}
      />
      <Notification message={successMessage} errorMessage={errorMessage} />

      <PhoneNumberList
        title="Numbers"
        filter={filter}
        phoneBook={phoneBook}
        setPhoneBook={setPhoneBook}
        setSuccessMessage={setSuccessMessage}
      />
    </div>
  );
};

export default App;
