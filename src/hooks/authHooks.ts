import toast from "react-hot-toast";
import {
  login,
  register,
  resetPassword,
  iLoginPayload,
  iRegisterPayload,
  iResetPayload,
  forgotPassword,
} from "../services/authServices";
import { useState, useEffect } from "react";
import { tUser, useUserData } from "../stores/globalStore";

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  let fn = async (payload: iLoginPayload) => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await login(payload);
      let loginResponse = response.data as tUser;
      useUserData.setState({ ...loginResponse });

      toast.success(`Welcome back, ${loginResponse.lastName}`);

      setLoading(false);
      setSuccess(true);
    } catch (e: any) {
      setSuccess(false);
      setLoading(false);
      toast.error(`${e.response.data.data}`);
    }
  };

  return {
    loading,
    success,
    fn,
  };
};

export const useRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<string>("");

  let fn = async (payload: iRegisterPayload) => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await register(payload);
      setData(payload.email);
      setLoading(false);
      setSuccess(true);
      toast.success(`Account created successfully`);
    } catch (e: any) {
      setSuccess(false);
      setLoading(false);
      toast.error(`${e.response.data.data}`);
    }
  };

  return {
    loading,
    success,
    data,
    fn,
  };
};

export const useForgotPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<any>({});

  let fn = async (email: string, callback?: (value: any) => void) => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await forgotPassword(email);
      setData(response);
      setLoading(false);
      setSuccess(true);
      callback?.(response);
    } catch (e: any) {
      setSuccess(false);
      setLoading(false);
      callback?.(null);
      toast.error(`${e.response.data.data}`);
    }
  };

  return {
    loading,
    success,
    data,
    fn,
  };
};
