import { TokenPayload } from "@/interfaces/IAuth";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  token: TokenPayload;
  loggedIn: boolean;
  profile: any;
};

type Action = {
  setToken: (token: TokenPayload) => void;
  setLoggedIn: (status: boolean) => void;
  setProfile: (profile: any) => void;
  reset: () => void;
};

const initState: State = {
  token: {
    accessToken: "",
    refreshToken: "",
  },
  loggedIn: false,
  profile: null,
};

export const useAuthStore = create(
  persist<State & Action>(
    (set) => ({
      ...initState,
      setToken: (token: TokenPayload) => set((state) => ({ token })),
      setLoggedIn: (status: boolean) => set((state) => ({ loggedIn: status })),
      setProfile: (profile: any) =>
        set((state) => ({ profile: { ...profile } })),
      reset: () => set({ ...initState }),
    }),
    {
      name: "auth", // unique name
      storage: createJSONStorage(() => localStorage),
    }
  )
);
