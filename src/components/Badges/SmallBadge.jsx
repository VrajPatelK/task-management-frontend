import React from "react";
import "./Badges.css";

const SmallBadge = ({ children, style = {} }) => {
  return (
    <div className="smallBadge" style={style}>
      {children}
    </div>
  );
};

export default SmallBadge;
