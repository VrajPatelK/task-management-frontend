import React from "react";

const SmallBadge = ({ children, style = {} }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        columnGap: ".2rem",
        border: `1px solid ${style.color ? style.color : "black"}`,
        padding: ".2rem .5rem",
        borderRadius: ".5rem",
        background: "#F4F6FA",
        fontSize: ".8rem",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default SmallBadge;
