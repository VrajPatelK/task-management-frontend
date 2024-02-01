import React, { useState } from "react";
import "./TasksPage.css";
import Card from "../../components/Card";
import CardContainer from "../../components/CardContainer";
import { getTasks } from "../../apis/tasks";
import { useQuery } from "@tanstack/react-query";
import MainHeader from "../../components/MainHeader";

import OptionBtn from "../../components/Options/OptionBtn";
import OptionsLayout from "../../layouts/OptionsLayout";
import Pending from "../../components/icons/Pending";
import InProgress from "../../components/icons/InProgress";
import Completed from "../../components/icons/Completed";
import SearchBar from "../../components/SearchBar";
import CreateTask from "../../components/icons/CreateTask";
import CreateTaskModal from "../../components/Modals/CreateTaskModal";
import ErrorPage from "../ErrorPages";
import { Code } from "react-content-loader";

const TasksPage = () => {
  var initialQuery = "/";
  const [query, setQuery] = useState(initialQuery);
  const [status, setStatus] = useState(undefined);

  const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const openCreateTaskModal = () => setCreateTaskModalOpen(true);
  const closeCreateTaskModal = () => setCreateTaskModalOpen(false);

  const {
    data: tasks,
    isPending,
    isError,
    error,
  } = useQuery({
    queryFn: () => getTasks(query),
    queryKey: ["tasks", { query }],
  });

  var taskContent = <></>;

  if (isPending) {
    taskContent = (
      <>
        <Code />
        <Code width={900} />
      </>
    );
  } else if (!isPending && isError) {
    return <ErrorPage message={error.message} status={error.status} />;
  } else if (!isPending && !isError && tasks?.length === 0) {
    taskContent = <div>tasks are not found</div>;
  } else {
    taskContent = tasks?.map((task) => {
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
    });
    taskContent = <CardContainer>{taskContent}</CardContainer>;
  }
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

  //
  function searchHandler(searchquery = "") {
    filterCleanup();
    if (searchquery?.length === 0 || !searchquery) {
      setQuery(initialQuery);
    } else {
      setQuery(`/search/${searchquery}`);
    }
  }

  return (
    <>
      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onClose={closeCreateTaskModal}
      />
      <div className="main-header">
        <MainHeader
          title="Tasks"
          displayCreateBtn={true}
          btnTxt={
            <>
              <CreateTask /> create
            </>
          }
          onMoment={() => openCreateTaskModal()}
          searchBar={
            <div className="serach-bar">
              <SearchBar
                placeholder={"title / description..."}
                onSearch={searchHandler}
              />
            </div>
          }
          filters={
            <div className="filters">
              <div className="dropdown-div">
                <OptionsLayout
                  title={"status"}
                  title_style={{ backgroundColor: "rgb(149 175 192 / 15%)" }}
                >
                  <OptionBtn
                    className={`pending-option ${
                      status === "pending" && "active-background"
                    }`}
                    onAction={() => {
                      filterHandler("pending");
                    }}
                  >
                    pending
                    <Pending />
                  </OptionBtn>
                  <OptionBtn
                    className={`in-progress-option ${
                      status === "in-progress" && "active-background"
                    }`}
                    onAction={() => {
                      filterHandler("in-progress");
                    }}
                  >
                    in progress
                    <InProgress />
                  </OptionBtn>
                  <OptionBtn
                    className={`completed-option ${
                      status === "completed" && "active-background"
                    }`}
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
      <div className="body">{taskContent}</div>
    </>
  );
};

export default TasksPage;
