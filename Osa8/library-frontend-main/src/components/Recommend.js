import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

function Recommend({ show, currentUser }) {
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: currentUser.favoriteGenre },
  });

  if (!show) return null;

  if (result.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Recommendations</h3>
      <p>
        books in your favorite genre{" "}
        <strong>{currentUser.favoriteGenre}</strong>
      </p>
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
    </div>
  );
}

export default Recommend;
