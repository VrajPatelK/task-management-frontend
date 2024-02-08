import React from "react";
import Logo from "../Logo";

import "./Navbar.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { checkSession, getLoggedInUser, isAdmin } from "../../utils/utils";
import ProfileImg from "../ProfileImg";

import Logout from "../icons/Logout";
import Users from "../icons/Users";
import Tasks from "../icons/Tasks";
import ThemeBadge from "../Badges/ThemeBadge";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedInUser = getLoggedInUser();

  const isActive = (to) => location.pathname.includes(to);
  const isLoggedIn = checkSession();

  return (
    <div className="navbar">
      <div className="logo-div">
        <Logo />
      </div>
      <div className="manubar-layout">
        {isAdmin() && (
          <Link
            className={`menu${isActive("/users") ? " active-menu" : ""}`}
            to={"/users"}
          >
            users
            <Users />
          </Link>
        )}
        {isAdmin() && (
          <Link
            className={`menu${isActive("/tasks") ? " active-menu" : ""}`}
            to={"/tasks"}
          >
            tasks
            <Tasks />
          </Link>
        )}
        {!isLoggedIn && (
          <Link
            className={`menu${isActive("/auth") ? " active-menu" : ""}`}
            to={"/auth"}
          >
            Login
          </Link>
        )}
        {isLoggedIn && (
          <div
            className="menu logout-btn"
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/auth");
            }}
          >
            Logout
            <Logout />
          </div>
        )}
        {isLoggedIn && (
          <div className="navbar-footer">
            <div className=" profile-div">
              <div className="user-info">
                <div className="username">
                  <span>@</span>
                  {loggedInUser?.username}
                </div>
                <ThemeBadge
                  theme={
                    loggedInUser?.user_type === "admin" ? "danger" : "primary"
                  }
                >
                  {loggedInUser?.user_type}
                </ThemeBadge>
              </div>
              <div
                className="img-div"
                onClick={() => navigate(`/users/${loggedInUser?.id}`)}
              >
                <ProfileImg src={loggedInUser?.profile_img} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
