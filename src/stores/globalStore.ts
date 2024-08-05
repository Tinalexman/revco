import { create } from "zustand";
import { persist } from "zustand/middleware";

export type tGlobalData = {
  loggedIn: boolean;
  firstName: string;
  lastName: string;
  clear: () => void;
  activeIndex: number;
};

export const useGlobalStore = create<tGlobalData>()(
  persist(
    (set, get) => ({
      loggedIn: false,
      firstName: "Micheal",
      lastName: "Adalikwu",
      clear: () => set({ loggedIn: false }),
      activeIndex: -1,
    }),
    {
      name: "Revco Global Data",
    }
  )
);
