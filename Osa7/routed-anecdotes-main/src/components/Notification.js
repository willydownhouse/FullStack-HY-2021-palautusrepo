import React from "react";

function Notification({ notification }) {
  const style = {
    padding: "10px",
    border: "2px solid red",
    display: "inline-block",
  };

  return <div style={style}>{notification}</div>;
}

export default Notification;
