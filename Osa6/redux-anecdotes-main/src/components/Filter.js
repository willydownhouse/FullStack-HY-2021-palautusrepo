import React from "react";
import { TextField } from "@material-ui/core";
import { filter } from "../actions";
import { useDispatch } from "react-redux";

function Filter(props) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(filter(e.target.value.toLowerCase()));
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

export default Filter;
