import React from "react";
import "./Options.css";

const OptionBtn = ({ children, style = { color: "#747d8c" }, onAction }) => {
  return (
    <>
      <button
        style={{
          textTransform: "capitalize",
          ...style,
        }}
        onClick={onAction}
      >
        {children}
      </button>
    </>
  );
};

export default OptionBtn;
