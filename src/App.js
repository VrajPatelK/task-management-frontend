import "./App.css";
import MainLayout from "./layouts/MainLayout/MainLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TasksPage from "./pages/TasksPage/TasksPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import UserPage from "./pages/UserPage/UserPage";

//
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/tasks",
        element: <TasksPage />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/users/:userId",
        element: <UserPage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
