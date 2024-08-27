import {
  getMDAs,
  getMDAServices,
  iMda,
  iMdaService,
} from "../services/mdaServices";
import { useState, useEffect } from "react";

export const useGetMDAs = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<iMda[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  let get = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await getMDAs();
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

export const useGetMDAServices = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<iMdaService[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  let get = async (mdaId: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await getMDAServices(mdaId);
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
