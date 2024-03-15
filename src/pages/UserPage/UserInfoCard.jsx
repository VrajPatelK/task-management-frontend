import React from "react";
import Email from "../../components/icons/Email";
import ProfileImg from "../../components/ProfileImg";

const UserInfoCard = ({ username, profile_img, email }) => {
  return (
    <div className="user-details">
      <div className="user-row-1">
        <ProfileImg alt={username} src={profile_img} />
      </div>
      <div className="user-row-2">
        <div className="user-username">
          <span>@</span>
          <i>{username}</i>
        </div>
      </div>
      <div className="user-row-3">
        <div className="user-contact-info">contact information</div>
        <div className="user-email">
          <Email /> <span>{email}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
