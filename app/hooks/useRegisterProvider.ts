import { createStore } from "zustand";

interface IRegisterState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegisterProvider = createStore<IRegisterState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterProvider;
