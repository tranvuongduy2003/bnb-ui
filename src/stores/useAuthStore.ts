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
  profile: any;
};

type Action = {
  setProfile: (profile: any) => void;
  reset: () => void;
};

export const useAuthStore = create(
  persist<State & Action>(
    (set) => ({
      profile: null,
      setProfile: (profile: any) => set((state) => ({ profile })),
      reset: () => set({ profile: null }),
    }),
    {
      name: "auth", // unique name
      storage: createJSONStorage(() => hashStorage),
    }
  )
);
