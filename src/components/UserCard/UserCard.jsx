import React from "react";
import "./UserCard.css";
import UserCardLayout from "../../layouts/UserCardLayout/UserCardLayout";
import ProfileImg from "../ProfileImg/ProfileImg";

const UserCard = ({ src, email, username, user_type }) => {
  return (
    <UserCardLayout>
      <div className="profile-img-div">
        <ProfileImg src={src} alt={username} />
      </div>
      <div className="user-details">
        <div className="username">
          <span>@</span>
          {username}
        </div>
        <div className="email">{email}</div>
        <div>{user_type}</div>
      </div>
    </UserCardLayout>
  );
};

export default UserCard;
