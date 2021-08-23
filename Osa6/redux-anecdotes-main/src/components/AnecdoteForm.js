import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote, showNotification, hideNotification } from "../actions";

import { Typography, TextField, Button, Box } from "@material-ui/core";

function AnecdoteForm(props) {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAnecdote(e.target.anecdote.value));

    dispatch(
      showNotification(`You created anecdote: ${e.target.anecdote.value}`)
    );

    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);

    e.target.anecdote.value = "";
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Create new
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box>
          <TextField
            name="anecdote"
            id="outlined-basic"
            variant="outlined"
            margin="normal"
            autoComplete="off"
            fullWidth
            required
          />
        </Box>
        <Button variant="contained" type="submit">
          Create
        </Button>
      </form>
    </div>
  );
}

export default AnecdoteForm;
