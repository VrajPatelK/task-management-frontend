import React from "react";
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
  queryClient,
} from "../../utils/vars";
import { updateTaskStatus } from "../../apis/tasks";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

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
  var statusProperty = { color: "gray", icon: "" };
  if (status === "pending") {
    statusProperty = forPeding;
  } else if (status === "in-progress") {
    statusProperty = forInProgress;
  } else if (status === "completed") {
    statusProperty = forCompleted;
  }

  // date formation
  var formatedDate = moment(deadline).format("D-MM-YYYY");

  // use mutation
  const { mutate } = useMutation({
    mutationFn: updateTaskStatus,
    onError: (error) => toast.error("updatation of status of task is failed!"),
  });

  // handlers
  async function changeStatusHandler(updatedStatus) {
    mutate(
      { apiEndPoint: `/${taskId}`, body: { status: updatedStatus } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["tasks"] });
          if (updatedStatus === "pending") {
            statusProperty = forPeding;
          } else if (updatedStatus === "in-progress") {
            statusProperty = forInProgress;
          } else if (updatedStatus === "completed") {
            statusProperty = forCompleted;
          }
          toast.success("status updated!");
        },
      }
    );
  }

  return (
    <div className="card-footer">
      <OptionsLayout
        title={
          <SmallBadge
            style={{
              color: statusProperty.color,
            }}
          >
            {statusProperty.icon}
          </SmallBadge>
        }
      >
        <OptionBtn
          style={{
            color: "#3742fa",
            background: status === "pending" && active_background,
          }}
          onAction={() => changeStatusHandler("pending")}
        >
          pending
          {<Pending />}
        </OptionBtn>
        <OptionBtn
          style={{
            color: "#ffa502",
            background: status === "in-progress" && active_background,
          }}
          onAction={() => changeStatusHandler("in-progress")}
        >
          in progress
          <InProgress />
        </OptionBtn>
        <OptionBtn
          style={{
            color: "#2ed573",
            background: status === "completed" && active_background,
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
