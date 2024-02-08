import React, { useState } from "react";
import "./OptionsLayout.css";
import DropArrow from "../../components/icons/DropArrow";

const OptionsLayout = ({
  title = "title",
  title_style = {},
  children,
  droparrow = false,
  exptraPadding = true,
}) => {
  const [display, setDisplay] = useState(false);
  return (
    <div
      className="dropdown-layout"
      onMouseEnter={() => setDisplay(true)}
      onMouseLeave={() => setDisplay(false)}
    >
      <div
        onMouseEnter={() => setDisplay(true)}
        style={title_style}
        className={`title ${exptraPadding ? "extra-padding" : ""}`}
      >
        {title}
        {droparrow && <DropArrow />}
      </div>
      {display && (
        <div className="option-layout" onClick={() => setDisplay(false)}>
          {children}
        </div>
      )}
    </div>
  );
};

export default OptionsLayout;
