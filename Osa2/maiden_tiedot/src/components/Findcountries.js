import React, { useState } from 'react';

const Findcountries = props => {
  const { inputValue, setInputValue } = props;

  return (
    <div className="content">
      <div className="ui header">Find countries</div>
      <div className="ui input">
        <input
          value={inputValue}
          onChange={e => setInputValue(e.target.value.toLowerCase())}
          type="text"
          placeholder="Search..."
        />
      </div>
      <div className="ui horizontal divider"></div>
    </div>
  );
};

export default Findcountries;
