import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const genres = [
  "refactoring",
  "agile",
  "patterns",
  "design",
  "crime",
  "classic",
];

const Books = (props) => {
  const [onClickValue, setOnClickValue] = useState(null);

  let result = useQuery(ALL_BOOKS, {
    variables: {
      genre: onClickValue,
    },
  });

  const renderButtons = () => {
    return genres.map((genre, i) => {
      return (
        <button
          key={i}
          value={genre}
          onClick={(e) => setOnClickValue(e.target.value)}
        >
          {genre}
        </button>
      );
    });
  };

  if (!props.show) {
    return null;
  }

  if (result.loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {renderButtons()}
        <button onClick={(e) => setOnClickValue(null)} value="all">
          all genres
        </button>
      </div>
    </div>
  );
};

export default Books;
