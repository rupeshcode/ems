import { create } from "zustand";
import { createSelectors } from "./create-selectors";

export type User = {
  username: string;
  roleId: number;
  centreType: string;
  fullName: string;
};
export enum ROLE {
  ADMIN = 1,
  AGRI_INPUT_DEALER = 2,
  FIELD_OFFICER = 3,
  FARM_MACHINERY_BANK = 4,
}

type UserState = {
  user?: User;
  setUser: (user: User) => void;
};

const useUserStoreBase = create<UserState>()((set) => ({
  user: undefined,
  setUser: (user: User) => set({ user }),
}));

export const useUserStore = createSelectors(useUserStoreBase);
