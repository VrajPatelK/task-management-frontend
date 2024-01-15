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
}) => {
  return (
    <CardLayout>
      <CardHeader title={title} assigned_to={assigned_to} />
      <CardBody description={description} />
      <CardFooter
        deadline={deadline}
        status={status}
        profile_img={profile_img}
        assigned_to={assigned_to}
        username={username}
      />
    </CardLayout>
  );
};

export default Card;
