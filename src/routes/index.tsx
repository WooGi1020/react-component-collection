import { createBrowserRouter, RouterProvider } from "react-router";
import DefaultLayout from "./layout/DefaultLayout";
import ButtonPage from "./pages/ButtonPage";
import HomePage from "./pages/HomePage";
import SliderPage from "./pages/SliderPage";
import ModalPage from "./pages/ModalPage";
import ImageUploaderPage from "./pages/ImageUploaderPage";
import PaginationPage from "./pages/PaginationPage";
import InputPage from "./pages/InputPage";
import PopoverPage from "./pages/PopoverPage";
import SelectPage from "./pages/SelectPage";

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
      {
        path: "forms/input",
        element: <InputPage />,
      },
      {
        path: "components/popover",
        element: <PopoverPage />,
      },
      {
        path: "forms/select",
        element: <SelectPage />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
