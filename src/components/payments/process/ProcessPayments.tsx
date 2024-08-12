"use client";

import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { useGlobalStore } from "@/src/stores/globalStore";
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

interface iPaymentMode {
  name: string;
  component: React.ReactNode;
  icon: IconType;
}

const ProcessPayments = () => {
  const [paymentDetails, setPaymentDetails] = useState<tProcessPayment>({
    tin: "",
    amount: 0,
    target: "",
    name: "",
    ref: "",
    payerID: "",
    pin: "",
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

  useEffect(() => {
    let key = window.localStorage.getItem(PAYMENT_KEY);
    if (key === null) {
      toast.error("An error occurred. Please try again.");
      router.back();
    } else {
      setPaymentDetails(JSON.parse(key));
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="w-[50rem] h-[20rem] mt-16 bg-white rounded-lg grid place-items-center">
        <Loader color="primary.9" />
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-16 md:mt-6 px-8 md:px-2.5 py-10 md:py-5 items-center gap-6 w-[50rem] md:w-full rounded-lg text-black bg-white overflow-y-scroll scrollbar-custom">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-large font-bold">PIN: {paymentDetails.pin}</h2>
        <p className="text-small text-[#007AFF] cursor-pointer">View Receipt</p>
      </div>
      <div className="w-full flex md:flex-col justify-between">
        <div className="w-[45%] md:w-full flex flex-col gap-2">
          <div className="w-full flex justify-between">
            <p className="text-smaller">Payer&apos;s name:</p>
            <p className="text-smaller font-bold">{paymentDetails.name}</p>
          </div>
          <div className="w-full flex justify-between">
            <p className="text-smaller">
              Invoice Amount Due{" "}
              <span className="text-tiny">(after discount)</span>
            </p>
            <p className="text-smaller font-bold">
              ₦{formatAmountWithCommas(paymentDetails.amount)}.00
            </p>
          </div>
          <div className="w-full flex justify-between">
            <p className="text-smaller">Revenue Head:</p>
            <p className="text-smaller font-bold w-fit max-w-[60%] text-end">
              {paymentDetails.target}
            </p>
          </div>
        </div>
        <div className="w-[45%] md:w-full flex flex-col gap-2">
          <div className="w-full flex justify-between">
            <p className="text-smaller">Payer ID:</p>
            <p className="text-smaller font-bold">{paymentDetails.payerID}</p>
          </div>
          <div className="w-full flex justify-between">
            <p className="text-smaller">External Ref.Number</p>
            <p className="text-smaller font-bold">{paymentDetails.ref}</p>
          </div>
          <div className="w-full flex justify-between">
            <p className="text-smaller">TIN:</p>
            <p className="text-smaller font-bold w-fit max-w-[60%] text-end">
              {paymentDetails.tin}
            </p>
          </div>
        </div>
      </div>
      <hr className="bg-background w-full" />
      <div className="w-full gap-[10px] grid grid-cols-5 md:grid-cols-1">
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
                  } text-small transition-colors ease-out duration-300`}
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
  );
};

export default ProcessPayments;
