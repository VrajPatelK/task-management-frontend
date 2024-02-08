import React from "react";

const ThemeBadge = ({ theme, children }) => {
  return <div className={`role ${theme}`}>{children}</div>;
};

export default ThemeBadge;
