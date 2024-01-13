import React from "react";
import Dots_3 from "../icons/Dots3";

const CardHeader = () => {
  return (
    <div className="card-header">
      <div className="title">Task Title</div>
      <div className="button-grp">
        <button className="rmv-btn-css">
          <Dots_3 />
        </button>
      </div>
    </div>
  );
};

export default CardHeader;
