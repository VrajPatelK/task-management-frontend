import React from "react";
import "./UserCardContainer.css";

const UserCardContainer = ({ children }) => {
  return <div className="user-card-container">{children}</div>;
};

export default UserCardContainer;
