import React from "react";
import UserProfileBtn from "../UserProfileBtn/UserProfileBtn";

const CardFooter = () => {
  return (
    <div className="card-footer">
      <div className="status">status</div>
      <div className="deadline">deadline</div>
      <div className="profile">
        <UserProfileBtn />
      </div>
    </div>
  );
};

export default CardFooter;
