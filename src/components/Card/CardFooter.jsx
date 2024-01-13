import React from "react";
import ProfileImg from "../ProfileImg/ProfileImg";
const CardFooter = () => {
  return (
    <div className="card-footer">
      <div className="status">status</div>
      <div className="deadline">deadline</div>
      <div className="profile">
        <ProfileImg
          src={
            "https://firebasestorage.googleapis.com/v0/b/task-management-fbb64.appspot.com/o/profile_images%2Fdefault-profile-img.png?alt=media&token=dbab22ee-13fe-4b80-b7a5-7209944a775a"
          }
          alt={"profile.img"}
        />
      </div>
    </div>
  );
};

export default CardFooter;
