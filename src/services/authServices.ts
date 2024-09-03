import axios from "axios";
import { baseUrl } from "./base";

export interface iLoginPayload {
  username: string;
  password: string;
}

export interface iRegisterPayload {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
  createdBy: number;
  role: string;
  project: {
    projectId: number;
  };
}

export interface iResetPayload {
  code: string;
  password: string;
}

export async function login(payload: iLoginPayload) {
  const result = await axios.post(`${baseUrl}/auth/login`, payload);
  return result.data;
}

export async function register(payload: iRegisterPayload) {
  const result = await axios.post(`${baseUrl}/auth/register`, payload);
  return result.data;
}

export async function resetPassword(code: string, password: string) {
  const result = await axios.post(
    `${baseUrl}/auth/resetpassword?resetCode=${code}&password=${password}`
  );
  return result.data;
}
