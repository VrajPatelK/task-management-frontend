import React, { useEffect, useState } from "react";
import "./UsersPage.css";
import UserCard from "../../components/UserCard/UserCard";
import UserCardContainer from "../../components/UserCardContainer/UserCardContainer";
import { getUsers } from "../../apis/users";
import { Link } from "react-router-dom";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    getUsers("/user_type/developer")
      .then((users) => {
        setUsers(users);
        setLoader(false);
      })
      .catch((error) => {
        setError("Client Error : users fetch failure");
        setLoader(false);
      });
  }, []);

  if (loader) {
    return <div>Loading users data...</div>;
  }
  if (!loader && error) {
    return <div>{error}</div>;
  }
  if (!loader && !error && users.length === 0) {
    return <div>users are not found</div>;
  }

  return (
    <UserCardContainer>
      {users.map((user) => {
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
