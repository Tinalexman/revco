import { useState } from "react";

import { generateTemporaryTIN } from "../services/tinServices";
import toast from "react-hot-toast";

export const useCheckout = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  let generate = async (callback?: (id?: string) => void) => {
    if (loading) return;
    setLoading(true);

    try {
      const data = await generateTemporaryTIN();

      setLoading(false);
      setSuccess(true);
      if (callback) callback(data.data);
    } catch (e) {
      setSuccess(false);
      setLoading(false);
      toast.error(
        "Something went wrong while generating your temporary Payer ID. Please try again"
      );
      if (callback) callback();
    }
  };

  return {
    loading,
    success,
    generate,
  };
};
