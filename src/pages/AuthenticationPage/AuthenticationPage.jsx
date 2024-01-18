import React, { useEffect } from "react";
import "./AuthenticationPage.css";
import AuthenticationForm from "../../components/AuthenticationForm/AuthenticationForm";
import AuthenticationLayout from "../../layouts/AuthenticationLayout/AuthenticationLayout";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../../utils/utils";

const AuthenticationPage = () => {
  const navigate = useNavigate();

  const alreadyLoggedIn = useLoaderData();
  useEffect(() => {
    if (alreadyLoggedIn) {
      navigate(`/users/${getLoggedInUser()?.id}`);
    }
  }, []);

  // console.log(data);
  return (
    <AuthenticationLayout>
      <AuthenticationForm />
    </AuthenticationLayout>
  );
};

export default AuthenticationPage;
