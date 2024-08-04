"use client";

import React, { useState } from "react";
import Dropdown from "../../reusable/Dropdown";

const Pins = () => {
  const [index, setIndex] = useState<number>(0);
  const [pinType, setPinType] = useState<string>("");
  const registerProps: string[] = ["Individual Account", "Cooperate"];
  const [options, setOptions] = useState<string[]>(
    Array(10).fill(
      "1% PROCESSING FEE ON CAPITAL PROJECT (TARABA STATE REVENUE)"
    )
  );

  return (
    <div>
      <div className="flex flex-col pt-16 items-start gap-3 w-[500px] h-full">
        <div className="w-full justify-between items-center flex">
          {registerProps.map((rp, i) => (
            <div
              key={i}
              onClick={() => {
                setIndex(i);
              }}
              className={`w-[48.5%] cursor-pointer transition-colors duration-200 ease-in h-10 rounded-lg justify-center gap-3 items-center text-smaller text-[#3A3A3A] flex ${
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
        <h2 className="text-header font-bold text-[#595959]">
          What do you want to pay for?
        </h2>
        <div className="w-full flex gap-2 items-center">
          <div className="w-[75%]">
            <Dropdown
              menus={options.map((op, i) => ({
                name: op,
                onClick: () => {
                  setPinType(op);
                },
              }))}
              value={pinType}
            />
          </div>
          <button
            className={`bg-primary rounded-full w-[25%] text-body h-[48px] text-white font-bold`}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pins;
