import axios from "axios";
import { baseUrl } from "./base";

export const generateTemporaryTIN = async () => {
  const result = await axios.get(`${baseUrl}/self-service/temp-tin?clientId=2`);

  return result.data;
};
