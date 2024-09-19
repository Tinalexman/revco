import axios from "axios";
import { baseUrl } from "./base";

export const getTransactionHistory = async (
  token: string,
  startDate: string,
  endData: string
) => {
  const result = await axios.get(
    `${baseUrl}/notifications/transaction?pageNo=1&pageSize=1000&applyFilter=false&formStartDate=${startDate}&formEndDate=${endData}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return result.data;
};
