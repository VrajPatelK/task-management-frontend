import React from "react";
import "./MainHeader.css";
import OptionBtn from "../Options/OptionBtn";
import OptionsLayout from "../../layouts/OptionsLayout/OptionsLayout";
import Pending from "../icons/Pending";
import InProgress from "../icons/InProgress";
import Completed from "../icons/Completed";
import DownArrow from "../icons/DownArrow";
import UpArrow from "../icons/UpArrow";
import SearchBar from "../SearchBar/SearchBar";

const MainHeader = () => {
  return (
    <>
      <div className="row-1">
        {/* page-title */}
        <div className="page-title">page-title</div>

        {/* searchbar */}
        <div className="serach-bar">
          <SearchBar placeholder={"search here..."} />
        </div>
      </div>

      {/* filters */}
      <div className="filters">
        <div className="dropdown-div">
          <OptionsLayout
            title={"status"}
            title_style={{
              fontSize: "1.1rem",
              background: "rgb(149 175 192 / 15%)",
              padding: ".3rem",
              paddingInline: "1rem",
              borderRadius: ".2rem",
              marginBottom: ".1rem",
              color: "#4834d4",
            }}
          >
            <OptionBtn style={{ color: "#3742fa" }} onAction={() => {}}>
              pending
              <Pending />
            </OptionBtn>
            <OptionBtn style={{ color: "#ffa502" }} onAction={() => {}}>
              in progress
              <InProgress />
            </OptionBtn>
            <OptionBtn style={{ color: "#2ed573" }} onAction={() => {}}>
              completed
              <Completed />
            </OptionBtn>
          </OptionsLayout>
        </div>
        <div className="dropdown-div">
          <OptionsLayout
            title={"deadline"}
            title_style={{
              fontSize: "1.1rem",
              background: "rgb(149 175 192 / 15%)",
              padding: ".3rem",
              paddingInline: "1rem",
              borderRadius: ".2rem",
              marginBottom: ".1rem",
              color: "#4834d4",
            }}
          >
            <OptionBtn onAction={() => {}}>
              ascending
              <UpArrow />
            </OptionBtn>
            <OptionBtn onAction={() => {}}>
              descending
              <DownArrow />
            </OptionBtn>
          </OptionsLayout>
        </div>
      </div>
    </>
  );
};

export default MainHeader;
