import React from "react";
import Description from "../Description/Description";

const CardBody = ({ description }) => {
  return (
    <div className="card-body">
      <Description>{description}</Description>
    </div>
  );
};

export default CardBody;
