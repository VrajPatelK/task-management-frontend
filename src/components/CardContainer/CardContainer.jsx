import React from "react";
import "./CardContainer.css";
import Card from "../Card/Card";

const CardContainer = ({ children }) => {
  const dummy = [1, 2, 3, 4, 4, 5, 5, 5];

  return (
    <div className="card-container">
      {dummy.map((card, index) => (
        <Card key={index} />
      ))}
    </div>
  );
};

export default CardContainer;
