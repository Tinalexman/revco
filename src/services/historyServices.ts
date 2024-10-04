import axios from "axios";
import { baseUrl } from "./base";

export const getTransactionHistory = async (
  token: string,
  startDate: string,
  endData: string
) => {
  const result = await axios.get(
    `${baseUrl}/enroll/list-invoices?sortBy=id&pageNo=1&pageSize=1000&formStartDate=${startDate}&formEndDate=${endData}&search=%20`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return result.data;
};
