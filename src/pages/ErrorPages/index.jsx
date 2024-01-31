import React from "react";
import "./ErrorPage.css";
import { useRouteError } from "react-router-dom";

const ErrorPage = ({ message = undefined, status = undefined }) => {
  const error = useRouteError();
  let em = message;
  let st = status;

  if (error?.status === 404 || status === 404) {
    st = status || error?.status;
    em =
      message || error?.message || error?.statusText || "Something Went Wrong!";
  }

  return (
    <div className="err-page">
      <div className="body">
        <div className="container">
          <h1>{st}</h1>
          <p className="error-code">{em}</p>
          <p>
            Return to <a href="/">Homepage</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
