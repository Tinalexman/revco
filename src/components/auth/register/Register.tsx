"use client";

import React, { useState } from "react";
import Link from "next/link";

import { PiInfoLight } from "react-icons/pi";

import Cooperate from "./Cooperate";
import Individual from "./Individual";

import { useGenerateTemporaryTIN } from "@/src/hooks/tinHooks";

import { Modal, Loader } from "@mantine/core";

const Register = () => {
  const [index, setIndex] = useState<number>(-1);
  const [nin, setNin] = useState<string>("");
  const [noNin, setNoNin] = useState<boolean>(false);
  const registerProps: string[] = ["Individual", "Cooperate"];

  const { loading: loadingPayerID, generate: generatePayerID } =
    useGenerateTemporaryTIN();

  return (
    <>
      <div
        className={`w-full h-full flex flex-col items-center justify-center bg-background bg-opacity-[0.95] overflow-y-scroll ${
          index === -1
            ? "lg:pt-0"
            : "lg:pt-[38rem] xl:pt-[25rem] 2xl:pt-[12rem] 3xl:pt-0 "
        }`}
      >
        <div className="h-fit lg:w-[500px] xl:w-[550px] 2xl:w-[600px] 3xl:w-[700px] 4xl:w-[800px] xs:w-full xs:px-5 flex flex-col items-center justify-center gap-5">
          <div className="flex flex-col items-center xs:gap-6 xl:gap-8 2xl:gap-10 3xl:gap-12 4xl:gap-14 w-full">
            <div className="flex flex-col gap-1 items-center">
              <h1 className="text-h-3 font-bold text-black">
                Create your account
              </h1>
              <p className="text-b-1 text-center text-black">
                Fill in the form to finish registration, you can select the type
                of account you are registering.
              </p>
            </div>
            <div className="w-full justify-between items-center flex">
              {registerProps.map((rp, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setIndex(i);
                    if (i === 1) {
                      setNoNin(false);
                    }
                  }}
                  className={`w-[48%] cursor-pointer transition-colors duration-200 ease-in xs:h-10 xl:h-12 2xl:h-14 3xl:h-16 4xl:h-20 rounded-lg justify-center gap-3 items-center text-s-2 text-[#3A3A3A] flex ${
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

            <div className="flex flex-col gap-[2px] w-full">
              <div className="flex w-full justify-between items-center">
                <h3 className="text-body text-neutral-2">
                  {noNin
                    ? "Temporary Payer ID"
                    : "National Identification Number"}
                </h3>
                {!noNin && (
                  <PiInfoLight size={"20px"} className="text-[#FF9500]" />
                )}
              </div>
              <input
                type="text"
                placeholder={`Enter your ${
                  noNin ? "temporary Payer ID" : "NIN"
                }`}
                value={nin}
                onChange={(e) => {
                  const res = e.target.value.replace(/,/g, "");
                  if (!isNaN(Number(res))) {
                    setNin(e.target.value);
                  }
                }}
                className="w-full text-body"
                readOnly={noNin}
              />
              {!noNin && index === 0 && (
                <p className="text-hint font-nunito text-black mt-1">
                  Don&apos;t have a NIN?{" "}
                  <span
                    onClick={() => {
                      setNoNin(true);
                      generatePayerID((val?: string) => {
                        if (val) {
                          setNin(val);
                        } else {
                          setNoNin(false);
                        }
                      });
                    }}
                    className="text-primary font-bold cursor-pointer"
                  >
                    Click Here
                  </span>
                </p>
              )}
            </div>

            {index === 0 && <Individual hasNin={!noNin} />}
            {index === 1 && <Cooperate />}
          </div>
          <p className="text-hint text-black my-10">
            Already have an account?{" "}
            <span className="text-primary font-bold underline">
              <Link href={"/auth/login"}>LOGIN</Link>
            </span>
          </p>
        </div>
      </div>
      <Modal.Root
        opened={loadingPayerID}
        onClose={() => {}}
        closeOnClickOutside={false}
        closeOnEscape={false}
        size={"30vw"}
        padding={0}
        top={0}
        centered
      >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Body>
            <div className="w-full h-[30vw] grid place-content-center bg-white ">
              <Loader color="primary.9" />
            </div>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export default Register;
