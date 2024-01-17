import React, { useState } from "react";
import "./TasksPage.css";
import Card from "../../components/Card/Card";
import CardContainer from "../../components/CardContainer/CardContainer";
import { getTasks } from "../../apis/tasks";
import { useQuery } from "@tanstack/react-query";
import MainHeader from "../../components/MainHeader/MainHeader";

import OptionBtn from "../../components/Options/OptionBtn";
import OptionsLayout from "../../layouts/OptionsLayout/OptionsLayout";
import Pending from "../../components/icons/Pending";
import InProgress from "../../components/icons/InProgress";
import Completed from "../../components/icons/Completed";
import { active_background } from "../../utils/vars";
// import DownArrow from "../../components/icons/DropArrow";
// import UpArrow from "../../components/icons/UpArrow";

const TasksPage = () => {
  var initialQuery = "/";
  const [query, setQuery] = useState(initialQuery);
  const [status, setStatus] = useState(undefined);

  const {
    data: tasks,
    isPending,
    isError,
    error,
  } = useQuery({
    queryFn: () => getTasks(query),
    queryKey: ["tasks", { query }],
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

  //
  function filterHandler(filterStatus) {
    setQuery(`/status/${filterStatus}`);
    setStatus(filterStatus);
  }

  //
  function filterCleanup() {
    setQuery(initialQuery);
    setStatus(undefined);
  }
  return (
    <>
      <div className="main-header">
        <MainHeader
          title="Tasks"
          displaySerachbar={true}
          filters={
            <div className="filters">
              <div className="dropdown-div">
                <OptionsLayout
                  title={"status"}
                  title_style={{
                    fontSize: "1.1rem",
                    background: "rgb(149 175 192 / 15%)",
                    padding: ".3rem",
                    paddingInline: "1rem",
                    borderRadius: ".2rem",
                    marginBottom: ".1rem",
                    color: "#4834d4",
                  }}
                >
                  <OptionBtn
                    style={{
                      color: "#3742fa",
                      background: status === "pending" && active_background,
                    }}
                    onAction={() => {
                      filterHandler("pending");
                    }}
                  >
                    pending
                    <Pending />
                  </OptionBtn>
                  <OptionBtn
                    style={{
                      color: "#ffa502",
                      background: status === "in-progress" && active_background,
                    }}
                    onAction={() => {
                      filterHandler("in-progress");
                    }}
                  >
                    in progress
                    <InProgress />
                  </OptionBtn>
                  <OptionBtn
                    style={{
                      color: "#2ed573",
                      background: status === "completed" && active_background,
                    }}
                    onAction={() => {
                      filterHandler("completed");
                    }}
                  >
                    completed
                    <Completed />
                  </OptionBtn>
                </OptionsLayout>
              </div>
              {status && (
                <div className="cancel-btn" onClick={filterCleanup}>
                  clear
                </div>
              )}
            </div>
          }
        />
      </div>
      <div className="body">
        <CardContainer>{taskContent}</CardContainer>
      </div>
    </>
  );
};

export default TasksPage;
