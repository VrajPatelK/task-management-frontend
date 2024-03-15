import { Navigate, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPages";
import AuthenticationPage from "../pages/AuthenticationPage";
import TasksPage from "../pages/TasksPage";
import UsersPage from "../pages/UsersPage";
import UserPage from "../pages/UserPage";
import { checkSession, isAuthorized, loadUserPage } from "./utils";

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
        loader: loadUserPage,
      },
    ],
  },
  // {
  //   path: "*",
  //   element: <Error404Page />,
  // },
]);

export default router;
