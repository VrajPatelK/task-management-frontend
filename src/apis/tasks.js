import { getToken } from "../utils/utils";

async function getTasks(apiEndPoint) {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/tasks${apiEndPoint}`,
    {
      headers: {
        token: getToken(),
      },
    }
  );
  const responseData = await response.json();
  return responseData;
}

async function createTask({ body }) {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/tasks/create`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        token: getToken(),
      },
    }
  );
  const responseData = await response.json();
  return responseData;
}

async function updateTaskStatus({ apiEndPoint, body }) {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/tasks/edit/status${apiEndPoint}`,
    {
      body: JSON.stringify(body),
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: getToken(),
      },
    }
  );
  const responseData = await response.json();
  return responseData;
}

async function deleteTask(apiEndPoint) {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/tasks/delete${apiEndPoint}`,
    {
      method: "DELETE",
      headers: {
        token: getToken(),
      },
    }
  );
  const responseData = await response.json();
  return responseData;
}

async function updateTask({ apiEndPoint, body }) {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/tasks/edit${apiEndPoint}`,
    {
      body: JSON.stringify(body),
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: getToken(),
      },
    }
  );
  const responseData = await response.json();
  return responseData;
}

export { createTask, getTasks, updateTaskStatus, deleteTask, updateTask };
