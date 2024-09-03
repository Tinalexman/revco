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

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<any>({});

  let fn = async (payload: iLoginPayload, callback?: (value: any) => void) => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await login(payload);
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

export const useRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<any>({});

  let fn = async (payload: iRegisterPayload, callback?: () => void) => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await register(payload);
      setData(response);
      setLoading(false);
      setSuccess(true);
      callback?.();
    } catch (e: any) {
      setSuccess(false);
      setLoading(false);
      callback?.();
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
      toast.success("Password reset code has been sent to your email");
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

export const useResetPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<any>({});

  let fn = async (payload: iResetPayload, callback?: (value: any) => void) => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await resetPassword(payload);
      setData(response);
      setLoading(false);
      setSuccess(true);
      toast.success("Your password has been reset");
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
