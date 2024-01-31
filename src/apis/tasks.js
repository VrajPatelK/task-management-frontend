import { getResponseData, getApiOptions } from "../utils/utils";
const baseUrl = process.env.REACT_APP_SERVER_DOMAIN;

async function getTasks(apiEndPoint) {
  const response = await fetch(
    `${baseUrl}/api/v1/tasks${apiEndPoint}`,
    getApiOptions("GET")
  );
  const responseData = await getResponseData(response);
  return responseData;
}

async function createTask({ body }) {
  const response = await fetch(
    `${baseUrl}/api/v1/tasks/create`,
    getApiOptions("POST", body)
  );
  const responseData = await getResponseData(response);
  return responseData;
}

async function updateTaskStatus({ apiEndPoint, body }) {
  const response = await fetch(
    `${baseUrl}/api/v1/tasks/edit/status${apiEndPoint}`,
    getApiOptions("PUT", body)
  );
  const responseData = await getResponseData(response);
  return responseData;
}

async function deleteTask(apiEndPoint) {
  const response = await fetch(
    `${baseUrl}/api/v1/tasks/delete${apiEndPoint}`,
    getApiOptions("DELETE")
  );
  const responseData = await getResponseData(response);
  return responseData;
}

async function updateTask({ apiEndPoint, body }) {
  const response = await fetch(
    `${baseUrl}/api/v1/tasks/edit${apiEndPoint}`,
    getApiOptions("PUT", body)
  );
  const responseData = await getResponseData(response);
  return responseData;
}

export { createTask, getTasks, updateTaskStatus, deleteTask, updateTask };
