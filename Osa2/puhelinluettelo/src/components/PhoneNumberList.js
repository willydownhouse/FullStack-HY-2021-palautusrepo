import React from "react";

import phoneService from "../services/PhoneNumbers";

const PhoneNumberList = ({
  title,
  phoneBook,
  filter,
  setPhoneBook,
  setSuccessMessage,
}) => {
  const handleClick = (person) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${person.name} from phonebook?`
      )
    ) {
      phoneService.deleteOne(person._id);
      setPhoneBook(phoneBook.filter((item) => item._id !== person._id));
      setSuccessMessage("Number deleted succesfully!");

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }
  };

  const renderNamesAndNumbers = () => {
    return phoneBook.map((person) => {
      if (person.name.toLowerCase().includes(filter)) {
        return (
          <div className="item" key={person.name}>
            <div className="right floated content">
              <div onClick={() => handleClick(person)} className="ui button">
                Delete
              </div>
            </div>
            <div className="content">
              {person.name} {person.number ? person.number : "No phonenumber"}
            </div>
          </div>
        );
      }
      return null;
    });
  };
  return (
    <div>
      <h2 className="ui header">{title}</h2>
      <div className="ui middle aligned divided list">
        {renderNamesAndNumbers()}
      </div>
    </div>
  );
};

export default PhoneNumberList;
