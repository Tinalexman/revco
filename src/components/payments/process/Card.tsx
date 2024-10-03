"use client";

import React, { FC } from "react";

import Link from "next/link";
import { iGenerateInvoiceResponse } from "@/src/services/invoiceServices";
import { getCheckoutPage } from "@/src/services/paymentServices";

const Card: FC<{ details: iGenerateInvoiceResponse }> = ({ details }) => {
  const url = getCheckoutPage(
    details.payerEmail,
    details.payer,
    details.payerPhone,
    details.invoiceAmount
  );
  return (
    <div className="lg:w-[60%] xs:w-full mt-2 flex flex-col items-center gap-10">
      <Link
        href={url}
        target="__blank"
        className={`bg-[#408BFC] rounded-lg lg:w-[350px] xs:w-full grid place-content-center text-b-1 lg:h-12 xs:h-10 text-white font-bold`}
      >
        Pay Now
      </Link>
    </div>
  );
};

export default Card;
