import React from "react";
import "./Options.css";
import { Link, useLocation } from "react-router-dom";

const OptionLink = ({ children, style = { color: "#000" }, to = "#" }) => {
  const location = useLocation();
  const isActive = (to) => location.pathname === to;

  return (
    <Link
      className={`link ${isActive(to) ? "active" : ""}`}
      to={to}
      style={style}
    >
      {children}
    </Link>
  );
};

export default OptionLink;
