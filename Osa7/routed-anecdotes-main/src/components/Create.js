import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = (props) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      auhtor: author.value,
      info: info.value,
      votes: 0,
    });

    props.setNotification(`A new anecdote ${content.value} created`);

    setTimeout(() => {
      props.setNotification("");
    }, 10000);

    history.push("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log("reset fields");
            content.onReset();
            author.onReset();
            info.onReset();
          }}
        >
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
