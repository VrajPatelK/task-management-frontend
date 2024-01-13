import React from "react";
import "./UserCard.css";
import UserCardLayout from "../../layouts/UserCardLayout/UserCardLayout";
import ProfileImg from "../ProfileImg/ProfileImg";

const UserCard = () => {
  return (
    <UserCardLayout>
      <div className="profile-img-div">
        <ProfileImg
          src={
            "https://firebasestorage.googleapis.com/v0/b/task-management-fbb64.appspot.com/o/profile_images%2Fdefault-profile-img.png?alt=media&token=dbab22ee-13fe-4b80-b7a5-7209944a775a"
          }
          alt={"profile.img"}
        />
      </div>
      <div className="user-details">
        <div className="username">
          <span>@</span>Username
        </div>
        <div className="email">abc@gmail.com</div>
        <div>developer</div>
      </div>
    </UserCardLayout>
  );
};

export default UserCard;
