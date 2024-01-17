import "./App.css";
import MainLayout from "./layouts/MainLayout/MainLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TasksPage from "./pages/TasksPage/TasksPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import UserPage from "./pages/UserPage/UserPage";
import UsersPageLayout from "./layouts/UsersPageLayout/UsersPageLayout";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/vars";

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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
