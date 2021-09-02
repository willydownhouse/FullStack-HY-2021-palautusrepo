import React from "react";

function Notification({ notification }) {
  const style = {
    border: "2px solid #222",
    padding: "10px",
    margin: "20px",
  };
  return <div style={style}>{notification}</div>;
}

export default Notification;
