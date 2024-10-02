import { useState } from "react";

import { getTransactionHistory } from "../services/historyServices";
import toast from "react-hot-toast";
import { useUserData } from "../stores/globalStore";

export interface iTransactionData {
  agentId: number;
  agentName: any;
  cashTransactionId: any;
  channel: string;
  commission: number;
  corporatePayerJtbTin: any;
  corporatePayerTempTin: any;
  customerEmail: any;
  customerName: any;
  customerPhone: any;
  fee: number;
  individualPayerJtbTin: any;
  individualPayerTempTin: any;
  mdaId: number;
  mdaName: any;
  mdaOfficeId: number;
  mdaOfficeName: any;
  pan: any;
  payerId: number;
  project: any;
  serviceAmount: number;
  terminalId: any;
  totalAmountPaid: number;
  transactionDate: string;
  transactionDescription: any;
  transactionId: string;
  transactionReference: string;
}

export const useGetTransactionHistory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iTransactionData[]>([]);

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
      setData(response.data.data as iTransactionData[]);
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
