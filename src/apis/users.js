async function getUsers(apiEndPoint) {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/users${apiEndPoint}`,
    {
      headers: {
        authCookie:
          "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJlbHZpc2hAZXhhbXBsZS5jb20iLCJ1c2VybmFtZSI6ImVsdmlzaCIsInBhc3N3b3JkIjoiJDJhJDEwJFpxQjRMUGVVd0xrOWsxaWovZG9mYXV2WjJaSGY5RFpsaG91MTJ4U3pNUlVJekxtSUx2czBxIiwidXNlcl90eXBlIjoiYWRtaW4iLCJwcm9maWxlX2ltZyI6Imh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvdGFzay1tYW5hZ2VtZW50LWZiYjY0LmFwcHNwb3QuY29tL28vcHJvZmlsZV9pbWFnZXMlMkZkZWZhdWx0LXByb2ZpbGUtaW1nLnBuZz9hbHQ9bWVkaWEmdG9rZW49ZGJhYjIyZWUtMTNmZS00YjgwLWI3YTUtNzIwOTk0NGE3NzVhIiwiaWF0IjoxNzA1MDczMjQ3fQ.fWtdhNUFNy49m8ZfeutJtzOKXcoXVe5H-sJpo3v_bmE; HttpOnly",
      },
    }
  );
  const responseData = await response.json();
  return responseData;
}

async function getTasks(apiEndPoint) {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/tasks${apiEndPoint}`,
    {
      headers: {
        authCookie:
          "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJlbHZpc2hAZXhhbXBsZS5jb20iLCJ1c2VybmFtZSI6ImVsdmlzaCIsInBhc3N3b3JkIjoiJDJhJDEwJFpxQjRMUGVVd0xrOWsxaWovZG9mYXV2WjJaSGY5RFpsaG91MTJ4U3pNUlVJekxtSUx2czBxIiwidXNlcl90eXBlIjoiYWRtaW4iLCJwcm9maWxlX2ltZyI6Imh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvdGFzay1tYW5hZ2VtZW50LWZiYjY0LmFwcHNwb3QuY29tL28vcHJvZmlsZV9pbWFnZXMlMkZkZWZhdWx0LXByb2ZpbGUtaW1nLnBuZz9hbHQ9bWVkaWEmdG9rZW49ZGJhYjIyZWUtMTNmZS00YjgwLWI3YTUtNzIwOTk0NGE3NzVhIiwiaWF0IjoxNzA1MDczMjQ3fQ.fWtdhNUFNy49m8ZfeutJtzOKXcoXVe5H-sJpo3v_bmE; HttpOnly",
      },
    }
  );
  const responseData = await response.json();
  return responseData;
}

export { getUsers, getTasks };
