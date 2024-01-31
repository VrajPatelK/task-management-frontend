import React, { useState } from "react";
import "./UserPage.css";
import Card from "../../components/Card";
import CardContainer from "../../components/CardContainer";

import { useParams } from "react-router-dom";
import { getUsers } from "../../apis/users";
import { getTasks } from "../../apis/tasks";
import { useQuery } from "@tanstack/react-query";

import MainHeader from "../../components/MainHeader";
import OptionsLayout from "../../layouts/OptionsLayout";
import OptionBtn from "../../components/Options/OptionBtn";
import Pending from "../../components/icons/Pending";
import InProgress from "../../components/icons/InProgress";
import Completed from "../../components/icons/Completed";
import SearchBar from "../../components/SearchBar";
import { active_background } from "../../utils/vars";
import ErrorPage from "../ErrorPages";
import UserInfoCard from "./UserInfoCard";
import Label from "../../components/Labels";
import ContentLoader, { Code, Instagram } from "react-content-loader";

const UserPage = () => {
  const { userId } = useParams();
  var initialQuery = `/users/${userId}`;
  const [query, setQuery] = useState(initialQuery);
  const [status, setStatus] = useState(undefined);

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
    queryFn: () => getTasks(query),
    queryKey: ["tasks", "tasks-user", { userId, query }],
  });

  //
  function filterHandler(filterStatus) {
    setQuery(`/users/${userId}/status/${filterStatus}`);
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
    if (searchquery.length === 0 || !searchquery) {
      setQuery(initialQuery);
    } else {
      setQuery(`/users/${userId}/search/${searchquery}`);
    }
  }

  var userContent = <></>;
  var user = undefined;
  if (userLoader) {
    userContent = <Instagram />;
  } else if (!userLoader && isUserError) {
    return <ErrorPage message={userError.message} status={userError.status} />;
  } else if (!userLoader && !isUserError && userData?.length === 0) {
    userContent = (
      <Label
        message={"not found !"}
        style={{
          background: "#FF9D15",
          border: "2px solid #ff9f1a",

          textTransform: "capitalize",
        }}
      />
    );
  } else {
    user = userData?.at(0);
    userContent = (
      <UserInfoCard
        username={user?.username}
        email={user?.email}
        profile_img={user?.profile_img}
      />
    );
  }

  var taskContent = <></>;
  if (tasksLoader) {
    taskContent = (
      <>
        <Code />
        <Code width={900} />
      </>
    );
  } else if (!tasksLoader && isTasksError) {
    return (
      <ErrorPage message={tasksError.message} status={tasksError.status} />
    );
  } else if (!tasksLoader && !isTasksError && tasksData.length === 0) {
    taskContent = (
      <Label
        message={"tasks do not found !"}
        style={{
          background: "#FF9D15",
          border: "2px solid #ff9f1a",

          textTransform: "capitalize",
        }}
      />
    );
  } else {
    taskContent = tasksData?.map((task) => {
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
    });
    taskContent = <CardContainer>{taskContent}</CardContainer>;
  }

  return (
    <>
      <div className="main-header">
        <MainHeader
          title={
            user ? (
              `${user?.username}'s Task`
            ) : (
              <ContentLoader
                style={{ width: "13rem" }}
                speed={2}
                backgroundColor={"#F4F6FA"}
                foregroundColor={"#999"}
                viewBox="0 0 380 70"
              >
                {/* Only SVG shapes */}
                <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
                <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
              </ContentLoader>
            )
          }
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
        <div className="user-page">
          <div className="user-tasks-layout">
            <div className="user-tasks">{taskContent}</div>
          </div>
          <div className="user-details-layout">
            <div className="user-details">{userContent}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
