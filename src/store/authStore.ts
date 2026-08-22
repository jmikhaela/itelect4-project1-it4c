import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthData {
  token: string | null;
}

interface AuthState {
  data: AuthData;
  login: (token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      data: {
        token: null,
      },

      login: (token: string) => {
        set({
          data: {
            token,
          },
        });
      },

      logout: () => {
        set({
          data: {
            token: null,
          },
        });
      },
    }),
    {
      name: "peer-tutoring-auth",

      partialize: (state) => ({
        data: state.data,
      }),
    }
  )
);

export default useAuthStore;