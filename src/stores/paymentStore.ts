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

export const PAYMENT_KEY: string = "Revco_Payment_Key";

export type tProcessPayment = {
  tin: string;
  amount: number;
  target: string;
  name: string;
  ref: string;
  payerID: string;
  pin: string;
};
