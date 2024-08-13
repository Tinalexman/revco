"use client";

import React, { useEffect, useState } from "react";
import Dropdown from "../../reusable/Dropdown";
import { PAYMENT_TARGET } from "@/src/constants/constants";
import { useGlobalStore } from "@/src/stores/globalStore";

const Pins = () => {
  const [index, setIndex] = useState<number>(0);
  const [pinType, setPinType] = useState<string>("");
  const registerProps: string[] = ["Individual", "Cooperate"];
  const [options, setOptions] = useState<string[]>(
    Array(10).fill(
      "1% PROCESSING FEE ON CAPITAL PROJECT (TARABA STATE REVENUE)"
    )
  );

  return (
    <div className="flex flex-col mt-16 md:mt-10 items-start gap-3 w-[500px] md:w-full h-full">
      <div className="w-full justify-between items-center flex">
        {registerProps.map((rp, i) => (
          <div
            key={i}
            onClick={() => {
              setIndex(i);
            }}
            className={`w-[48%] cursor-pointer transition-colors duration-200 ease-in h-10 rounded-lg justify-center gap-3 items-center text-smaller text-[#3A3A3A] flex ${
              index === i ? "bg-primary-light " : "bg-neutral"
            }`}
          >
            <p>{rp}</p>
            <div
              className={`size-4 grid place-content-center rounded-full border-2 ${
                index === i ? " border-primary" : "border-neutral-2"
              }`}
            >
              {index === i && (
                <div className={`size-[6px] rounded-full bg-primary`} />
              )}
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-header font-bold text-[#595959] md:mt-5">
        What do you want to pay for?
      </h2>
      <div className="w-full flex md:flex-col gap-2 items-center">
        <div className="w-[75%] md:w-full">
          <Dropdown
            menus={options.map((op, i) => ({
              name: op,
              onClick: () => {
                setPinType(op);
              },
            }))}
            hint="Select Plan"
            value={pinType}
            fitMenu={false}
          />
        </div>
        <button
          onClick={() => {
            window.location.assign("/payments/make-payment?target=" + pinType);
          }}
          className={`bg-primary rounded-full w-[25%] md:w-full text-body h-12 md:h-10 text-white font-bold`}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default Pins;
