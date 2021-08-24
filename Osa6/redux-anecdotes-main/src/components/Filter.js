import React from "react";
import { TextField } from "@material-ui/core";
import { filter } from "../actions";
import { connect } from "react-redux";

function Filter({ filter }) {
  const handleChange = (e) => {
    filter(e.target.value.toLowerCase());
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

export default connect(null, { filter })(Filter);
