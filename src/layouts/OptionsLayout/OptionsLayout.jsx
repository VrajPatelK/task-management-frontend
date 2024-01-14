import React, { useState } from "react";
import "./OptionsLayout.css";
import DropArrow from "../../components/icons/DropArrow";

const OptionsLayout = ({
  title = "title",
  title_style = {},
  children,
  droparrow = false,
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
        style={{ ...title_style }}
        className="title"
      >
        {title}
        {droparrow && <DropArrow />}
      </div>
      {display && <div className="option-layout">{children}</div>}
    </div>
  );
};

export default OptionsLayout;
