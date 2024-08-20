"use client";

import React, { useRef } from "react";
import Image, { StaticImageData } from "next/image";

import PayBills from "@/public/tax_1101555 1.svg";
import SelfAssessment from "@/public/taxation_4748276 1.svg";
import PaymentChannels from "@/public/debit_11898202 1.svg";
import Sectors from "@/public/easy-installation_5025723 1.svg";
import PaymentRecords from "@/public/receipt_10935039 1.svg";
import Learn from "@/public/setting_3019287 1.svg";

import { motion, useInView } from "framer-motion";

interface iReason {
  title: string;
  text: string;
  image: StaticImageData;
}

const Reasons = () => {
  const reasons: iReason[] = [
    {
      image: PayBills,
      title: "PAY BILLS",
      text: "Sign in or register to conveniently manage and pay your bills or taxes, whether you are an individual or a corporate User.",
    },
    {
      image: SelfAssessment,
      title: "SELF ASSESSMENT",
      text: "You can conduct self-assessment, generate invoices, and complete payments.",
    },
    {
      image: PaymentChannels,
      title: "MULTIPLE PAYMENT CHANNELS",
      text: "Experience a faster, easier way to pay taxes or invoices. You can make payments against an invoice at any bank branch or through POS, online payments using debit cards (Verve, Visa, or MasterCard) and other payment channels",
    },
    {
      image: Sectors,
      title: "FORMAL AND INFORMAL SECTORS",
      text: "Access, validate and pay your bills online and offline, at your convenience. You now have your tax office in the comfort of your desk or your mobile device",
    },
    {
      image: PaymentRecords,
      title: "PAYMENT TRANSACTION RECORDS",
      text: "View your tax information and payment history at real time.",
    },
    {
      image: Learn,
      title: "LEARN MORE",
      text: "We are here to assist and guide you on how to pay your bills generate invoices and make payment with ease. Click here for help",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { amount: "some" });

  return (
    <div className="w-full py-20 md:py-14 flex flex-col items-center gap-14 bg-primary-light">
      <div className="w-fit flex flex-col items-center gap-1">
        <h2 className="text-header font-semibold text-black">
          Pay Taxes with Ease
        </h2>
        <p className="text-large text-center text-black">
          Your Tax, Your Contribution to a Greater Taraba State.
        </p>
      </div>
      <div
        ref={ref}
        className="w-full grid-cols-3 md:grid-cols-1 gap-6 grid px-16 md:px-2"
      >
        {reasons.map((rn, i) => (
          <motion.div
            key={i}
            initial={{
              x:
                i === 0 || i === 4 ? "-30%" : i === 1 || i === 5 ? "0%" : "30%",
            }}
            animate={{
              x: isInView
                ? 0
                : i === 0 || i === 4
                ? "-30%"
                : i === 1 || i === 5
                ? "0%"
                : "30%",
              transition: {
                ease: "easeOut",
                duration: 1,
              },
            }}
            className="w-full h-72 md:h-60 p-5 bg-white rounded-lg flex flex-col gap-8"
          >
            <div className="bg-primary-light rounded-full p-4 w-fit">
              <Image
                src={rn.image}
                alt="reason"
                className="size-8"
                width={32}
                height={32}
              />
            </div>
            <div className="flex flex-col gap-2 text-[#626262]">
              <h2 className="text-large font-bold">{rn.title}</h2>
              <p className="text-small">{rn.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Reasons;
