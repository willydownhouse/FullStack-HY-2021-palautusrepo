import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography } from "@material-ui/core";

import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import { getAnecdotes } from "./actions";

const App = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnecdotes());
  }, [dispatch]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" gutterBottom>
        Anecdotes
      </Typography>
      <Filter />
      {notification ? <Notification /> : null}
      <AnecdoteList />
      <AnecdoteForm />
    </Container>
  );
};

export default App;
