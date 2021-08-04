import React from "react";

const Total = ({ parts }) => {
  const renderTotal = () => {
    return parts
      .map((part) => part.exercises)
      .reduce((acc, value) => acc + value);
  };

  return (
    <div>
      <p>Total: {renderTotal()}</p>
    </div>
  );
};

export default Total;
