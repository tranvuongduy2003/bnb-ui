import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  loggedIn: boolean;
  profile: any;
};

type Action = {
  setLoggedIn: (status: boolean) => void;
  setProfile: (profile: any) => void;
  reset: () => void;
};

export const useAuthStore = create(
  persist<State & Action>(
    (set) => ({
      loggedIn: false,
      profile: null,
      setLoggedIn: (status: boolean) => set((state) => ({ loggedIn: status })),
      setProfile: (profile: any) => set((state) => ({ profile: profile })),
      reset: () => set({ profile: null }),
    }),
    {
      name: "auth", // unique name
      storage: createJSONStorage(() => localStorage),
    }
  )
);
