import { createBrowserRouter, RouterProvider } from "react-router";
import DefaultLayout from "./layout/DefaultLayout";
import ButtonPage from "./pages/ButtonPage";
import HomePage from "./pages/HomePage";
import SliderPage from "./pages/SliderPage";
import ModalPage from "./pages/ModalPage";
import ImageUploaderPage from "./pages/ImageUploaderPage";
import PaginationPage from "./pages/PaginationPage";
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
      {
        path: "components/slider",
        element: <SliderPage />,
      },
      {
        path: "components/modal",
        element: <ModalPage />,
      },
      {
        path: "components/image-uploader",
        element: <ImageUploaderPage />,
      },
      {
        path: "components/pagination",
        element: <PaginationPage />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
