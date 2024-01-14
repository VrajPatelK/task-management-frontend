import React from "react";
import "./MainLayout.css";
import Navbar from "../../components/Navbar/Navbar";
import MainHeader from "../../components/MainHeader/MainHeader";
import CardContainer from "../../components/CardContainer/CardContainer";
import Card from "../../components/Card/Card";

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
        <CardContainer>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </CardContainer>
      </div>
      <div className="footer">footer</div>
    </div>
  );
};

export default MainLayout;
