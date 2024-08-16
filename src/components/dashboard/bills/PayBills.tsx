"use client";

import React, { useState } from "react";

import Image from "next/image";
import Invoice from "@/public/invoice_info.png";

const PayBills = () => {
  const [pin, setPin] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  //22499607849

  return (
    <div className="flex flex-col mt-16 md:mt-10 items-start gap-2 w-[500px] md:w-full h-full relative">
      <h2 className="text-header font-bold text-[#595959]">
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
          className="text-tertiary text-small font-semibold cursor-help"
        >
          What is this?
        </span>
      </h2>
      <div
        className={`absolute text-white -right-[200px] md:right-2 top-5 rounded-[16px] w-[300px] h-fit rounded-tl-none md:rounded-tr-none md:rounded-tl-2xl bg-black size-10 p-4 flex flex-col gap-4 transition-opacity duration-300 ease-in-out 
            ${open ? "opacity-100" : "opacity-0"} `}
      >
        <div className="flex flex-col gap-1 items-center">
          <div className="w-full">
            <h2 className="font-semibold text-small">Payment Invoice Number</h2>
          </div>
          <p className="text-smaller">
            Lorem ipsum dolor sit amet consectetur. Ultricies nisi interdum eget
            urna orci quis eget. Mauris ac posuere vitae tortor. Arcu maecenas
            accumsan cursus nunc diam enim. Accumsan orci quam tellus et vel
            semper.
          </p>
          <Image src={Invoice} alt="receipt" />
        </div>
      </div>
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
            className={`bg-primary rounded-full w-[25%] md:w-full text-body md:h-10 h-12 text-white font-bold`}
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
  );
};

export default PayBills;
