import React, { useState } from "react";
import moment from "moment";
import ProfileImg from "../ProfileImg/ProfileImg";
import OptionsLayout from "../../layouts/OptionsLayout/OptionsLayout";
import Pending from "../icons/Pending";
import InProgress from "../icons/InProgress";
import Completed from "../icons/Completed";
import OptionBtn from "../Options/OptionBtn";
import { Link } from "react-router-dom";
import SmallBadge from "../Badges/SmallBadge";
import {
  forCompleted,
  forInProgress,
  forPeding,
  active_background,
} from "../../utils/vars";
import { updateTaskStatus } from "../../apis/tasks";
import toast from "react-hot-toast";

const CardFooter = ({
  taskId,
  status,
  deadline,
  profile_img,
  username,
  assigned_to,
  displayProfileIcon,
}) => {
  // state
  var initial_state = { name: status, color: "gray", icon: "" };
  if (status === "pending") {
    initial_state = forPeding;
  } else if (status === "in-progress") {
    initial_state = forInProgress;
  } else if (status === "completed") {
    initial_state = forCompleted;
  }
  const [taskStatus, setTaskStatus] = useState(initial_state);

  // date formation
  var formatedDate = moment(deadline).format("D-MM-YYYY");

  // handlers
  async function changeStatusHandler(updatedStatus) {
    await updateTaskStatus(`/${taskId}`, {
      status: updatedStatus,
    });
    if (updatedStatus === "pending") {
      setTaskStatus(forPeding);
    } else if (updatedStatus === "in-progress") {
      setTaskStatus(forInProgress);
    } else if (updatedStatus === "completed") {
      setTaskStatus(forCompleted);
    }
    toast.success("status updated!");
  }

  return (
    <div className="card-footer">
      <OptionsLayout
        title={
          <SmallBadge
            style={{
              color: taskStatus.color,
            }}
          >
            {taskStatus.icon}
          </SmallBadge>
        }
      >
        <OptionBtn
          style={{
            color: "#3742fa",
            background: taskStatus.name === "pending" && active_background,
          }}
          onAction={() => changeStatusHandler("pending")}
        >
          pending
          {<Pending />}
        </OptionBtn>
        <OptionBtn
          style={{
            color: "#ffa502",
            background: taskStatus.name === "in-progress" && active_background,
          }}
          onAction={() => changeStatusHandler("in-progress")}
        >
          in progress
          <InProgress />
        </OptionBtn>
        <OptionBtn
          style={{
            color: "#2ed573",
            background: taskStatus.name === "completed" && active_background,
          }}
          onAction={() => changeStatusHandler("completed")}
        >
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
