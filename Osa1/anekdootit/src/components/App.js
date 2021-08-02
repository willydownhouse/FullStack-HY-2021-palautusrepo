import React, { useState } from "react";

const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
];

const App = () => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length));

  const voteSelected = () => {
    const copy = [...points];

    copy[selected] += 1;

    setPoints(copy);
  };

  const mostVotes = () => {
    let i = points.indexOf(Math.max(...points));

    return (
      <div>
        <div>{anecdotes[i]}</div>
        <p>Has {points[i]} votes</p>
      </div>
    );
  };

  return (
    <div>
      <h1>Anectode of the day</h1>
      <div>
        {anecdotes[selected]}
        <p>Has {points[selected]} votes</p>
      </div>
      <div>
        <button
          onClick={() =>
            setSelected(Math.floor(Math.random() * anecdotes.length))
          }
        >
          Next anectode
        </button>
        <button onClick={() => voteSelected()}>Vote</button>
      </div>
      <h2>Anecdote with most votes</h2>
      {mostVotes()}
    </div>
  );
};

export default App;
