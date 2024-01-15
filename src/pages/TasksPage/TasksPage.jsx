import React, { useEffect, useState } from "react";
import "./TasksPage.css";
import Card from "../../components/Card/Card";
import CardContainer from "../../components/CardContainer/CardContainer";
import { getTasks } from "../../apis/tasks";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    getTasks("/")
      .then((tasks) => {
        setTasks(tasks);
        setLoader(false);
      })
      .catch((error) => {
        setError("Client Error : tasks fetch failure");
        setLoader(false);
      });
  }, []);

  if (loader) {
    return <div>Loading tasks data...</div>;
  }
  if (!loader && error) {
    return <div>{error}</div>;
  }
  if (!loader && !error && tasks.length === 0) {
    return <div>tasks are not found</div>;
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

  return <CardContainer>{taskContent}</CardContainer>;
};

export default TasksPage;
