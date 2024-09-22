import { useState } from "react";

import { getTransactionHistory } from "../services/historyServices";
import toast from "react-hot-toast";
import { useUserData } from "../stores/globalStore";

export const useGetTransactionHistory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);

  const get = async (payload: { start: string; end: string }) => {
    if (loading) return;
    setLoading(true);

    try {
      const token = useUserData.getState().token;
      console.log("Token", token);
      const response = await getTransactionHistory(
        token,
        payload.start,
        payload.end
      );
      console.log(response);
      //   setData(response.data);
      setLoading(false);
      setSuccess(true);
      toast.success("Transaction History retrieved");
    } catch (err) {
      setSuccess(false);
      setLoading(false);
      toast.error(
        "Something went wrong while getting your transaction history. Please try again"
      );
    }
  };

  return {
    loading,
    success,
    data,
    get,
  };
};
