import { useState } from "react";

import { getTransactionHistory } from "../services/historyServices";
import toast from "react-hot-toast";
import { useUserData } from "../stores/globalStore";
import { iGenerateInvoiceResponse } from "../services/invoiceServices";

// Payer first name and payerlast name is valid

export const useGetTransactionHistory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iGenerateInvoiceResponse[]>([]);

  const get = async (payload: { start: string; end: string }) => {
    if (loading) return;
    setLoading(true);

    try {
      const token = useUserData.getState().token;
      const response = await getTransactionHistory(
        token,
        payload.start,
        payload.end
      );
      setData(response.data.data as iGenerateInvoiceResponse[]);
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
