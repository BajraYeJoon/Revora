import { create } from "zustand";

interface IRegisterState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegisterProvider = create<IRegisterState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterProvider;
