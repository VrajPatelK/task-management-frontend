import React from "react";
import "./UsersPage.css";
import UserCard from "../../components/UserCard/UserCard";
import UserCardContainer from "../../components/UserCardContainer/UserCardContainer";

const UsersPage = () => {
  return (
    <UserCardContainer>
      <UserCard></UserCard>
      <UserCard></UserCard>
      <UserCard></UserCard>
      <UserCard></UserCard>
      <UserCard></UserCard>
      <UserCard></UserCard>
    </UserCardContainer>
  );
};

export default UsersPage;
