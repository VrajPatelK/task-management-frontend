import React from "react";
import "./AuthenticationLayout.css";

const AuthenticationLayout = ({ children }) => {
  return (
    <div className="auth-body-layout">
      <div className="auth-body-content">{children}</div>
    </div>
  );
};

export default AuthenticationLayout;
