import React from "react";

const FilterNames = (props) => {
  const { filter, setFilter, placeholder } = props;

  return (
    <>
      <div className="ui input">
        <input
          value={filter}
          type="text"
          onChange={(e) => setFilter(e.target.value)}
          placeholder={placeholder}
        />
      </div>
      <div className="ui hidden divider"></div>
    </>
  );
};

export default FilterNames;
