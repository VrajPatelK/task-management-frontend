import React from "react";
import Dots3 from "../icons/Dots3";
import OptionsLayout from "../../layouts/OptionsLayout/OptionsLayout";
import Edit from "../icons/Edit";
import Delete from "../icons/Delete";
import OptionBtn from "../Options/OptionBtn";

const CardHeader = () => {
  return (
    <div className="card-header">
      <div className="title">Task Title</div>
      <div className="button-grp">
        <OptionsLayout title={<Dots3></Dots3>}>
          <OptionBtn style={{ color: "#3742fa" }} onAction={() => {}}>
            Edit
            <Edit />
          </OptionBtn>
          <OptionBtn style={{ color: "#ff4757" }} onAction={() => {}}>
            Delete
            <Delete />
          </OptionBtn>
        </OptionsLayout>
      </div>
    </div>
  );
};

export default CardHeader;
