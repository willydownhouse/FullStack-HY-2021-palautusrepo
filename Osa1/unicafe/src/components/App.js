import React, { useState } from "react";

import Header from "./Header";
import Button from "./Buttons";
import Statistics from "./Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onGoodClick = () => {
    setGood(good + 1);
  };

  const onNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const onBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div className="ui container">
      <Header title="Give Feedback" size="large" />
      <Button btnText="Good" handleClick={onGoodClick} color="secondary" />
      <Button btnText="Neutral" handleClick={onNeutralClick} color=" " />
      <Button btnText="Bad" handleClick={onBadClick} color="red" />
      <Header title="Statistics" size="medium" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
