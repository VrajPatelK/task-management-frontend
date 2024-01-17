import { redirect } from "react-router-dom";

function getToken() {
  return localStorage.getItem("access_token");
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

export { getToken, isLoggedIn, checkSession };
