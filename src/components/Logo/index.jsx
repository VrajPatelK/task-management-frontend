import React from "react";
import "./Logo.css";
import logoImage from "../../assets/logo.png";

const Logo = () => {
  return (
    <div className="logo">
      <span>
        <img src={logoImage} alt="logo" />
      </span>
      <span>Task Management</span>
    </div>
  );
};

export default Logo;
