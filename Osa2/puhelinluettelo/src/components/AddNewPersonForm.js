import React from "react";

const AddNewPersonForm = (props) => {
  const { onFormSubmit, newName, setNewName, phoneNumber, setPhoneNumber } =
    props;
  return (
    <>
      <form className="ui form" onSubmit={onFormSubmit}>
        <div className="field">
          <label>Name</label>
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div className="field">
          <label>Phonenumber</label>
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <button className="ui button secondary" type="submit">
            Add
          </button>
        </div>
      </form>
      <div className="ui hidden divider"></div>
    </>
  );
};

export default AddNewPersonForm;
