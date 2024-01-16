import React from "react";
import MainHeader from "../../components/MainHeader/MainHeader";
import { Outlet } from "react-router-dom";

const UsersPageLayout = () => {
  return (
    <>
      <div className="main-header">
        <MainHeader displaySerachbar={true} />
      </div>
      <div className="body">
        <Outlet />
      </div>
    </>
  );
};

export default UsersPageLayout;
