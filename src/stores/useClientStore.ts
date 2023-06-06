import { IUser } from "@/interfaces/IUser";
import { create } from "zustand";

type State = {
  clients: IUser[];
  filteredClients: IUser[];
};

type Action = {
  setClients: (clients: IUser[]) => void;
  setFilteredClients: (clients: IUser[]) => void;
};

export const useClientStore = create<State & Action>((set) => ({
  clients: [],
  filteredClients: [],
  setClients: (clients: IUser[]) => set(() => ({ clients: [...clients] })),
  setFilteredClients: (clients: IUser[]) =>
    set(() => ({ filteredClients: [...clients] })),
}));
