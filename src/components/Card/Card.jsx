import React from "react";
import CardLayout from "../../layouts/CardLayout/CardLayout";
import CardHeader from "./CardHeader";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";

import "./Card.css";

const Card = () => {
  return (
    <CardLayout>
      <CardHeader></CardHeader>
      <CardBody></CardBody>
      <CardFooter></CardFooter>
    </CardLayout>
  );
};

export default Card;
