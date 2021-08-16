import React from 'react';

function Notification({ message, errMessage }) {
  return (
    <div className={`ui ${message ? 'positive' : 'error'} message`}>
      <div className="header">{message ? message : errMessage}</div>
    </div>
  );
}

export default Notification;
