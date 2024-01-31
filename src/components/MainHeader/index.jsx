import React from "react";
import "./MainHeader.css";

const MainHeader = ({
  title = "",
  displayCreateBtn = false,
  onMoment = () => {},
  btnTxt = "",
  filters = <></>,
  searchBar = <></>,
}) => {
  return (
    <>
      <div className="row-1">
        {/* page-title */}
        <div className="title-div">
          <div className="page-title">{title}</div>
          {displayCreateBtn && (
            <button type="button" onClick={() => onMoment()}>
              {btnTxt}
            </button>
          )}
        </div>

        {/* searchbar */}
        {searchBar}
      </div>
      {/* filters */}
      {filters}
    </>
  );
};

export default MainHeader;
