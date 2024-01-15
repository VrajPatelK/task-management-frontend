import React from "react";
import Logo from "../Logo/Logo";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (to) => location.pathname.includes(to);

  return (
    <div className="navbar">
      <div className="logo-div">
        <Logo />
      </div>
      <div className="manubar-layout">
        <Link
          className={`menu${isActive("/users") ? " active-menu" : ""}`}
          to={"/users"}
        >
          users
        </Link>
        <Link
          className={`menu${isActive("/tasks") ? " active-menu" : ""}`}
          to={"/tasks"}
        >
          tasks
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
