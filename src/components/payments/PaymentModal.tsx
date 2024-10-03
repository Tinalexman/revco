import React, { FC, useState, useEffect } from "react";
import Receipt from "@/public/noto_receipt.png";
import Image from "next/image";
import { Loader } from "@mantine/core";

import {
  useGenerateIndividualInvoice,
  useGenerateNonIndividualInvoice,
} from "@/src/hooks/invoiceHooks";

import { iPaymentData } from "./types";
import { iGenerateInvoiceResponse } from "@/src/services/invoiceServices";

const PaymentModal: FC<{
  role: string;
  data: iPaymentData;
  onContinue: (val: iGenerateInvoiceResponse) => void;
  onCancel: () => void;
}> = ({ onContinue, onCancel, data, role }) => {
  const {
    loading: loadingIndividual,
    generate: generateIndividual,
    success: individualSuccess,
  } = useGenerateIndividualInvoice();
  const {
    loading: loadingNonIndividual,
    generate: generateNonIndividual,
    success: nonIndividualSuccess,
  } = useGenerateNonIndividualInvoice();

  useEffect(() => {
    fn();
  }, []);

  const [invoiceResponse, setInvoiceResponse] =
    useState<iGenerateInvoiceResponse | null>(null);

  const fn = () => {
    const names: string[] = data.fullName.split(" ");
    if (role === "Individual") {
      generateIndividual(
        {
          enumerate: {
            title: "",
            dateOfBirth: "",
            maritalStatus: "",
            nationality: "",
            residenceLga: data.lga,
            residenceState: data.state,
            residentialAddress: data.address,
            occupation: "",
            officeAddress: "",
            employerName: "",
            temporaryTin: "",
            jtbTin: data.tin,
            nin: "",
            customer: {
              firstName: names[0] ?? "",
              lastName: names[1] ?? "",
              phone: data.phoneNumber,
              email: data.email,
              role: "individual",
            },
          },
          invoice: {
            invoiceAmount: data.amount,
            isAssessment: false,
            assessmentId: 0,
            serviceId: data.serviceId,
            businessId: 0,
            mdaId: data.mda,
            Month: 0,
            year: "",
            userId: 0,
            month: 0,
            assessment: false,
          },
          projectId: 1,
        },
        (val) => {
          if (val !== null) {
            setInvoiceResponse(val);
          }
        }
      );
    } else if (role === "Cooperate") {
      generateNonIndividual(
        {
          enumerate: {
            cacRegNo: "",
            companyName: "",
            companyAddress: "",
            city: "",
            lgaId: 0,
            phoneNumber1: "",
            phoneNumber2: "",
            email: "",
            nin: "",
            website: "",
            temporaryTin: "",
            jtbTin: "",
            companyRegistrationDate: "",
            companyCommencementDate: "",
            businessType: "",
            customer: {
              firstName: names[0] ?? "",
              lastName: names[1] ?? "",
              phone: data.phoneNumber,
              email: data.email,
              role: "non-individual",
            },
          },
          invoice: {
            invoiceAmount: data.amount,
            isAssessment: false,
            assessmentId: 0,
            serviceId: data.serviceId,
            businessId: 0,
            mdaId: data.mda,
            Month: 0,
            year: "",
            userId: 0,
            month: 0,
            assessment: false,
          },
          projectId: 1,
        },
        (val) => {
          if (val !== null) {
            setInvoiceResponse(val);
          }
        }
      );
    }
  };

  return (
    <div className="w-full h-[24rem] flex items-center justify-center bg-white font-nunito">
      {(loadingIndividual || loadingNonIndividual) && (
        <Loader color="primary.9" />
      )}
      {!(loadingIndividual || loadingNonIndividual) &&
        (individualSuccess || nonIndividualSuccess) &&
        invoiceResponse !== null && (
          <div className="flex flex-col items-center justify-center gap-6 px-6 w-full h-full">
            <Image
              src={Receipt}
              alt="receipt"
              className="size-[6rem] object-cover"
            />
            <p className="text-black text-b-2 text-center">
              A Payment Invoice Number (PIN){" "}
              <span className="text-primary font-bold">
                {invoiceResponse?.invoiceNo}
              </span>{" "}
              has been generated for you. You can continue to the payment page.
            </p>
            <button
              onClick={() => {
                if (invoiceResponse) {
                  onContinue(invoiceResponse!);
                }
              }}
              className={`bg-primary rounded-full w-[70%] text-smaller text-s-4 lg:h-12 xs:h-10 2xl:h-14 3xl:h-16 4xl:h-20 text-white font-semibold mt-2`}
            >
              Continue To Payment
            </button>
          </div>
        )}
      {!(loadingIndividual || loadingNonIndividual) &&
        (!(individualSuccess || nonIndividualSuccess) ||
          invoiceResponse === null) && (
          <div className="flex flex-col items-center gap-10 px-16">
            <h2 className="text-h-1 font-bold text-black">Oops!</h2>
            <h2 className="text-b-1 font-medium text-black text-center">
              An error occurred while generating your invoice
            </h2>
            <div className="w-full flex xs:flex-col xs:gap-3 lg:gap-0 lg:flex-row justify-between items-center">
              <button
                onClick={onCancel}
                className="border border-error rounded-full lg:w-[45%] xs:w-full h-12 text-b-1 text-error font-semibold"
              >
                Cancel
              </button>

              <button
                onClick={fn}
                className="bg-primary rounded-full lg:w-[45%] xs:w-full h-12 text-b-1 text-white font-semibold"
              >
                Retry
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default PaymentModal;
