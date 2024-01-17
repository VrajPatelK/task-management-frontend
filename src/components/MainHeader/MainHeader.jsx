import React from "react";
import "./MainHeader.css";
import SearchBar from "../SearchBar/SearchBar";

const MainHeader = ({
  title = "",
  displaySerachbar = false,
  filters = <></>,
}) => {
  return (
    <>
      <div className="row-1">
        {/* page-title */}
        <div className="page-title">{title}</div>

        {/* searchbar */}
        {displaySerachbar && (
          <div className="serach-bar">
            <SearchBar placeholder={"search here..."} />
          </div>
        )}
      </div>
      {/* filters */}
      {filters}
    </>
  );
};

export default MainHeader;
