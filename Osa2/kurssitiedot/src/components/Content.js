import React from "react";

import Part from "./Part";
import Total from "./Total";

const Content = ({ parts }) => {
  console.log(parts);

  const renderParts = () => {
    return parts.map((part) => <Part key={part.id} part={part} />);
  };

  return (
    <div>
      <div>{renderParts()}</div>
      <Total parts={parts} />
    </div>
  );
};

export default Content;
