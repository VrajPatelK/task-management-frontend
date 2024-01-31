import React, { useEffect } from "react";
import "./AuthenticationPage.css";
import AuthenticationForm from "../../components/AuthenticationForm";
import AuthenticationLayout from "../../layouts/AuthenticationLayout";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../../utils/utils";

const AuthenticationPage = () => {
  const navigate = useNavigate();

  const alreadyLoggedIn = useLoaderData();
  useEffect(() => {
    const userId = getLoggedInUser()?.id;
    if (alreadyLoggedIn) {
      navigate(`/users/${userId}`);
    }
  }, [alreadyLoggedIn, navigate]);

  return (
    <AuthenticationLayout>
      <AuthenticationForm />
    </AuthenticationLayout>
  );
};

export default AuthenticationPage;
