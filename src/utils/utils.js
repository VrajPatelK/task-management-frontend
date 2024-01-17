import { redirect } from "react-router-dom";

function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("user"));
}
function getToken() {
  return JSON.parse(localStorage.getItem("user"))?.token;
}

function isLoggedIn() {
  const token = getToken();
  if (!token) {
    return redirect("/auth");
  }
  return true;
}
function checkSession() {
  return getToken() ? true : false;
}

export { getToken, isLoggedIn, checkSession, getLoggedInUser };
