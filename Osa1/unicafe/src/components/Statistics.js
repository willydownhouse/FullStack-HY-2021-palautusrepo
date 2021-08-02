import React from "react";
import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  const average = (good * 1 + bad * -1) / all;

  const positive = (good / all) * 100;

  if (isNaN(average)) {
    return <div>No feedback given</div>;
  }

  return (
    <table className="ui very basic collapsing celled table">
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={all} />
        <StatisticLine text="Average" value={average} />
        <StatisticLine text="Positive" value={`${positive.toFixed(2)} %`} />
      </tbody>
    </table>
  );
};

export default Statistics;
