import React from "react";
import "./MainLayout.css";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <>
      <Toaster />
      <div className="main-layout">
        <div className="navbar-sidebar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
        <div className="footer">footer</div>
      </div>
    </>
  );
};

export default MainLayout;
