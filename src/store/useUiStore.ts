import { create } from "zustand";

interface ModalData {
  id: string;
  component: React.ComponentType;
  props?: Record<string, unknown>;
}

interface ToastData {
  id: string;
  message: string;
  type: "info" | "success" | "error";
  duration?: number;
}

type ToastPlacement =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

type UiStore = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;

  modals: ModalData[];
  openModal: (
    component: React.ComponentType,
    props?: Record<string, unknown>
  ) => void;
  closeModal: (id?: string) => void;

  toasts: ToastData[];
  placement?: ToastPlacement;
  addToast: (
    message: string,
    type?: "info" | "success" | "error",
    placement?: ToastPlacement,
    duration?: number
  ) => void;
  removeToast: (id: string) => void;
};

const useUiStore = create<UiStore>((set) => ({
  isSidebarOpen: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),

  modals: [],
  openModal: (component, props) =>
    set((s) => ({
      modals: [...s.modals, { id: crypto.randomUUID(), component, props }],
    })),
  closeModal: (id) =>
    set((s) => ({
      modals: id ? s.modals.filter((m) => m.id !== id) : s.modals.slice(0, -1),
    })),

  toasts: [],
  addToast: (
    message,
    type = "info",
    placement = "top-right",
    duration = 1000
  ) =>
    set((s) => ({
      toasts: [
        ...s.toasts,
        { id: crypto.randomUUID(), message, type, duration },
      ],
      placement,
    })),
  removeToast: (id) =>
    set((s) => ({
      toasts: s.toasts.filter((t) => t.id !== id),
    })),
}));

export default useUiStore;
