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
  email: string;
  password: string;
  passwordConfirmation: string;
  role: string;
  project: {
    projectId: number;
  };
}

export interface iResetPayload {
  resetCode: string;
  email: string;
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

export async function resetPassword(payload: iResetPayload) {
  const result = await axios.post(`${baseUrl}/auth/resetpassword`, payload);
  return result.data;
}

export async function forgotPassword(email: string) {
  const result = await axios.post(`${baseUrl}/auth/forgotpassword`, { email });
  return result.data;
}
