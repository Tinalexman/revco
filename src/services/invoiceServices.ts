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
  payerId: string | null;
  payerEmail: string;
  payerPhone: string;
  payerTin: string | null;
  payerType: string | null;
}

export interface iGenerateInvoiceResponse {
  invoiceNo: "7175310758982";
  invoiceAmount: 10.0;
  assesedService: "WITHHOLDING TAX-0002";
  paymentChannel: null;
  businessId: 0;
  business: null;
  serviceId: 873;
  mda: "Ministry of Finance ";
  month: 0;
  year: "";
  customerId: 2590;
  payerFirstName: null;
  payerLastName: null;
  tinType: null;
  payerId: null;
  payerTin: null;
  payer: "Oluwatobiloba Taiwo";
  payerEmail: "taiwoluwatobilobafestus@gmail.com";
  payerPhone: "09070754180";
  payerType: null;
  paid: false;
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
