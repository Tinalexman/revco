import { useState } from "react";

import {
  iGenerateIndividualInvoice,
  iGenerateNonIndividualInvoice,
  generateIndividualInvoice,
  generateNonIndividualInvoice,
  validatePaidInvoice,
  validatePendingInvoice,
  iValidatePendingInvoiceResponse,
  iGenerateInvoiceResponse,
  iValidatePaidInvoiceResponse,
} from "../services/invoiceServices";
import toast from "react-hot-toast";

export const useGenerateIndividualInvoice = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [success, setSuccess] = useState<boolean>(false);

  let generate = async (
    payload: iGenerateIndividualInvoice,
    callback?: (response: iGenerateInvoiceResponse | null) => void
  ) => {
    if (loading) return;
    setLoading(true);

    try {
      const data = await generateIndividualInvoice(payload);
      setData(data);
      setLoading(false);
      setSuccess(true);
      toast.success("Invoice generated successfully");
      if (callback) callback(data);
    } catch (e) {
      setSuccess(false);
      setLoading(false);
      callback?.(null);
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
    callback?: (response: iGenerateInvoiceResponse | null) => void
  ) => {
    if (loading) return;
    setLoading(true);

    try {
      const data = await generateNonIndividualInvoice(payload);
      setData(data);
      setLoading(false);
      setSuccess(true);
      toast.success("Invoice generated successfully");
      callback?.(data);
    } catch (e) {
      setSuccess(false);
      setLoading(false);
      callback?.(null);
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

export const useValidatePaidInvoice = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  let validate = async (
    invoiceNo: string,
    callback?: (receipt: iValidatePaidInvoiceResponse | null) => void
  ) => {
    if (loading) return;
    setLoading(true);

    try {
      const data = await validatePaidInvoice(invoiceNo);
      setLoading(false);
      setSuccess(true);
      callback?.(data);
    } catch (e: any) {
      setSuccess(false);
      setLoading(false);

      let msg = e.response?.data?.data;
      toast.error(msg ?? "Something went wrong. Please try again");
      callback?.(null);
    }
  };

  return {
    loading,
    success,
    validate,
  };
};

export const useValidatePendingInvoice = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<iValidatePendingInvoiceResponse | null>(
    null
  );
  const [success, setSuccess] = useState<boolean>(false);

  let validate = async (
    invoiceNo: string,
    onSuccess?: (data: any) => void,
    onError?: () => void
  ) => {
    if (loading) return;
    setLoading(true);

    try {
      const result = await validatePendingInvoice(invoiceNo);
      setData(result);
      setLoading(false);
      setSuccess(true);
      if (onSuccess) onSuccess(result);
    } catch (e: any) {
      setSuccess(false);
      setLoading(false);

      let msg = e.response?.data?.data;
      if (msg) toast.error(msg);

      if (onError) onError();
    }
  };

  return {
    loading,
    data,
    success,
    validate,
  };
};
