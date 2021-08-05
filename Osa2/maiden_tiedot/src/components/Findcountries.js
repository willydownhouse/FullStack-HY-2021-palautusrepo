import React, { useState } from 'react';

const Findcountries = props => {
  const { inputValue, setInputValue } = props;

  return (
    <div className="content">
      <h1 className="ui header">Find countries</h1>
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
