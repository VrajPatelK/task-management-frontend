import "./App.css";
import MainLayout from "./layouts/MainLayout/MainLayout";
import { Route, RouterProvider, createBrowserRouter } from "react-router-dom";
import TasksPage from "./pages/TasksPage/TasksPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import UserPage from "./pages/UserPage/UserPage";
import TasksPageLayout from "./layouts/TasksPageLayout/TasksPageLayout";
import UsersPageLayout from "./layouts/UsersPageLayout/UsersPageLayout";

//
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/tasks",
        element: <TasksPageLayout />,
        children: [
          {
            path: "",
            element: <TasksPage />,
          },
        ],
      },
      {
        path: "/users",
        element: <UsersPageLayout />,
        children: [
          {
            path: "",
            element: <UsersPage />,
          },
          {
            path: "/users/:userId",
            element: <UserPage />,
          },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
