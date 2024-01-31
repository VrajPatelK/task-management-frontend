import React from "react";
import loader from "../../assets/loader.gif";

const Loader = ({ style = {} }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={loader}
        alt="loading..."
        style={{
          borderRadius: "50%",
          width: "8rem",
          position: "absolute",
          top: "50%",
          left: "50%",
          zIndex: 50,
          ...style,
        }}
      />
    </div>
  );
};

export default Loader;
