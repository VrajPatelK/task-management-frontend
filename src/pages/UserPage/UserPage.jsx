import React from "react";
import "./UserPage.css";
import ProfileImg from "../../components/ProfileImg/ProfileImg";
import Card from "../../components/Card/Card";
import CardContainer from "../../components/CardContainer/CardContainer";
import Email from "../../components/icons/Email";
import Mobile from "../../components/icons/Mobile";

import { useParams } from "react-router-dom";
import { getUsers } from "../../apis/users";
import { getTasks } from "../../apis/tasks";
import { useQuery } from "@tanstack/react-query";

const UserPage = () => {
  const { userId } = useParams();

  const {
    data: userData,
    isLoading: userLoader,
    isError: isUserError,
    error: userError,
  } = useQuery({
    queryFn: () => getUsers(`/${userId}`),
    queryKey: ["users", { userId }],
  });

  const {
    data: tasksData,
    isLoading: tasksLoader,
    isError: isTasksError,
    error: tasksError,
  } = useQuery({
    queryFn: () => getTasks(`/users/${userId}`),
    queryKey: ["tasks", "tasks-user", { userId }],
  });

  if (userLoader) {
    return <div>Loading user data...</div>;
  }
  if (!userLoader && isUserError) {
    return <div>{userError}</div>;
  }
  if (!userLoader && !isUserError && userData.length === 0) {
    return <div>user does not found</div>;
  }
  if (tasksLoader) {
    return <div>Loading user's task data...</div>;
  }
  if (!tasksLoader && isTasksError) {
    return <div>{tasksError.message}</div>;
  }

  var user = userData?.at(0);

  var taskContent =
    tasksData.length > 0 ? (
      tasksData?.map((task) => {
        return (
          <Card
            key={task.id}
            taskId={task.id}
            title={task.title}
            description={task.description}
            profile_img={task.profile_img}
            status={task.status}
            deadline={task.deadline}
            assigned_to={task.assigned_to}
            username={task.username}
            displayProfileIcon={false}
            displayEditDelete={false}
          />
        );
      })
    ) : (
      <div>any single task doesn't assign</div>
    );

  return (
    <div className="user-page">
      <div className="user-tasks-layout">
        <div className="user-tasks">
          <CardContainer>{taskContent}</CardContainer>
        </div>
      </div>
      <div className="user-details-layout">
        <div className="user-details">
          <div className="user-row-1">
            <ProfileImg alt={user?.username} src={user?.profile_img} />
          </div>
          <div className="user-row-2">
            <div className="user-username">
              <span style={{ marginRight: ".2rem" }}>@</span>
              <i>{user?.username}</i>
            </div>
            <div className="user-edit-btn">edit-btn</div>
          </div>
          <div className="user-row-3">
            <div className="user-contact-info">contact information</div>
            <div className="user-email">
              <Email /> <span>{user?.email}</span>
            </div>
            <div className="user-email">
              <Mobile /> <span> xxxxxyyyyy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
