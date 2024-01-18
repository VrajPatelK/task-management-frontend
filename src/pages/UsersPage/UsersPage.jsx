import React, { useState } from "react";
import "./UsersPage.css";
import UserCard from "../../components/UserCard/UserCard";
import UserCardContainer from "../../components/UserCardContainer/UserCardContainer";
import { getUsers } from "../../apis/users";
import { useQuery } from "@tanstack/react-query";
import MainHeader from "../../components/MainHeader/MainHeader";
import SearchBar from "../../components/SearchBar/SearchBar";
import CreateUser from "../../components/icons/CreateUser";
import CreateUserModal from "../../components/Modals/CreateUserModal/CreateUserModal";

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
    isUsersError: isUsersError,
    usersError: usersError,
  } = useQuery({
    queryFn: () => getUsers(query),
    queryKey: ["users", { query }],
  });

  var usersContent = <></>;

  if (usersLoader) {
    usersContent = <div>Loading users data...</div>;
  } else if (!usersLoader && isUsersError) {
    usersContent = <div>{usersError}</div>;
  } else if (!usersLoader && !isUsersError && usersData.length === 0) {
    usersContent = <div>usersData are not found</div>;
  } else {
    usersContent =
      usersData.length > 0 ? (
        usersData.map((user) => {
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
        })
      ) : (
        <div>any single user doesn't create</div>
      );
  }

  if (usersLoader) {
    return <div>Loading user data...</div>;
  }
  if (!usersLoader && isUsersError) {
    return <div>{usersError}</div>;
  }
  if (!usersLoader && !isUsersError && usersData.length === 0) {
    return <div>user does not found</div>;
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
          onMoment={() => {
            openCreateUserModal();
            console.log("on moment at users page:)");
          }}
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
      <div className="body">
        <UserCardContainer>{usersContent}</UserCardContainer>
      </div>
    </>
  );
};

export default UsersPage;
