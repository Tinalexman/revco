"use client";

import React, { useState } from "react";
import Dropdown from "../../reusable/Dropdown";
import { useGetMDAs, useGetMDAServices } from "@/src/hooks/mdaHooks";

import Cryptr from "cryptr";
import { HASH_KEY } from "@/src/services/base";

const Pins = () => {
  const [mda, setMDA] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const registerProps: string[] = ["Individual", "Cooperate"];
  const [index, setIndex] = useState<string>(registerProps[0]);

  const { loading: loadingMDAs, data: mdas } = useGetMDAs();
  const {
    loading: loadingServices,
    data: services,
    get: getServices,
  } = useGetMDAServices();

  return (
    <div className="lg:mb-[8rem] xl:mb-[24rem] 2xl:mb-[40rem] 3xl:mb-[57rem] flex flex-col items-start gap-2 lg:w-[500px] 2xl:w-[600px] 3xl:w-[700px] 4xl:w-[800px] xs:w-[100vw] xs:px-5 lg:px-0 lg:h-fit xs:h-[calc(100vh-13rem)]">
      <div className="w-full xs:w-full justify-between items-center flex">
        {registerProps.map((rp, i) => (
          <div
            key={i}
            onClick={() => {
              setIndex(rp);
            }}
            className={`w-[48%] cursor-pointer transition-colors duration-200 ease-in xs:h-10 xl:h-12 2xl:h-14 3xl:h-16 4xl:h-20 rounded-lg justify-center gap-3 items-center text-smaller text-[#3A3A3A] flex ${
              index === rp ? "bg-primary-light " : "bg-neutral"
            }`}
          >
            <p className="text-l-2">{rp}</p>
            <div
              className={`size-4 grid place-content-center rounded-full border-2 ${
                index === rp ? " border-primary" : "border-neutral-2"
              }`}
            >
              {index === rp && (
                <div className={`size-[6px] rounded-full bg-primary`} />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className=" lg:px-[10%] xs:px-0 w-full flex flex-col lg:gap-4 xs:gap-3">
        <h2 className="text-l-1 font-bold text-[#595959] mt-5">
          What do you want to pay for?
        </h2>
        <Dropdown
          menus={mdas.map((op, i) => ({
            name: op.name,
            onClick: () => {
              setMDA(op.name);
              getServices(op.id);
            },
          }))}
          showIcon
          hint="Select MDA"
          value={mda}
          fitMenu={false}
          loading={loadingMDAs}
        />
        <Dropdown
          menus={services.map((op, i) => ({
            name: op.name,
            onClick: () => {
              setTarget(op.name);
            },
          }))}
          showIcon
          hint="Select Revenue Head"
          value={target}
          fitMenu={false}
          loading={loadingServices}
        />
        <button
          onClick={() => {
            if (mda === "" || target === "") return;
            const payload = `${index}#${mda}#${target}`;
            window.location.assign(
              "/dashboard/payment?target=" +
                Buffer.from(payload).toString("base64")
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
