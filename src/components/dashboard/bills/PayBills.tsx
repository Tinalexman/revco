"use client";

import { useGlobalStore } from "@/src/stores/globalStore";
import React, { useState, useEffect } from "react";

const PayBills = () => {
  const [pin, setPin] = useState<string>("");

  useEffect(() => {
    useGlobalStore.setState({ activeIndex: 0 });
  }, []);

  return (
    <div className="flex flex-col pt-16 items-start gap-2 w-[500px] h-full">
      <h2 className="text-header font-bold text-[#595959]">
        Paysure Invoice Number (PIN){"  "}
        <span className="text-tertiary text-small font-semibold">
          What is this?
        </span>
      </h2>
      <div className="flex flex-col w-full gap-3 items-start">
        <div className="w-full flex gap-2 items-center">
          <input
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="rounded-full w-[75%]"
            placeholder="Enter PIN"
          />
          <button
            onClick={() => {}}
            className={`bg-primary rounded-full w-[25%] text-body h-[48px] text-white font-bold`}
          >
            Proceed
          </button>
        </div>
        <div className="text-smaller text-[#595959] font-semibold text-end">
          Don&apos;t have a PIN?{" "}
          <span
            onClick={() => window.location.assign("/dashboard/generate-pin")}
            className="text-tertiary font-bold text-smaller cursor-pointer"
          >
            Click here
          </span>
        </div>
      </div>
    </div>
  );
};

export default PayBills;
