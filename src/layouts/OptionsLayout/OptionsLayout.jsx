import React, { useState } from "react";
import "./OptionsLayout.css";

const OptionsLayout = ({ title = "title", children }) => {
  const [display, setDisplay] = useState(false);
  return (
    <div className="dropdown-layout">
      <div onMouseEnter={() => setDisplay(true)}>{title}</div>
      {display && (
        <div className="option-layout" onMouseLeave={() => setDisplay(false)}>
          {children}
        </div>
      )}
    </div>
  );
};

export default OptionsLayout;
