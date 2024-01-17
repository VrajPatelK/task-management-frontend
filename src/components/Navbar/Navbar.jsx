import React from "react";
import Logo from "../Logo/Logo";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { checkSession } from "../../utils/utils";
import ProfileImg from "../ProfileImg/ProfileImg";

import Logout from "../icons/Logout";
import Users from "../icons/Users";
import Tasks from "../icons/Tasks";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (to) => location.pathname.includes(to);

  return (
    <div className="navbar">
      <div className="logo-div">
        <Logo />
      </div>
      <div className="manubar-layout">
        {checkSession() && (
          <Link
            className={`menu${isActive("/users") ? " active-menu" : ""}`}
            to={"/users"}
          >
            users
            <Users />
          </Link>
        )}
        {checkSession() && (
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
              localStorage.removeItem("access_token");
              navigate("/auth");
            }}
          >
            Logout
            <Logout />
          </div>
        )}
        {checkSession() && (
          <div className="navbar-footer">
            <div
              className=" profile-div"
              onClick={() => {
                localStorage.removeItem("access_token");
                navigate("/auth");
              }}
            >
              <div className="user-info">
                <div className="username">usernamw</div>
                <div className="role">admin</div>
              </div>
              <div className="img-div">
                <ProfileImg
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/task-management-fbb64.appspot.com/o/profile_images%2Fdefault-profile-img.png?alt=media&token=dbab22ee-13fe-4b80-b7a5-7209944a775a"
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
