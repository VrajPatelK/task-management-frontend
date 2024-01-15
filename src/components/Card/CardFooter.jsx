import React from "react";
import moment from "moment";
import ProfileImg from "../ProfileImg/ProfileImg";
import OptionsLayout from "../../layouts/OptionsLayout/OptionsLayout";
import Pending from "../icons/Pending";
import InProgress from "../icons/InProgress";
import Completed from "../icons/Completed";
import OptionBtn from "../Options/OptionBtn";
import { Link } from "react-router-dom";

const CardFooter = ({
  status,
  deadline,
  profile_img,
  username,
  assigned_to,
  displayProfileIcon,
}) => {
  var formatedDate = moment(deadline).format("D-MM-YYYY");

  return (
    <div className="card-footer">
      <OptionsLayout title={status}>
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
      <div className="deadline">{formatedDate}</div>
      {displayProfileIcon && (
        <div className="profile">
          <Link to={`/users/${assigned_to}`}>
            <ProfileImg src={profile_img} alt={username} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default CardFooter;
