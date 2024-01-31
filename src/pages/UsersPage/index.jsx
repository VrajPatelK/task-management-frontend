import React, { useState } from "react";
import "./UsersPage.css";
import UserCard from "../../components/UserCard";
import UserCardContainer from "../../components/UserCardContainer";
import { getUsers } from "../../apis/users";
import { useQuery } from "@tanstack/react-query";
import MainHeader from "../../components/MainHeader";
import SearchBar from "../../components/SearchBar";
import CreateUser from "../../components/icons/CreateUser";
import CreateUserModal from "../../components/Modals/CreateUserModal";
import Label from "../../components/Labels";
import ErrorPage from "../ErrorPages";
import { Code } from "react-content-loader";

const UsersPage = () => {
  var initialQuery = "/user_type/developer";
  const [query, setQuery] = useState(initialQuery);
  // modal states
  const [isCreateUserModalOpen, setCreateUserModalOpen] = useState(false);
  const openCreateUserModal = () => setCreateUserModalOpen(true);
  const closeCreateUserModal = () => setCreateUserModalOpen(false);

  const {
    data: usersData,
    isLoading: usersLoader,
    isError: isUsersError,
    error: usersError,
  } = useQuery({
    queryFn: () => getUsers(query),
    queryKey: ["users", { query }],
  });

  var usersContent = <></>;

  if (usersLoader) {
    usersContent = (
      <>
        <Code />
        <Code width={1100} />
      </>
    );
  } else if (!usersLoader && isUsersError) {
    return (
      <ErrorPage message={usersError.message} status={usersError.status} />
    );
  } else if (!usersLoader && !isUsersError && usersData.length === 0) {
    usersContent = (
      <Label
        message={"users do not found !"}
        style={{
          background: "#FF9D15",
          border: "2px solid #ff9f1a",

          textTransform: "capitalize",
        }}
      />
    );
  } else {
    usersContent = usersData.map((user) => {
      return (
        <UserCard
          key={user.id}
          userId={user.id}
          email={user.email}
          username={user.username}
          src={user.profile_img}
          user_type={user.user_type}
        />
      );
    });
    usersContent = <UserCardContainer>{usersContent}</UserCardContainer>;
  }

  //
  function searchHandler(searchquery = "") {
    if (searchquery.length === 0 || !searchquery) {
      setQuery(initialQuery);
    } else {
      setQuery(`/search/${searchquery}`);
    }
  }

  return (
    <>
      <CreateUserModal
        isOpen={isCreateUserModalOpen}
        onClose={closeCreateUserModal}
      />
      <div className="main-header">
        <MainHeader
          title="Users"
          displayCreateBtn={true}
          btnTxt={
            <>
              <CreateUser /> create
            </>
          }
          onMoment={() => openCreateUserModal()}
          displaySerachbar={true}
          searchBar={
            <div className="serach-bar">
              <SearchBar
                placeholder={"username / email..."}
                onSearch={searchHandler}
              />
            </div>
          }
        />
      </div>
      <div className="body">{usersContent}</div>
    </>
  );
};

export default UsersPage;
