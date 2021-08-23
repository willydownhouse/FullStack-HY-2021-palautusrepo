import React from "react";
import { useSelector } from "react-redux";
import { Container, Typography } from "@material-ui/core";

import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

const App = () => {
  const notification = useSelector((state) => state.notification);
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
