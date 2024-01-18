import React, { useState } from "react";
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
import MainHeader from "../../components/MainHeader/MainHeader";
import OptionsLayout from "../../layouts/OptionsLayout/OptionsLayout";
import OptionBtn from "../../components/Options/OptionBtn";
import Pending from "../../components/icons/Pending";
import InProgress from "../../components/icons/InProgress";
import Completed from "../../components/icons/Completed";
import SearchBar from "../../components/SearchBar/SearchBar";
import { active_background } from "../../utils/vars";

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

  if (userLoader) {
    return <div>Loading user data...</div>;
  }
  if (!userLoader && isUserError) {
    return <div>{userError}</div>;
  }
  if (!userLoader && !isUserError && userData.length === 0) {
    return <div>user does not found</div>;
  }
  var user = userData?.at(0);

  if (tasksLoader) {
    return <div>Loading user's task data...</div>;
  }
  if (!tasksLoader && isTasksError) {
    return <div>{tasksError.message}</div>;
  }

  var taskContent = <></>;
  if (tasksLoader) {
    taskContent = <div>Loading users's tasks data...</div>;
  } else if (!tasksLoader && isTasksError) {
    taskContent = <div>{tasksError.message}</div>;
  } else if (!tasksLoader && !isTasksError && tasksData.length === 0) {
    taskContent = <div>tasks are not found for this user</div>;
  } else {
    taskContent =
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
  }

  return (
    <>
      <div className="main-header">
        <MainHeader
          title={`${user?.username}'s Task`}
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
            <div className="user-tasks">
              <CardContainer>{taskContent}</CardContainer>
            </div>
          </div>
          <div className="user-details-layout">
            {!user && (
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1.2rem",
                  textTransform: "capitalize",
                }}
              >
                user doesn't found
              </div>
            )}
            {user && (
              <div className="user-details">
                <div className="user-row-1">
                  <ProfileImg alt={user?.username} src={user?.profile_img} />
                </div>
                <div className="user-row-2">
                  <div className="user-username">
                    <span style={{ marginRight: ".2rem" }}>@</span>
                    <i>{user?.username}</i>
                  </div>
                </div>
                <div className="user-row-3">
                  <div className="user-contact-info">contact information</div>
                  <div className="user-email">
                    <Email /> <span>{user?.email}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
