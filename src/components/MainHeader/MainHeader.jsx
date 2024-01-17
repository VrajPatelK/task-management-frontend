import React from "react";
import "./MainHeader.css";
import SearchBar from "../SearchBar/SearchBar";

const MainHeader = ({
  title = "",
  displaySerachbar = false,
  filters = <></>,
  searchBar = <></>,
}) => {
  return (
    <>
      <div className="row-1">
        {/* page-title */}
        <div className="page-title">{title}</div>

        {/* searchbar */}
        {searchBar}
      </div>
      {/* filters */}
      {filters}
    </>
  );
};

export default MainHeader;
