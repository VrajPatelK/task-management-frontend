import React from "react";
import ProfileImg from "../ProfileImg/ProfileImg";
import OptionsLayout from "../../layouts/OptionsLayout/OptionsLayout";
import Pending from "../icons/Pending";
import InProgress from "../icons/InProgress";
import Completed from "../icons/Completed";
import OptionBtn from "../Options/OptionBtn";

const CardFooter = () => {
  return (
    <div className="card-footer">
      <OptionsLayout title={"status"}>
        <OptionBtn style={{ color: "#3742fa" }} onAction={() => {}}>
          pending
          <Pending />
        </OptionBtn>
        <OptionBtn style={{ color: "#ffa502" }} onAction={() => {}}>
          in progress
          <InProgress />
        </OptionBtn>
        <OptionBtn style={{ color: "#2ed573" }} onAction={() => {}}>
          completed
          <Completed />
        </OptionBtn>
      </OptionsLayout>
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
