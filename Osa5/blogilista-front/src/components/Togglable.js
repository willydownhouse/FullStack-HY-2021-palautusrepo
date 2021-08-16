import React, { useState } from 'react';

const Togglable = props => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      {visible ? (
        <>
          {React.cloneElement(props.children, { setVisible: setVisible })}
          <div onClick={() => setVisible(!visible)} className="ui button">
            Cancel
          </div>
        </>
      ) : (
        <div onClick={() => setVisible(!visible)} className="ui button">
          {props.btnLabel}
        </div>
      )}
    </div>
  );
};

export default Togglable;
