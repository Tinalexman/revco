"use client";

import React, { useState } from "react";
import Dropdown from "../../reusable/Dropdown";
import { PAYMENT_TARGET } from "@/src/constants/constants";
import { useGlobalStore } from "@/src/stores/globalStore";
import { useGetMDAs, useGetMDAServices } from "@/src/hooks/mdaHooks";

const Pins = () => {
  const [index, setIndex] = useState<number>(0);
  const [mda, setMDA] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const registerProps: string[] = ["Individual", "Cooperate"];

  const [options, setOptions] = useState<string[]>(
    Array(10).fill(
      "1% PROCESSING FEE ON CAPITAL PROJECT (TARABA STATE REVENUE)"
    )
  );

  const { loading: loadingMDAs, data: mdas } = useGetMDAs();
  const {
    loading: loadingServices,
    data: services,
    get: getServices,
  } = useGetMDAServices();

  return (
    <div className="flex flex-col items-start gap-2 lg:w-[700px] xl:w-[800px] 2xl:w-[900px] 3xl:w-[1100px] 4xl:w-[1300px] xs:w-[100vw] xs:px-5 lg:px-0 lg:h-fit xs:h-[calc(100vh-13rem)]">
      <div className="w-full xs:w-full justify-between items-center flex">
        {registerProps.map((rp, i) => (
          <div
            key={i}
            onClick={() => {
              setIndex(i);
            }}
            className={`w-[48%] cursor-pointer transition-colors duration-200 ease-in xs:h-10 xl:h-12 2xl:h-14 3xl:h-16 4xl:h-20 rounded-lg justify-center gap-3 items-center text-smaller text-[#3A3A3A] flex ${
              index === i ? "bg-primary-light " : "bg-neutral"
            }`}
          >
            <p className="text-l-2">{rp}</p>
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
      <div className=" lg:px-[20%] 2xl:px-[16%] xs:px-0 w-full flex flex-col lg:gap-4 xs:gap-3">
        <h2 className="text-l-1 font-bold text-[#595959] mt-5">
          What do you want to pay for?
        </h2>
        <Dropdown
          menus={options.map((op, i) => ({
            name: op,
            onClick: () => {
              setMDA(op);
            },
          }))}
          hint="Select MDA"
          value={mda}
          fitMenu={false}
        />
        <Dropdown
          menus={options.map((op, i) => ({
            name: op,
            onClick: () => {
              setTarget(op);
            },
          }))}
          hint="Select Revenue Head"
          value={target}
          fitMenu={false}
        />
        <button
          onClick={() => {
            if (mda === "" || target === "") return;
            window.location.assign(
              "/dashboard/payment?mda=" + mda + "&target=" + target
            );
          }}
          className={`${
            mda === "" || target === ""
              ? "cursor-not-allowed bg-neutral-3 text-neutral-2"
              : "bg-primary text-white cursor-pointer"
          } xs:mt-3 3xl:mt-5  rounded-full w-full text-body xs:h-10 lg:h-12 text-b-1 md:h-12 xl:h-16 2xl:h-[72px] 3xl:h-20 4xl:h-24 font-bold`}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default Pins;
