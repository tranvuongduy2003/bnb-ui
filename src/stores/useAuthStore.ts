import { create } from "zustand";
import { persist, StateStorage, createJSONStorage } from "zustand/middleware";

const hashStorage: StateStorage = {
  getItem: (key): string => {
    const searchParams = new URLSearchParams(location.hash.slice(1));
    const storedValue = searchParams.get(key) ?? "";
    return JSON.parse(storedValue);
  },
  setItem: (key, newValue): void => {
    const searchParams = new URLSearchParams(location.hash.slice(1));
    searchParams.set(key, JSON.stringify(newValue));
    location.hash = searchParams.toString();
  },
  removeItem: (key): void => {
    const searchParams = new URLSearchParams(location.hash.slice(1));
    searchParams.delete(key);
    location.hash = searchParams.toString();
  },
};

type State = {
  token: string;
  profile: any;
};

type Action = {
  setToken: (token: string) => void;
  setProfile: (profile: any) => void;
  resetToken: () => void;
};

export const useAuthStore = create(
  persist<State & Action>(
    (set) => ({
      token: "",
      profile: null,
      setToken: (token: string) => set((state) => ({ token })),
      setProfile: (profile: any) => set((state) => ({ profile })),
      resetToken: () => set({ token: "", profile: null }),
    }),
    {
      name: "auth", // unique name
      storage: createJSONStorage(() => hashStorage),
    }
  )
);
