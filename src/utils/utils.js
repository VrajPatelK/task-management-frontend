import { redirect } from "react-router-dom";

function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("user"));
}
function getToken() {
  return JSON.parse(localStorage.getItem("user"))?.token;
}

function checkSession() {
  return getToken() ? true : false;
}

function isAdmin() {
  return JSON.parse(localStorage.getItem("user"))?.user_type === "admin";
}

function isAuthorized() {
  if (!checkSession() || !isAdmin()) {
    return redirect(`/users/${getLoggedInUser()?.id}`);
  }
  return true;
}

export { getToken, checkSession, getLoggedInUser, isAdmin, isAuthorized };
