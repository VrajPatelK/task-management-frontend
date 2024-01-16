import React from "react";
import "./TasksPage.css";
import Card from "../../components/Card/Card";
import CardContainer from "../../components/CardContainer/CardContainer";
import { getTasks } from "../../apis/tasks";
import { useQuery } from "@tanstack/react-query";

const TasksPage = () => {
  const {
    data: tasks,
    isPending,
    isError,
    error,
  } = useQuery({
    queryFn: () => getTasks("/"),
    queryKey: ["tasks"],
  });

  if (isPending) {
    return <div>Loading tasks data...</div>;
  }
  if (!isPending && isError) {
    return <div>{error}</div>;
  }
  if (!isPending && !isError && tasks.length === 0) {
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
