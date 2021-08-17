import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Togglable = ({ btnLabel1, btnLabel2, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      {visible ? (
        <>
          {React.cloneElement(children, { setVisible: setVisible })}
          <div onClick={() => setVisible(!visible)} className="ui button">
            {btnLabel2}
          </div>
        </>
      ) : (
        <div onClick={() => setVisible(!visible)} className="ui button">
          {btnLabel1}
        </div>
      )}
    </div>
  );
};

Togglable.propTypes = {
  btnLabel1: PropTypes.string.isRequired,
  btnLabel2: PropTypes.string.isRequired,
};

export default Togglable;
