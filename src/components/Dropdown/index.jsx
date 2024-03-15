import React from "react";
import "./Dropdown.css";

const Dropdown = ({ title, children, title_style = {} }) => {
  return (
    <div className="dropdown">
      <div className="dropdown-title" style={title_style}>
        {title}
      </div>
      <div className="dropdown-items">{children}</div>
    </div>
  );
};

export default Dropdown;
