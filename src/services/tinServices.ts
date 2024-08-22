import axios from "axios";
import { baseUrl } from "./base";

export const generateTemporaryTIN = async () => {
  const result = await axios.get(`${baseUrl}/self-service/temp-tin?count=10`);

  return result.data;
};
