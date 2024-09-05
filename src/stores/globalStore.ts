import { create } from "zustand";
import { persist } from "zustand/middleware";

export type tUser = {
  firstName: string;
  lastName: string;
  otherNames: string | null;
  email: string;
  phone: string;
  createdDate: string;
  lastUpdatedDate: string;
  role: "Individual" | "Non-Individual";
  lastLoginDate: string;
  token: string;
  mda: any;
  project: string;
  projectPaymentChannels: string[];
  isDefaultPass: boolean;
  isEnumerated: boolean;
  isRemittanceLogin: boolean;
  loggedIn: boolean;

  clear: () => void;
};

export const useUserData = create<tUser>()(
  persist(
    (set, get) => ({
      firstName: "",
      lastName: "",
      otherNames: null,
      email: "",
      phone: "",
      createdDate: "",
      lastUpdatedDate: "",
      role: "Individual",
      lastLoginDate: "",
      token: "",
      mda: null,
      project: "",
      projectPaymentChannels: [],
      isDefaultPass: false,
      isEnumerated: false,
      isRemittanceLogin: false,
      loggedIn: false,
      clear: () =>
        set({
          firstName: "",
          lastName: "",
          otherNames: null,
          email: "",
          phone: "",
          createdDate: "",
          lastUpdatedDate: "",
          role: "Individual",
          lastLoginDate: "",
          token: "",
          mda: null,
          project: "",
          projectPaymentChannels: [],
          isDefaultPass: false,
          isEnumerated: false,
          isRemittanceLogin: false,
          loggedIn: false,
        }),
    }),
    {
      name: "revco-user",
    }
  )
);
