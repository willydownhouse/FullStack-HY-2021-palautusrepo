import React from "react";

const Button = ({ btnText, handleClick, color }) => {
  return (
    <button onClick={() => handleClick()} className={`ui button ${color}`}>
      {btnText}
    </button>
  );
};

export default Button;
