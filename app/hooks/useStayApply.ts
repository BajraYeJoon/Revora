import { create } from "zustand";

interface IVacationStayState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useStayApply = create<IVacationStayState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useStayApply;
