import React from "react";
import Dots3 from "../icons/Dots3";
import OptionsLayout from "../../layouts/OptionsLayout/OptionsLayout";
import Edit from "../icons/Edit";
import Delete from "../icons/Delete";
import OptionBtn from "../Options/OptionBtn";
import { deleteTask } from "../../apis/tasks";
import toast from "react-hot-toast";

const CardHeader = ({ taskId, title, assigned_to, displayEditDelete }) => {
  // handlers
  async function taskDeleteHandler() {
    await deleteTask(`/${taskId}`);
    toast.success("task deleted!");
  }

  return (
    <div className="card-header">
      <div className="title">{title}</div>
      {displayEditDelete && (
        <div className="button-grp">
          <OptionsLayout title={<Dots3></Dots3>}>
            <OptionBtn
              style={{ color: "#3742fa" }}
              onAction={() => {
                console.log(`edit : ${assigned_to}`);
              }}
            >
              Edit
              <Edit />
            </OptionBtn>
            <OptionBtn
              style={{ color: "#ff4757" }}
              onAction={taskDeleteHandler}
            >
              Delete
              <Delete />
            </OptionBtn>
          </OptionsLayout>
        </div>
      )}
    </div>
  );
};

export default CardHeader;
