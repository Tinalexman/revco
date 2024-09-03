import {
  login,
  register,
  resetPassword,
  iLoginPayload,
  iRegisterPayload,
  iResetPayload,
} from "../services/authServices";
import { useState, useEffect } from "react";

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<any>({});

  let fn = async (payload: iLoginPayload) => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await login(payload);
      setData(response);
      setLoading(false);
      setSuccess(true);
    } catch (e) {
      setSuccess(false);
      setLoading(false);
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
    } catch (e) {
      setSuccess(false);
      setLoading(false);
    }
  };

  return {
    loading,
    success,
    data,
    fn,
  };
};
