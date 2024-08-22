import { useState } from "react";

import {
  iGenerateIndividualInvoice,
  iGenerateNonIndividualInvoice,
  generateIndividualInvoice,
  generateNonIndividualInvoice,
} from "../services/invoiceServices";
import toast from "react-hot-toast";

export const useGenerateIndividualInvoice = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [success, setSuccess] = useState<boolean>(false);

  let generate = async (
    payload: iGenerateIndividualInvoice,
    callback?: () => void
  ) => {
    if (loading) return;
    setLoading(true);

    try {
      const data = await generateIndividualInvoice(payload);
      setData(data);
      setLoading(false);
      setSuccess(true);
      toast.success("Invoice generated successfully");
      if (callback) callback();
    } catch (e) {
      setSuccess(false);
      setLoading(false);
      toast.error(
        "Something went wrong while generating your invoice. Please try again"
      );
    }
  };

  return {
    loading,
    data,
    success,
    generate,
  };
};

export const useGenerateNonIndividualInvoice = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [success, setSuccess] = useState<boolean>(false);

  let generate = async (
    payload: iGenerateNonIndividualInvoice,
    callback?: () => void
  ) => {
    if (loading) return;
    setLoading(true);

    try {
      const data = await generateNonIndividualInvoice(payload);
      setData(data);
      setLoading(false);
      setSuccess(true);
      toast.success("Invoice generated successfully");
      if (callback) callback();
    } catch (e) {
      setSuccess(false);
      setLoading(false);
      toast.error(
        "Something went wrong while generating your invoice. Please try again"
      );
    }
  };

  return {
    loading,
    data,
    success,
    generate,
  };
};
