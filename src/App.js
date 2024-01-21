import "./App.css";
import MainLayout from "./layouts/MainLayout/MainLayout";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import TasksPage from "./pages/TasksPage/TasksPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import UserPage from "./pages/UserPage/UserPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/vars";
import AuthenticationPage from "./pages/AuthenticationPage/AuthenticationPage";
import { checkSession, getToken, isAuthorized } from "./utils/utils";
import { redirect } from "react-router-dom";
import ErrorPage from "./pages/ErrorPages/ErrorPage";

function App() {
  //
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Navigate to={"/auth"} />,
        },
        {
          path: "/auth",
          element: <AuthenticationPage />,
          loader: checkSession,
        },
        {
          path: "/tasks",
          element: <TasksPage />,
          loader: isAuthorized,
        },
        {
          path: "/users",
          element: <UsersPage />,
          loader: isAuthorized,
        },
        {
          path: "/users/:userId",
          element: <UserPage />,
          loader: () => {
            const token = getToken();
            if (!token) {
              redirect("/auth");
              return false;
            } else {
              return true;
            }
          },
        },
      ],
    },
    // {
    //   path: "*",
    //   element: <Error404Page />,
    // },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
