"use client";

import React, { useState, useEffect, Suspense } from "react";

import { useSearchParams, useRouter } from "next/navigation";

import { tProcessPayment, PAYMENT_KEY } from "@/src/stores/paymentStore";
import toast from "react-hot-toast";
import { formatAmountWithCommas } from "@/src/functions/numberFunctions";
import { Loader } from "@mantine/core";
import { IconType } from "react-icons";

import { TbCreditCardFilled, TbDeviceLandlinePhone } from "react-icons/tb";
import { BiSolidBank } from "react-icons/bi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { PiMonitorArrowUpFill } from "react-icons/pi";

import Card from "./Card";
import Branch from "./Branch";
import Online from "./Online";
import POS from "./POS";
import Transfer from "./Transfer";
import { iGenerateInvoiceResponse } from "@/src/services/invoiceServices";

interface iPaymentMode {
  name: string;
  component: React.ReactNode;
  icon: IconType;
}

const ProcessPayments = () => {
  return (
    <Suspense fallback={<Loader color="myColor.9" />}>
      <Content />
    </Suspense>
  );
};

const Content = () => {
  const [paymentDetails, setPaymentDetails] =
    useState<iGenerateInvoiceResponse>({
      invoiceNo: "",
      invoiceAmount: 0,
      assesedService: "",
      paymentChannel: null,
      businessId: 0,
      business: null,
      serviceId: 0,
      mda: "",
      month: 0,
      year: "",
      customerId: 0,
      payerFirstName: null,
      payerLastName: null,
      tinType: null,
      payerId: null,
      payerTin: null,
      payer: "",
      payerEmail: "",
      payerPhone: "",
      payerType: null,
      paid: false,
    });

  const modes: iPaymentMode[] = [
    {
      name: "Bank Card",
      component: <Card />,
      icon: TbCreditCardFilled,
    },
    {
      name: "Bank Branch",
      component: <Branch />,
      icon: BiSolidBank,
    },
    {
      name: "Bank Transfer",
      component: <Transfer />,
      icon: FaMoneyBillTransfer,
    },
    {
      name: "Online Payment",
      component: <Online />,
      icon: PiMonitorArrowUpFill,
    },
    {
      name: "POS",
      component: <POS />,
      icon: TbDeviceLandlinePhone,
    },
  ];

  const [mode, setMode] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const target: string | null = searchParams.get("target");
    if (!target) {
      router.back();
    }

    const payload: string = Buffer.from(target!, "base64").toString("utf-8");
    console.log(payload);
    let paymentTarget: iGenerateInvoiceResponse = JSON.parse(payload);

    setPaymentDetails(paymentTarget);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="w-[50rem] h-[20rem] my-16 bg-white rounded-lg grid place-items-center">
        <Loader color="primary.9" />
      </div>
    );
  }

  return (
    <div className="w-full lg:mb-[5rem] grid place-content-center xs:px-2.5">
      <div className="flex flex-col lg:px-8 xs:px-2.5 lg:py-10 xs:py-5 items-center gap-6 lg:w-[52rem] xl:w-[56rem] 2xl:w-[60rem] xs:w-full rounded-lg text-black bg-white overflow-y-scroll scrollbar-custom">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-l-1 font-bold">
            PIN: {paymentDetails.invoiceNo}
          </h2>
          {/* <p className="text-small text-[#007AFF] cursor-pointer">View Receipt</p> */}
        </div>
        <div className="w-full flex lg:flex-row xs:flex-col justify-between xs:gap-3">
          <div className="lg:w-[47.5%] xs:w-full flex flex-col gap-2">
            <div className="w-full flex justify-between">
              <p className="text-s-3">Payer&apos;s name:</p>
              <p className="text-s-3 font-bold">{paymentDetails.payer}</p>
            </div>
            <div className="w-full flex justify-between">
              <p className="text-s-3">MDA:</p>
              <p className="text-s-3 font-bold w-fit max-w-[60%] text-end">
                {paymentDetails.mda}
              </p>
            </div>
            <div className="w-full flex justify-between">
              <p className="text-s-3">Revenue Head:</p>
              <p className="text-s-3 font-bold w-fit max-w-[60%] text-end">
                {paymentDetails.assesedService}
              </p>
            </div>
          </div>
          <div className="lg:w-[47.5%] xs:w-full flex flex-col gap-2">
            <div className="w-full flex justify-between">
              <p className="text-s-3">Payer ID:</p>
              <p className="text-s-3 font-bold">{paymentDetails.payerTin}</p>
            </div>

            <div className="w-full flex justify-between">
              <p className="text-s-3">TIN:</p>
              <p className="text-s-3 font-bold w-fit max-w-[60%] text-end">
                {paymentDetails.payerTin}
              </p>
            </div>
            <div className="w-full flex justify-between">
              <p className="text-s-3">Amount</p>
              <p className="text-s-3 font-bold w-fit max-w-[60%] text-end ">
                ₦{paymentDetails.invoiceAmount.toLocaleString("en-US")}
              </p>
            </div>
          </div>
        </div>
        <hr className="bg-background w-full" />
        <div className="w-full gap-[10px] grid lg:grid-cols-5 xs:grid-cols-1">
          {modes.map((md, i) => {
            const Icon = md.icon;
            return (
              <div
                key={i}
                onClick={() => setMode(i)}
                className={`transition-colors ease-out duration-300 w-full flex flex-col justify-center items-center gap-[10px] py-4 md:py-2 rounded-lg cursor-pointer ${
                  i === mode ? "bg-primary-light" : "bg-[#EBEBEB]"
                }`}
              >
                <Icon
                  size={22}
                  className={`${
                    i === mode ? "text-primary" : "text-[#8E8E93]"
                  } transition-colors ease-out duration-300`}
                />
                <div className="gap-2 flex items-center justify-center transition-all ease-out duration-300">
                  <p
                    className={`${
                      i === mode ? "text-black" : "text-[#8E8E93]"
                    } text-b-2 transition-colors ease-out duration-300`}
                  >
                    {md.name}
                  </p>
                  {i === mode && (
                    <div
                      className={`size-4 grid place-content-center rounded-full border-2 border-primary`}
                    >
                      <div className={`size-[6px] rounded-full bg-primary`} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {modes[mode].component}
      </div>
    </div>
  );
};

export default ProcessPayments;
