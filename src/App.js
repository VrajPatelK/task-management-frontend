import "./App.css";
import MainLayout from "./layouts/MainLayout/MainLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TasksPage from "./pages/TasksPage/TasksPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import UserPage from "./pages/UserPage/UserPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/vars";
import AuthenticationPage from "./pages/AuthenticationPage/AuthenticationPage";
import { checkSession, isLoggedIn } from "./utils/utils";

//
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/auth",
        element: <AuthenticationPage />,
        loader: checkSession,
      },
      {
        path: "/tasks",
        element: <TasksPage />,
        loader: isLoggedIn,
      },
      {
        path: "/users",
        element: <UsersPage />,
        loader: isLoggedIn,
      },
      {
        path: "/users/:userId",
        element: <UserPage />,
        loader: isLoggedIn,
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
