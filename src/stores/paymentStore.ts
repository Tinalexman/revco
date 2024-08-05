import { create } from "zustand";

export type tPaymentData = {
  target: string;
  fullName: string;
  email: string;
  tin: string;
  phoneNumber: string;
  state: string;
  lga: string;
  address: string;
  amount: number;
  curreny: string;
};
