import React from "react";
import "./Error404Page.css";
const Error404Page = () => {
  return (
    <div className="body">
      <div className="container">
        <h1>404</h1>
        <p className="error-code">Page Not Found</p>
        <p>Oops! It seems like the page you are looking for does not exist.</p>
        <p>
          Return to <a href="/">Homepage</a>
        </p>
      </div>
    </div>
  );
};

export default Error404Page;
