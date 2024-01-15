import React from "react";
import CardLayout from "../../layouts/CardLayout/CardLayout";
import CardHeader from "./CardHeader";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";

import "./Card.css";

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
  return (
    <CardLayout>
      <CardHeader
        title={title}
        assigned_to={assigned_to}
        displayEditDelete={displayEditDelete}
      />
      <CardBody description={description} />
      <CardFooter
        deadline={deadline}
        status={status}
        profile_img={profile_img}
        assigned_to={assigned_to}
        username={username}
        displayProfileIcon={displayProfileIcon}
      />
    </CardLayout>
  );
};

export default Card;
