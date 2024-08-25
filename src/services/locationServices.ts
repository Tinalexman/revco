import { baseUrl } from "./base";

import axios from "axios";

export interface iLocationResponse {
  id: number;
  name: string;
}

export async function getStates() {
  const response = await axios.get(`${baseUrl}/self-service/state`);
  return response.data.data as iLocationResponse[];
}

export async function getLGAs(StateId: number) {
  const response = await axios.get(
    `${baseUrl}/self-service/lga?StateId=${StateId}`
  );
  return response.data.data as iLocationResponse[];
}
