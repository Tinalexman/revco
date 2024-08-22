import { useState } from "react";

import { generateTemporaryTIN } from "../services/tinServices";
import toast from "react-hot-toast";

export const useGenerateTemporaryTIN = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [success, setSuccess] = useState<boolean>(false);

  let generate = async (callback?: () => void) => {
    if (loading) return;
    setLoading(true);

    try {
      const data = await generateTemporaryTIN();
      setData(data);
      setLoading(false);
      setSuccess(true);
      toast.success("Temporary TIN generated successfully");
      if (callback) callback();
    } catch (e) {
      setSuccess(false);
      setLoading(false);
      toast.error(
        "Something went wrong while generating your temporary TIN. Please try again"
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
