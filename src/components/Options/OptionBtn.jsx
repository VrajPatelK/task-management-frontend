import React from "react";
import "./Options.css";

const OptionBtn = ({ children, style = {}, onAction, className = "" }) => {
  return (
    <>
      <button
        className={`${className} option-btn`}
        style={style}
        onClick={onAction}
      >
        {children}
      </button>
    </>
  );
};

export default OptionBtn;
