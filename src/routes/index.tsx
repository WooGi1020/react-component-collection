import { createBrowserRouter, RouterProvider } from "react-router";
import DefaultLayout from "./layout/DefaultLayout";
import ButtonPage from "./pages/ButtonPage";
import HomePage from "./pages/HomePage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "components/button",
        element: <ButtonPage />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
