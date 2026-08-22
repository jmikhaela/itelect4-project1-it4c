import { create } from "zustand";

interface UIStore {
  darkMode: boolean;
  toggleTheme: () => void;
}

const useUIStore = create<UIStore>((set) => ({
  darkMode: localStorage.getItem("theme") === "dark",

  toggleTheme: () => {
    set((state: UIStore) => ({
      darkMode: !state.darkMode,
    }));
  },
}));

export default useUIStore;