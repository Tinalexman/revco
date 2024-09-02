import React, { FC, useState, useEffect } from "react";
import Receipt from "@/public/noto_receipt.png";
import Image from "next/image";
import { Loader } from "@mantine/core";

import {
  useGenerateIndividualInvoice,
  useGenerateNonIndividualInvoice,
} from "@/src/hooks/invoiceHooks";

import { iPaymentData } from "./types";

const PaymentModal: FC<{
  role: string;
  data: iPaymentData;
  onContinue: (val: string) => void;
}> = ({ onContinue, data, role }) => {
  const { loading: loadingIndividual, generate: generateIndividual } =
    useGenerateIndividualInvoice();
  const { loading: loadingNonIndividual, generate: generateNonIndividual } =
    useGenerateNonIndividualInvoice();

  useEffect(() => {
    if (role === "Individual") {
      generateIndividual({
        enumerate: {
          title: "",
          dateOfBirth: "",
          maritalStatus: "",
          nationality: "",
          residenceLga: 0,
          residenceState: 0,
          residentialAddress: "",
          occupation: "",
          officeAddress: "",
          employerName: "",
          temporaryTin: "",
          jtbTin: "",
          nin: "",
          customer: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            role: "",
          },
        },
        invoice: {
          invoiceAmount: data.amount,
          isAssessment: true,
          assessmentId: 0,
          serviceId: 0,
          businessId: 0,
          mdaId: 0,
          Month: 0,
          year: "",
          userId: 0,
          month: 0,
          assessment: true,
        },
        projectId: 0,
      });
    } else if (role === "Cooperate") {
      generateNonIndividual({
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
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            role: "",
          },
        },
        invoice: {
          invoiceAmount: data.amount,
          isAssessment: true,
          assessmentId: 0,
          serviceId: 0,
          businessId: 0,
          mdaId: 0,
          Month: 0,
          year: "",
          userId: 0,
          month: 0,
          assessment: true,
        },
        projectId: 0,
      });
    }
  }, []);

  return (
    <div className="w-full h-[24rem] flex items-center justify-center bg-white font-nunito">
      {(loadingIndividual || loadingNonIndividual) && (
        <Loader color="primary.9" />
      )}
      {!(loadingIndividual || loadingNonIndividual) && (
        <div className="flex flex-col items-center justify-center gap-6 px-6 w-full h-full">
          <Image
            src={Receipt}
            alt="receipt"
            className="size-[6rem] object-cover"
          />
          <p className="text-black text-b-2 text-center">
            A tax profile with the Payer Id{" "}
            <span className="text-primary font-bold">WX-513785 </span>
            has been created for you. You can register later to view all your
            invoices, payments and receipts.
          </p>
          <button
            onClick={() => onContinue("WX-513785")}
            className={`bg-primary rounded-full w-[70%] text-smaller text-s-4 lg:h-12 xs:h-10 2xl:h-14 3xl:h-16 4xl:h-20 text-white font-semibold mt-2`}
          >
            Confirm - Continue To Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentModal;
