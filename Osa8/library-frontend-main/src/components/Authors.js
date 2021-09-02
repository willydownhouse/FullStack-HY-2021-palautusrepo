import React, { useState } from "react";
import Select from "react-select";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, SET_BORN } from "../queries";

const Authors = ({ show, loggedIn }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [born, setBorn] = useState("");
  const authors = useQuery(ALL_AUTHORS);

  const [editBorn] = useMutation(SET_BORN, {
    refetchQueries: [ALL_AUTHORS],
  });

  if (!show) {
    return null;
  }

  if (authors.loading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const { value } = selectedOption;

    editBorn({
      variables: {
        name: value,
        born: +born,
      },
    });

    setBorn("");
  };

  const options = authors.data.allAuthors.map((a) => {
    return {
      value: a.name,
      label: a.name,
    };
  });

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loggedIn ? (
        <div>
          <h3>Set birthyear</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name</label>
              <Select
                defaultValue={selectedOption}
                options={options}
                onChange={setSelectedOption}
              />
            </div>
            <div>
              <label>Set age to</label>
              <input
                type="number"
                value={born}
                onChange={(e) => setBorn(e.target.value)}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Authors;
