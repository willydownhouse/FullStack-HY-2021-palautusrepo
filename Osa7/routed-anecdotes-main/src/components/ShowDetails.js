import React from "react";
import { useParams } from "react-router-dom";

function ShowDetails({ anecdotes }) {
  const id = useParams().id;

  const item = anecdotes.find((a) => a.id === id);

  return (
    <div>
      <div>Author: {item.author}</div>
      <div>Content: {item.content}</div>
      <div>
        Info: <a href={item.info}>{item.info}</a>
      </div>
      <div>Votes: {item.votes}</div>
    </div>
  );
}

export default ShowDetails;
