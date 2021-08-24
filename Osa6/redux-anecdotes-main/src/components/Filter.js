import React from "react";
import { TextField } from "@material-ui/core";
import { filter, getAnecdotes } from "../actions";
import { connect } from "react-redux";

function Filter(props) {
  const handleChange = (e) => {
    props.filter(e.target.value.toLowerCase());
    setTimeout(props.getAnecdotes, 1500);
  };
  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Filter..."
        variant="outlined"
        margin="normal"
        autoComplete="off"
        fullWidth
        onChange={handleChange}
      />
    </div>
  );
}

export default connect(null, { filter, getAnecdotes })(Filter);
