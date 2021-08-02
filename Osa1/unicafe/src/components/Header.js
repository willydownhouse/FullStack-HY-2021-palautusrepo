import React from "react";

const Header = ({ title, size }) => {
  return <div className={`ui ${size} header`}>{title}</div>;
};

export default Header;
