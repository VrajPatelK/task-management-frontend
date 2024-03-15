import React from "react";
import "./Label.css";

const Label = ({ message = "", style = {} }) => {
  return (
    <div className="label" style={style}>
      {message}
    </div>
  );
};

export default Label;
