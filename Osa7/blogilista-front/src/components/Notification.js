import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Notification() {
  const notification = useSelector(state => state.notification);

  return (
    <div id="notification" className={`ui message`}>
      <div className="header">{notification}</div>
    </div>
  );
}

export default Notification;
