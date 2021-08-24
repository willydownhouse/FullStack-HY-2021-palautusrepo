import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote, showNotification } from "../actions";

import { Typography, Button } from "@material-ui/core";

function AnecdoteList(props) {
  const anecdotes = useSelector((state) => state.anecdotes);

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));

    dispatch(showNotification(`You voted ${anecdote.content}`, 5));
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <Typography variant="subtitle1" gutterBottom>
            {anecdote.content}
          </Typography>
          <Typography variant="h6" display="block" gutterBottom>
            has {anecdote.votes} votes
            <Button
              variant="contained"
              size="small"
              style={{ marginLeft: "30px" }}
              onClick={() => vote(anecdote)}
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
