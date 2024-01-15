import React from "react";
import "./MainLayout.css";
import Navbar from "../../components/Navbar/Navbar";
import MainHeader from "../../components/MainHeader/MainHeader";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <div className="navbar-sidebar">
        <Navbar />
      </div>
      <div className="main-header">
        <MainHeader />
      </div>
      <div className="body">
        <Outlet />
      </div>
      <div className="footer">footer</div>
    </div>
  );
};

export default MainLayout;
