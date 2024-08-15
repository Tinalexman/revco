"use client";

import React, { useState, useEffect } from "react";

const PayBills = () => {
  const [pin, setPin] = useState<string>("");

  return (
    <div className="flex flex-col mt-16 md:mt-10 items-start gap-2 w-[500px] md:w-full h-full">
      <h2 className="text-header font-bold text-[#595959]">
        Payment Invoice Number (PIN){"  "}
        <span className="text-tertiary text-small font-semibold">
          What is this?
        </span>
      </h2>
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
