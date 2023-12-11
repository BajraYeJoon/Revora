import { create } from "zustand";

interface ILoginState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLoginProvider = create<ILoginState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginProvider;
