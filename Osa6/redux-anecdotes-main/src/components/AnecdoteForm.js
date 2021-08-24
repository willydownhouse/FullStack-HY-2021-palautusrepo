import React from "react";
import { connect } from "react-redux";
import { createAnecdote, showNotification } from "../actions";

import { Typography, TextField, Button, Box } from "@material-ui/core";

function AnecdoteForm({ createAnecdote, showNotification }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    createAnecdote(e.target.anecdote.value);

    showNotification(`You created anecdote: ${e.target.anecdote.value}`, 5);

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

export default connect(null, {
  createAnecdote,
  showNotification,
})(AnecdoteForm);
