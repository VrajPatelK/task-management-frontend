import React from "react";
import "./Loader.css";

import loader from "../../assets/loader.gif";

const Loader = ({ style = {} }) => {
  return (
    <div className="loader">
      <img src={loader} alt="loading..." style={style} />
    </div>
  );
};

export default Loader;
