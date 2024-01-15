import React, { useEffect, useState } from "react";
import "./UserPage.css";
import ProfileImg from "../../components/ProfileImg/ProfileImg";
import Card from "../../components/Card/Card";
import CardContainer from "../../components/CardContainer/CardContainer";
import Email from "../../components/icons/Email";
import Mobile from "../../components/icons/Mobile";

import { useParams } from "react-router-dom";
import { getTasks, getUsers } from "../../apis/users";

const UserPage = () => {
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [userLoader, setUserLoader] = useState(true);
  const [error, setError] = useState(undefined);

  const [tasks, setTasks] = useState([]);
  const [tasksLoader, setTasksLoader] = useState(true);

  useEffect(() => {
    getUsers(`/${userId}`)
      .then((user) => {
        if (user?.length > 0) setUser(user[0]);
        setUserLoader(false);
      })
      .catch((error) => {
        setError("Client Error : user fetch failure");
        setUserLoader(false);
      });
  }, []);

  useEffect(() => {
    getTasks(`/users/${userId}`)
      .then((tasks) => {
        setTasks(tasks);
        setTasksLoader(false);
      })
      .catch((error) => {
        setError("Client Error : user's task fetch failure");
        setTasksLoader(false);
      });
  }, []);

  if (userLoader) {
    return <div>Loading user data...</div>;
  }
  if (!userLoader && error) {
    return <div>{error}</div>;
  }
  if (!userLoader && !error && !user) {
    return <div>user does not found</div>;
  }
  if (tasksLoader) {
    return <div>Loading user's task data...</div>;
  }
  if (!tasksLoader && error) {
    return <div>{error}</div>;
  }

  var taskContent =
    tasks.length > 0 ? (
      tasks?.map((task) => {
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
