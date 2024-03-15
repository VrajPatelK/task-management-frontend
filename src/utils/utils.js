import { redirect } from "react-router-dom";

function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("user"));
}
function getToken() {
  return JSON.parse(localStorage.getItem("user"))?.token;
}

function checkSession() {
  let token = getToken();
  return (
    typeof token === "string" &&
    token.length >= 50 &&
    token.split(".").length === 3 &&
    Boolean(token)
  );
}

function isAdmin() {
  return JSON.parse(localStorage.getItem("user"))?.user_type === "admin";
}

function isAuthorized() {
  if (!checkSession() || !isAdmin()) {
    const userId = getLoggedInUser()?.id;
    return redirect(`/users/${userId}`);
  }
  return true;
}

function loadUserPage(params) {
  const token = getToken();
  if (!token) {
    redirect("/auth");
    return false;
  } else {
    return true;
  }
}

async function getResponseData(response) {
  const responseData = await response.json();
  if (!response.ok) {
    const error = new Error();
    error.message = responseData.message;
    error.status = response.status;
    error.errorMessage = responseData.errorMessage;
    throw error;
  }
  return responseData;
}

function getApiOptions(method, body = {}) {
  const apiOptions = {
    method,
    headers: {
      token: getToken(),
    },
  };

  if (method === "POST" || method === "PUT") {
    apiOptions.body = JSON.stringify(body);
    apiOptions.headers["Content-Type"] = "application/json";
  }
  return apiOptions;
}

export {
  getToken,
  checkSession,
  getLoggedInUser,
  isAdmin,
  isAuthorized,
  loadUserPage,
  getResponseData,
  getApiOptions,
};
