import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./routes";
import ToastRoot from "./components/Toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router />
    <ToastRoot />
  </StrictMode>
);
