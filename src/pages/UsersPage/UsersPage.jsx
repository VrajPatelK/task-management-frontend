import React from "react";
import "./UsersPage.css";
import UserCard from "../../components/UserCard/UserCard";
import UserCardContainer from "../../components/UserCardContainer/UserCardContainer";
import { getUsers } from "../../apis/users";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const UsersPage = () => {
  const {
    data: usersData,
    isLoading: usersLoader,
    isError: isUsersError,
    error: usersError,
  } = useQuery({
    queryFn: () => getUsers(`/user_type/developer`),
    queryKey: ["users"],
  });

  if (usersLoader) {
    return <div>Loading user data...</div>;
  }
  if (!usersLoader && isUsersError) {
    return <div>{usersError}</div>;
  }
  if (!usersLoader && !isUsersError && usersData.length === 0) {
    return <div>user does not found</div>;
  }

  return (
    <UserCardContainer>
      {usersData.map((user) => {
        return (
          <Link to={`/users/${user.id}`} key={user.id}>
            <UserCard
              email={user.email}
              username={user.username}
              src={user.profile_img}
              user_type={user.user_type}
            />
          </Link>
        );
      })}
    </UserCardContainer>
  );
};

export default UsersPage;
