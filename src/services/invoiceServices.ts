import axios from "axios";
import { baseUrl } from "./base";

export interface iGenerateIndividualInvoice {
  enumerate: {
    title: string;
    dateOfBirth: string;
    maritalStatus: string;
    nationality: string;
    residenceLga: number;
    residenceState: number;
    residentialAddress: string;
    occupation: string;
    officeAddress: string;
    employerName: string;
    temporaryTin: string;
    jtbTin: string;
    nin: string;
    customer: {
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
      role: string;
    };
  };
  invoice: {
    invoiceAmount: number;
    isAssessment: boolean;
    assessmentId: number;
    serviceId: number;
    businessId: number;
    mdaId: number;
    Month: number;
    year: string;
    userId: number;
    month: number;
    assessment: boolean;
  };
  projectId: number;
}

export interface iGenerateNonIndividualInvoice {
  enumerate: {
    cacRegNo: string;
    companyName: string;
    companyAddress: string;
    city: string;
    lgaId: number;
    phoneNumber1: string;
    phoneNumber2: string;
    email: string;
    nin: string;
    website: string;
    temporaryTin: string;
    jtbTin: string;
    companyRegistrationDate: string;
    companyCommencementDate: string;
    businessType: string;
    customer: {
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
      role: string;
    };
  };
  invoice: {
    invoiceAmount: number;
    isAssessment: boolean;
    assessmentId: number;
    serviceId: number;
    businessId: number;
    mdaId: number;
    Month: number;
    year: string;
    userId: number;
    month: number;
    assessment: boolean;
  };
  projectId: number;
}

export interface iValidatePaidInvoiceResponse {
  invoiceNo: string;
  invoiceAmount: number;
  assesedService: string;
  paymentChannel: any;
  businessId: number;
  business: any;
  serviceId: number;
  mda: string;
  month: number;
  year: string;
  customerId: number;
  payerFirstName: any;
  payerLastName: any;
  tinType: any;
  payerId: string;
  payment: {
    transactionId: string;
    transactionReference: string;
    transactionDate: string;
    transactionDescription: string;
    totalAmountPaid: number;
    serviceAmount: number;
    fee: number;
    commission: number;
    channel: string;
    customerName: string;
    customerPhone: string;
    customerEmail: any;
    terminalId: any;
    pan: any;
    mdaId: number;
    mdaName: string;
    mdaOfficeId: number;
    mdaOfficeName: string;
    project: string;
    individualPayerTempTin: any;
    individualPayerJtbTin: any;
    corporatePayerTempTin: string;
    corporatePayerJtbTin: any;
    agentId: number;
    agentName: string;
    payerId: number;
    cashTransactionId: any;
  }[];
  payerTin: any;
  payer: string;
  payerEmail: string;
  payerPhone: string;
  payerType: any;
  paid: boolean;
}

export interface iValidatePendingInvoiceResponse {
  invoiceNo: string;
  invoiceAmount: number;
  assesedService: string;
  paymentChannel: any;
  businessId: number;
  business: any;
  serviceId: number;
  mda: string;
  month: number;
  year: string;
  customerId: number;
  payerFirstName: any;
  payerLastName: any;
  tinType: any;
  payment: any;
  paid: boolean;
  payer: string;
  payerId: any;
  payerEmail: string;
  payerPhone: string;
  payerTin: any;
  payerType: any;
}

export interface iGenerateInvoiceResponse {
  invoiceNo: string;
  invoiceAmount: number;
  assesedService: string;
  paymentChannel: any;
  businessId: number;
  business: any;
  serviceId: number;
  mda: string;
  month: number;
  year: string;
  customerId: number;
  payerFirstName: any;
  payerLastName: any;
  tinType: any;
  payerId: string | null;
  payerTin: string | null;
  payer: any;
  payerEmail: string;
  payerPhone: string;
  payerType: any;
  paid: boolean;
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

  return result.data.data as iGenerateInvoiceResponse;
};

export const generateNonIndividualInvoice = async (
  payload: iGenerateNonIndividualInvoice
) => {
  const result = await axios.post(
    `${baseUrl}/self-service/generate-invoice/nonindividual`,
    payload
  );

  return result.data.data as iGenerateInvoiceResponse;
};
