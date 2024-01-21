import React from "react";
import Logo from "../Logo/Logo";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { checkSession, getLoggedInUser, isAdmin } from "../../utils/utils";
import ProfileImg from "../ProfileImg/ProfileImg";

import Logout from "../icons/Logout";
import Users from "../icons/Users";
import Tasks from "../icons/Tasks";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedInUser = getLoggedInUser();
  const color =
    loggedInUser?.user_type === "admin"
      ? "rgb(252, 48, 48)"
      : "rgb(103 255 106)";

  const isActive = (to) => location.pathname.includes(to);

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
        {!checkSession() && (
          <Link
            className={`menu${isActive("/auth") ? " active-menu" : ""}`}
            to={"/auth"}
          >
            Login
          </Link>
        )}
        {checkSession() && (
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
        {checkSession() && (
          <div className="navbar-footer">
            <div className=" profile-div">
              <div className="user-info">
                <div className="username">
                  <span style={{ color: "gray", marginRight: ".1rem" }}>@</span>
                  {loggedInUser?.username}
                </div>
                <div
                  className="role"
                  style={{ color, border: `2px solid ${color}` }}
                >
                  {loggedInUser?.user_type}
                </div>
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
