import React from "react";
import Image, { StaticImageData } from "next/image";

import PayBills from "@/public/tax_1101555 1.svg";
import SelfAssessment from "@/public/taxation_4748276 1.svg";
import PaymentChannels from "@/public/debit_11898202 1.svg";
import Sectors from "@/public/easy-installation_5025723 1.svg";
import PaymentRecords from "@/public/receipt_10935039 1.svg";
import Learn from "@/public/setting_3019287 1.svg";

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

  return (
    <div className="w-full xl:py-20 3xl:py-28 lg:py-16 xs:py-8 flex flex-col items-center gap-14 bg-primary-light">
      <div className="w-fit flex flex-col xs:px-8 items-center xl:gap-2.5 text-black">
        <h2 className="text-h-1 font-semibold text-center">
          Pay Taxes with Ease
        </h2>
        <p className="text-l-1 text-center ">
          Your Tax, Your Contribution to a Greater Taraba State.
        </p>
      </div>
      <div className="w-full lg:grid-cols-3 xl:grid-cols-3 grid xs:grid-cols-1 gap-6 xl:gap-6 2xl:gap-8 3xl:gap-10 4xl:gap-12  2xl:px-20 3xl:px-24 4xl:px-32 xl:px-16 lg:px-10 xs:px-2">
        {reasons.map((rn, i) => (
          <div
            key={i}
            className="w-full lg:h-[17rem] xl:h-[17.5rem] p-5 bg-white rounded-lg flex flex-col gap-8"
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
              <h2 className="text-l-2 font-bold">{rn.title}</h2>
              <p className="text-s-4">{rn.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reasons;
