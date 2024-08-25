import {
  getStates,
  getLGAs,
  iLocationResponse,
} from "../services/locationServices";
import { useState, useEffect } from "react";

export const useGetStates = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<iLocationResponse[]>([]);
  const [success, setSuccess] = useState<boolean>(false);

  let get = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await getStates();
      setData(response);
      setLoading(false);
      setSuccess(true);
    } catch (e) {
      setSuccess(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    get();
  }, []);

  return {
    loading,
    data,
    success,
  };
};

export const useGetLGAs = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<iLocationResponse[]>([]);
  const [success, setSuccess] = useState<boolean>(false);

  let get = async (StateId: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await getLGAs(StateId);
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
    data,
    success,
    get,
  };
};
