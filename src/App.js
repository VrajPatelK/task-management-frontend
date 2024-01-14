import "./App.css";
import MainLayout from "./layouts/MainLayout/MainLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

//
const router = createBrowserRouter([
  {
    path: "*",
    element: <MainLayout />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
