import axios from "axios";
import { baseUrl } from "./base";

export interface iGenerateIndividualInvoice {
  enumerate: {
    title: "string";
    dateOfBirth: "2024-08-22T19:22:31.177Z";
    maritalStatus: "string";
    nationality: "string";
    residenceLga: 0;
    residenceState: 0;
    residentialAddress: "string";
    occupation: "string";
    officeAddress: "string";
    employerName: "string";
    temporaryTin: "string";
    jtbTin: "string";
    nin: "string";
    customer: {
      firstName: "string";
      lastName: "string";
      phone: "string";
      email: "string";
      role: "string";
    };
  };
  invoice: {
    invoiceAmount: 0;
    isAssessment: true;
    assessmentId: 0;
    serviceId: 0;
    businessId: 0;
    mdaId: 0;
    Month: 0;
    year: "string";
    userId: 0;
    month: 0;
    assessment: true;
  };
  projectId: 0;
}

export interface iGenerateNonIndividualInvoice {
  enumerate: {
    cacRegNo: "string";
    companyName: "string";
    companyAddress: "string";
    city: "string";
    lgaId: 0;
    phoneNumber1: "string";
    phoneNumber2: "string";
    email: "string";
    nin: "string";
    website: "string";
    temporaryTin: "string";
    jtbTin: "string";
    companyRegistrationDate: "2024-08-22T19:27:20.979Z";
    companyCommencementDate: "2024-08-22T19:27:20.979Z";
    businessType: "string";
    customer: {
      firstName: "string";
      lastName: "string";
      phone: "string";
      email: "string";
      role: "string";
    };
  };
  invoice: {
    invoiceAmount: 0;
    isAssessment: true;
    assessmentId: 0;
    serviceId: 0;
    businessId: 0;
    mdaId: 0;
    Month: 0;
    year: "string";
    userId: 0;
    month: 0;
    assessment: true;
  };
  projectId: 0;
}

export interface iValidatePaidInvoiceResponse {
  assesedService: string;
  business: string | null;
  businessId: number;
  customerId: number;
  invoiceAmount: number;
  invoiceNo: number;
  mda: string;
  month: number;
  paid: boolean;
  payer: string;
  payerEmail: string;
  payerFirstName: string | null;
  payerLastName: string | null;
  payerPhone: string;
  payerTin: string | null;
  payerType: string | null;
  payment: {
    transactionId: string;
    transactionReference: string;
  }[];
  paymentChannel: string | null;
  serviceId: number;
  tinType: string | null;
  year: string;
}

export interface iValidatePendingInvoiceResponse {
  invoiceNo: string;
  invoiceAmount: number;
  assesedService: string;
  paymentChannel: any | null;
  businessId: number;
  business: any | null;
  serviceId: number;
  mda: string;
  month: number;
  year: string;
  customerId: number;
  payerFirstName: string | null;
  payerLastName: string | null;
  tinType: string | null;
  payment: string | null;
  paid: boolean;
  payer: string;
  payerEmail: string;
  payerPhone: string;
  payerTin: string | null;
  payerType: string | null;
}

export const validatePendingInvoice = async (invoiceNo: string) => {
  const result = await axios.get(
    `${baseUrl}/self-service/invoice/pending?invoiceNo=${invoiceNo}`
  );

  return result.data.data as iValidatePendingInvoiceResponse;
};

export const validatePaidInvoice = async (invoiceNo: string) => {
  const result = await axios.get(
    `${baseUrl}/self-service/invoice/paid?invoiceNo=${invoiceNo}`
  );

  return result.data.data as iValidatePaidInvoiceResponse;
};

export const generateIndividualInvoice = async (
  payload: iGenerateIndividualInvoice
) => {
  const result = await axios.post(
    `${baseUrl}/self-service/generate-invoice/individual`,
    payload
  );

  return result.data;
};

export const generateNonIndividualInvoice = async (
  payload: iGenerateNonIndividualInvoice
) => {
  const result = await axios.post(
    `${baseUrl}/self-service/generate-invoice/nonindividual`,
    payload
  );

  return result.data;
};
