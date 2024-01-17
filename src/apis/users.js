import { getToken } from "../utils/utils";

async function getUsers(apiEndPoint) {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/users${apiEndPoint}`,
    {
      headers: {
        token: getToken(),
      },
    }
  );
  const responseData = await response.json();
  return responseData;
}

async function userLogin(body) {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/users/login`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const responseData = await response.json();
  return responseData;
}

export { getUsers, userLogin };
