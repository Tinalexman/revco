"use client";

import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { RiFileList3Fill } from "react-icons/ri";

import Image from "next/image";
import Invoice from "@/public/invoice_info.png";
import { useValidatePaidInvoice } from "@/src/hooks/invoiceHooks";
import { Loader } from "@mantine/core";
import { iReceiptData } from "../../payments/RevcoReceipt";

const GenerateInvoice = () => {
  const [pin, setPin] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const { loading, validate } = useValidatePaidInvoice();

  return (
    <div className="lg:mb-[20rem] xl:mb-[35rem] 2xl:mb-[52rem] 3xl:mb-[67rem] flex flex-col items-start gap-2 lg:w-[450px] xl:w-[500px] 2xl:w-[600px] 3xl:w-[700px] 4xl:w-[800px] xs:w-full lg:h-fit xs:h-[calc(100vh-13rem)]">
      <h2 className="text-l-1 font-bold text-[#595959]">
        Payment Invoice Number (PIN){"  "}
        <span
          onMouseEnter={() => {
            if (!open) {
              setOpen(true);
            }
          }}
          onMouseLeave={() => {
            if (open) {
              setOpen(false);
            }
          }}
          className="text-tertiary text-b-1 font-semibold cursor-help relative"
        >
          What is this?
          {
            <div
              className={`absolute text-white -right-[305px] top-5 w-[300px] h-fit rounded-tl-none rounded-2xl bg-black size-10 p-4 flex flex-col gap-4 transition-all duration-300 ease-in-out 
            ${open ? "opacity-100 scale-100" : "opacity-0 scale-0"} `}
            >
              <div className="flex flex-col gap-1 items-center">
                <div className="w-full">
                  <h2 className="font-semibold text-l-2">
                    Payment Invoice Number
                  </h2>
                </div>
                <p className="text-s-3 font-normal">
                  The Payment Invoice Number (PIN) is a unique identifier
                  automatically assigned to every invoice payment generated on
                  the Revco platform. <br /> This number validates each payment
                  and generates the corresponding receipt.
                </p>
                <Image
                  src={Invoice}
                  alt="receipt"
                  className="w-[70%] object-cover h-auto"
                />
              </div>
            </div>
          }
        </span>
      </h2>

      <div className="flex flex-col w-full gap-3 items-start">
        <div className="w-full flex lg:flex-row xs:flex-col xs:gap-2 lg:gap-3 xl:gap-4 3xl:gap-5 items-center">
          <input
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="rounded-full text-b-1"
            placeholder="Enter PIN"
          />
          <button
            onClick={() => {
              validate(pin, (data) => {
                if (data !== null) {
                  const receiptData: iReceiptData = {
                    assesedService: data.assesedService,
                    invoiceAmount: data.invoiceAmount,
                    invoiceNo: data.invoiceNo,
                    mda: data.mda,
                    paid: data.paid,
                    payer: data.payer,
                    payerEmail: data.payerEmail,
                    payerId: data.payerId ?? "",
                    payerPhone: data.payerPhone,
                    payerTin: data.payerTin,
                    transactionReference: data.payment[0].transactionReference,
                  };

                  window.location.assign(
                    `/dashboard/view-receipt/${
                      data.invoiceNo
                    }?target=${Buffer.from(
                      JSON.stringify(receiptData)
                    ).toString("base64")}`
                  );
                }
              });
            }}
            className={`bg-primary rounded-full lg:w-[35%] grid place-content-center xs:w-full text-b-1 lg:h-12 xs:h-10 2xl:h-14 3xl:h-16 4xl:h-20 text-white font-semibold `}
          >
            {loading ? <Loader color="white.9" /> : "Proceed"}
          </button>
        </div>
        <div className="text-s-4 text-[#595959] font-semibold text-end">
          Don&apos;t have a PIN?{" "}
          <span
            onClick={() =>
              window.location.assign("/dashboard/generate-invoice")
            }
            className="text-tertiary font-bold cursor-pointer"
          >
            Click here
          </span>
        </div>
      </div>
    </div>
  );
};

export default GenerateInvoice;
