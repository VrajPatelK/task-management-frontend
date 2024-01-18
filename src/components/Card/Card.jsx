import React, { useState } from "react";
import CardLayout from "../../layouts/CardLayout/CardLayout";
import CardHeader from "./CardHeader";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";

import "./Card.css";
import EditTaskModal from "../Modals/EditTaskModal/EditTaskModal";
import { isAdmin } from "../../utils/utils";

const Card = ({
  taskId,
  title,
  description,
  deadline,
  status,
  profile_img,
  assigned_to,
  username,
  displayProfileIcon = true,
  displayEditDelete = true,
}) => {
  // modal states
  const [isEditTaskModalOpen, setEditTaskModalOpen] = useState(false);
  const openEditTaskModal = () => setEditTaskModalOpen(true);
  const closeEditTaskModal = () => setEditTaskModalOpen(false);

  return (
    <>
      {isAdmin() && (
        <EditTaskModal
          isOpen={isEditTaskModalOpen}
          onClose={closeEditTaskModal}
          taskId={taskId}
        />
      )}
      <CardLayout>
        <CardHeader
          taskId={taskId}
          title={title}
          assigned_to={assigned_to}
          displayEditDelete={displayEditDelete}
          openEditTaskModal={openEditTaskModal}
        />
        <CardBody description={description} />
        <CardFooter
          deadline={deadline}
          status={status}
          profile_img={profile_img}
          assigned_to={assigned_to}
          username={username}
          displayProfileIcon={displayProfileIcon}
          taskId={taskId}
        />
      </CardLayout>
    </>
  );
};

export default Card;
