import React from "react";

const Notification = ({ message, errorMessage }) => {
  if (!message && !errorMessage) return null;

  if (message) {
    return <div className="ui green message">{message}</div>;
  }

  return <div className="ui error message">{errorMessage}</div>;
};

export default Notification;
