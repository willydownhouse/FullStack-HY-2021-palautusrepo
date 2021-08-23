import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote, showNotification, hideNotification } from "../actions";

import { Typography, Button } from "@material-ui/core";

function AnecdoteList(props) {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();

  const vote = (id, content) => {
    dispatch(voteAnecdote(id));

    dispatch(showNotification(`You voted ${content}`));

    setTimeout(() => {
      dispatch(hideNotification());
    }, 3000);
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <Typography variant="subtitle1" gutterBottom>
            {anecdote.content}
          </Typography>
          <Typography variant="h6" display="block" gutterBottom>
            has {anecdote.votes}
            <Button
              variant="contained"
              size="small"
              style={{ marginLeft: "30px" }}
              onClick={() => vote(anecdote.id, anecdote.content)}
            >
              vote
            </Button>
          </Typography>
        </div>
      ))}
    </div>
  );
}

export default AnecdoteList;
