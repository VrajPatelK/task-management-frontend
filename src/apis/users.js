import { getApiOptions, getResponseData } from "../utils/utils";
const baseUrl = process.env.REACT_APP_SERVER_DOMAIN;

async function getUsers(apiEndPoint) {
  const response = await fetch(
    `${baseUrl}/api/v1/users${apiEndPoint}`,
    getApiOptions("GET")
  );
  const responseData = await getResponseData(response);
  return responseData;
}

async function createUser({ body }) {
  const response = await fetch(
    `${baseUrl}/api/v1/users/create`,
    getApiOptions("POST", body)
  );
  const responseData = await getResponseData(response);
  return responseData;
}

async function editUser({ apiEndPoint, body }) {
  const response = await fetch(
    `${baseUrl}/api/v1/users/edit${apiEndPoint}`,
    getApiOptions("PUT", body)
  );
  const responseData = await getResponseData(response);
  return responseData;
}

async function deleteUser(apiEndPoint) {
  const response = await fetch(
    `${baseUrl}/api/v1/users/delete${apiEndPoint}`,
    getApiOptions("DELETE")
  );
  const responseData = await getResponseData(response);
  return responseData;
}

async function userLogin(body) {
  const response = await fetch(`${baseUrl}/api/v1/users/login`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseData = await getResponseData(response);
  return responseData;
}

export { getUsers, userLogin, createUser, editUser, deleteUser };
