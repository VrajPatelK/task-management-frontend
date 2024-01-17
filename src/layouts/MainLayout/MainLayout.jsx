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
          <div className="outlet-div">
            <Outlet />
          </div>
          {/* <div>footer</div> */}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
