import { create } from "zustand";

interface ModalData {
  id: string;
  component: React.ComponentType;
  props?: Record<string, any>;
}

type UiStore = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;

  modals: ModalData[];
  openModal: (
    component: React.ComponentType,
    props?: Record<string, any>
  ) => void;
  closeModal: (id?: string) => void;
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
}));

export default useUiStore;
