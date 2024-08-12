"use client";

import React, { useState, useRef, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { RiFileList3Fill } from "react-icons/ri";

import Image from "next/image";
import Invoice from "@/public/invoice_info.png";
import { PAYMENT_TARGET } from "@/src/constants/constants";
import { useGlobalStore } from "@/src/stores/globalStore";

const GenerateInvoice = () => {
  const [pin, setPin] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="flex flex-col items-center w-[700px] md:w-full gap-6 mt-16 md:mt-10">
      <div className="flex flex-col items-start gap-2 w-[500px] md:w-full h-full relative">
        <h2 className="text-header font-bold text-[#595959]">
          Paysure Invoice Number (PIN){"  "}
          <span
            // onMouseEnter={() => {
            //   if (!open) {
            //     setOpen(true);
            //   }
            // }}
            // onMouseLeave={() => {
            //   if (open) {
            //     setOpen(false);
            //   }
            // }}
            className="text-tertiary text-small font-semibold cursor-help"
          >
            What is this?
          </span>
        </h2>
        {open && (
          <div className="absolute text-white right-0 top-2 rounded-[16px] w-[250px] rounded-tl-none bg-black size-10 p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1 ">
              <h2 className="font-semibold text-small">
                Paysure Invoice Number
              </h2>
              <p className="text-Smaller">
                Lorem ipsum dolor sit amet consectetur. Ultricies nisi interdum
                eget urna orci quis eget. Mauris ac posuere vitae tortor. Arcu
                maecenas accumsan cursus nunc diam enim. Accumsan orci quam
                tellus et vel semper.
              </p>
            </div>
          </div>
        )}
        <div className="flex flex-col w-full gap-3 items-start">
          <div className="w-full flex md:flex-col gap-2 items-center">
            <input
              type="text"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="rounded-full w-[75%] md:w-full"
              placeholder="Enter PIN"
            />
            <button
              onClick={() => {}}
              className={`bg-primary rounded-full w-[25%] md:w-full text-body h-12 md:h-10 text-white font-bold`}
            >
              Proceed
            </button>
          </div>
          <div className="text-small text-[#595959] font-semibold text-end md:mb-20">
            Don&apos;t have a PIN?{" "}
            <span
              onClick={() => window.location.assign("/dashboard/generate-pin")}
              className="text-tertiary font-bold cursor-pointer"
            >
              Click here
            </span>
          </div>
        </div>
      </div>
      {error && (
        <div className="w-full flex items-center justify-between px-8 font-medium py-[10px] md:mb-20 rounded-[8px] text-[#DA251D] text-hint bg-[#F4BBB9]">
          <div className="flex w-fit gap-1 items-center">
            <RiFileList3Fill size={"16px"} />
            <p>Invoice not found</p>
          </div>
          <MdOutlineCancel
            size={"20px"}
            className="cursor-pointer"
            onClick={() => setError(false)}
          />
        </div>
      )}
    </div>
  );
};

export default GenerateInvoice;
