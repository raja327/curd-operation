import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Form from "./Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./ui/Home";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import TableBootstrap from "./ui/TableBoostrap";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-up",
        element: <Form />,
        errorElement: <Error />,
      },
      {
        path: "/table",
        element: <TableBootstrap />,
        errorElement: <Error />,
      },
    ],
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
