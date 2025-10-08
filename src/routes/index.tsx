import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <></>,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
