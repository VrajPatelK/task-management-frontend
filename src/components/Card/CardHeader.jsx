import React, { useState } from "react";
import Dots3 from "../icons/Dots3";
import OptionsLayout from "../../layouts/OptionsLayout/OptionsLayout";
import Edit from "../icons/Edit";
import Delete from "../icons/Delete";
import OptionBtn from "../Options/OptionBtn";
import { deleteTask } from "../../apis/tasks";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../utils/vars";
import EditTaskModal from "../Modals/EditTaskModal/EditTaskModal";

const CardHeader = ({ taskId, title, assigned_to, displayEditDelete }) => {
  const { mutate } = useMutation({
    mutationFn: deleteTask,
  });

  // handlers
  async function taskDeleteHandler() {
    mutate(`/${taskId}`, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        toast.success("task deleted!");
      },
    });
  }

  // modal states
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <EditTaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        taskId={taskId}
      />
      <div className="card-header">
        <div className="title">{title}</div>
        {displayEditDelete && (
          <div className="button-grp">
            <OptionsLayout title={<Dots3></Dots3>}>
              <OptionBtn style={{ color: "#3742fa" }} onAction={openModal}>
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
    </>
  );
};

export default CardHeader;
