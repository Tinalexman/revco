import { baseUrl } from "./base";
import axios from "axios";

export async function getMDAs() {
  const response = await axios.get(`${baseUrl}/self-service/mdas`);
  return response.data.data;
}

export async function getMDAServices(mdaId: number) {
  const response = await axios.get(
    `${baseUrl}/self-service/mdaservices?mdaId=${mdaId}`
  );
  return response.data.data;
}
