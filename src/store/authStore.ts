import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthData {
  token: string | null;
}

interface AuthState {
  token: string | null;
  userName: string | null;
  data: AuthData;
  setSession: (token: string, userName: string) => void;
  login: (token: string, userName?: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userName: null,
      data: {
        token: null,
      },
      setSession: (token: string, userName: string) =>
        set({
          token,
          userName,
          data: { token },
        }),
      login: (token: string, userName?: string) =>
        set({
          token,
          userName: userName ?? null,
          data: { token },
        }),
      logout: () =>
        set({
          token: null,
          userName: null,
          data: { token: null },
        }),
    }),
    {
      name: "itelect4-auth",
      partialize: (state) => ({
        token: state.token,
        userName: state.userName,
        data: { token: state.token },
      }),
    }
  )
);

export default useAuthStore;
