import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Menu from "./Menu";
import AnecdoteList from "./AnecdoteList";
import About from "./About";
import CreateNew from "./Create";
import ShowDetails from "./ShowDetails";
import Footer from "./Footer";
import Notification from "./Notification";

const list = [
  {
    content: "If it hurts, do it more often",
    author: "Jez Humble",
    info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
    votes: 0,
    id: "1",
  },
  {
    content: "Premature optimization is the root of all evil",
    author: "Donald Knuth",
    info: "http://wiki.c2.com/?PrematureOptimization",
    votes: 0,
    id: "2",
  },
];

const App = () => {
  const [anecdotes, setAnecdotes] = useState(list);
  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <BrowserRouter>
      <h1>Software anecdotes</h1>
      <Menu />

      <Switch>
        <Route exact path="/">
          {notification ? <Notification notification={notification} /> : null}
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} setNotification={setNotification} />
        </Route>
        <Route path="/anecdote/:id">
          <ShowDetails anecdotes={anecdotes} />
        </Route>
      </Switch>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
