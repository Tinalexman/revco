import { baseUrl } from "./base";
import axios from "axios";

export interface iMda {
  abbreviation: string;
  id: number;
  isRetaining: boolean;
  isRetainingByPercentage: boolean;
  lga: string;
  location: string | null;
  mdaCode: string;
  name: string;
  projectName: string;
  retainingValue: number;
  revenueCount: number;
  revenueSum: number;
}

export interface iMdaService {
  amount: number;
  code: string;
  id: number;
  isAssessable: boolean;
  isFixedAmount: boolean;
  isRetaining: boolean;
  isRetainingByPercentage: boolean;
  mdaId: number;
  name: string;
  retainingValue: number;
}

export async function getMDAs() {
  const response = await axios.get(
    `${baseUrl}/self-service/mdas?sortBy=name&clientId=2`
  );
  return response.data.data.data as iMda[];
}

export async function getMDAServices(mdaId: number) {
  const response = await axios.get(
    `${baseUrl}/self-service/mdaservices?sortBy=name&clientId=2&mdaId=${mdaId}`
  );
  return response.data.data.data as iMdaService[];
}
