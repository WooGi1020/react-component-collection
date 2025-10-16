import useUiStore from "@/store/useUiStore";
import { AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import ToastItem from "./ToastItem";

const placementClasses: Record<string, string> = {
  "top-left": "top-4 left-4",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "top-center": "top-4 left-1/2 transform -translate-x-1/2",
  "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
};

export default function ToastRoot() {
  const toasts = useUiStore((s) => s.toasts);
  const placement = useUiStore((s) => s.placement || "top-right");
  const removeToast = useUiStore((s) => s.removeToast);

  return createPortal(
    <div
      className={`fixed ${placementClasses[placement]} flex flex-col gap-2 z-50`}
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            duration={toast.duration!}
            onClose={() => removeToast(toast.id)}
            {...toast}
          />
        ))}
      </AnimatePresence>
    </div>,
    document.getElementById("modal-root")!
  );
}
