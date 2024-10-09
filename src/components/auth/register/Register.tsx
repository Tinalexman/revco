"use client";

import React, { useState } from "react";
import Link from "next/link";

import { PiInfoLight } from "react-icons/pi";

import Cooperate from "./Cooperate";
import Individual from "./Individual";

import { useGenerateTemporaryTIN } from "@/src/hooks/tinHooks";
import { IoMdClose } from "react-icons/io";
import { Modal, Loader } from "@mantine/core";

const Register = () => {
  const [index, setIndex] = useState<number>(-1);
  const [nin, setNin] = useState<string>("");
  const [noNin, setNoNin] = useState<boolean>(false);
  const registerProps: string[] = ["Individual", "Cooperate"];
  const [open, setOpen] = useState<boolean>(false);

  const { loading: loadingPayerID, generate: generatePayerID } =
    useGenerateTemporaryTIN();

  return (
    <>
      <div
        className={`w-full h-full flex flex-col items-center xs:justify-start lg:justify-center bg-white bg-opacity-[0.94] overflow-y-scroll ${index === -1
            ? "lg:pt-0"
            : "lg:pt-[38rem] xl:pt-[25rem] 2xl:pt-[12rem] 3xl:pt-0 "
          }`}
      >
        <div className="h-fit lg:w-[500px] xl:w-[550px] 2xl:w-[600px] 3xl:w-[700px] 4xl:w-[800px] xs:w-full xs:px-5 xs:mt-10 lg:mt-0 flex flex-col items-center justify-center gap-5">
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
                  className={`w-[48%] cursor-pointer transition-colors duration-200 ease-in xs:h-8 lg:h-12 rounded-md justify-center gap-3 items-center text-s-2 text-[#3A3A3A] flex ${index === i ? "bg-primary-light " : "bg-neutral"
                    }`}
                >
                  <p>{rp}</p>
                  <div
                    className={`lg:size-4 xs:size-3 grid place-content-center rounded-full border-2 ${index === i ? " border-primary" : "border-neutral-2"
                      }`}
                  >
                    {index === i && (
                      <div
                        className={`lg:size-[6px] xs:size-1 rounded-full bg-primary`}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-[2px] w-full">
              <div className="flex w-full justify-between items-center">
                <h3 className="text-b-2 text-neutral-2">
                  {noNin
                    ? "Temporary Payer ID"
                    : "National Identification Number"}
                </h3>
                <div className="relative">
                  <PiInfoLight
                    size={"20px"}
                    className="text-[#FF9500] cursor-help"
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
                  />
                  {
                    <div
                      className={`absolute text-[#004085] right-3 top-2 z-10 w-[380px] h-fit rounded-tr-none rounded-3xl bg-[#CFE8E7] size-10 p-4 flex flex-col gap-4 transition-all duration-300 ease-in-out 
            ${open ? "opacity-100 scale-100" : "opacity-0 scale-0"} `}
                    >
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-full">
                          <h2 className="font-semibold text-l-2">
                            {noNin
                              ? "What is a Payer Temporary ID?"
                              : "What is a NIN?"}
                          </h2>
                        </div>
                        {noNin ? (
                          <div className="flex flex-col items-start">
                            <p className="text-s-4 font-normal px-2">
                              &bull; A Payer Temporary ID is a unique identifier
                              issued during the registration process.
                            </p>
                            <p className="text-s-4 font-normal px-2">
                              &bull; It allows you to complete transactions or
                              make payments while your permanent ID is being
                              processed.
                            </p>
                            <p className="text-s-4 font-normal px-2">
                              &bull; Once your registration is fully verified,
                              your temporary ID will be replaced by a permanent
                              one.
                            </p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-start">
                            <p className="text-s-4 font-normal px-2">
                              &bull; A NIN (National Identification Number) is a
                              unique identification number assigned to
                              individuals by the government.
                            </p>
                            <p className="text-s-4 font-normal px-2">
                              &bull; It serves as a key identifier for accessing
                              various government services, such as applying for
                              loans, registering to vote and fulfilling tax
                              obligations.
                            </p>
                            <p className="text-s-4 font-normal px-2">
                              &bull; The NIN is essential for distinguishing
                              individuals within national databases.
                            </p>
                            <h2 className="font-semibold text-l-2 mt-2">
                              Forgotten your NIN?
                            </h2>
                            <p className="text-s-4 font-normal px-2">
                              &bull; You can dial{" "}
                              <span className="font-bold">*346#</span> on your
                              phone to retrieve your NIN.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  }
                </div>
              </div>
              <div className="w-full relative ">
                <input
                  type="text"
                  placeholder={`Enter your ${noNin ? "temporary Payer ID" : "NIN"
                    }`}
                  value={nin}
                  onChange={(e) => {
                    const res = e.target.value.replace(/,/g, "");
                    if (!isNaN(Number(res))) {
                      setNin(e.target.value);
                    }
                  }}
                  className="w-full text-b-1"
                  readOnly={noNin}
                />
              </div>

              <p className="text-s-3 font-nunito text-black mt-1">
                {noNin ? "Already have an NIN?" : "Don't have a NIN?"}{" "}
                <span
                  onClick={() => {
                    if (!noNin) {
                      setNoNin(true);
                      generatePayerID((val?: string) => {
                        if (val) {
                          setNin(val);
                        } else {
                          setNoNin(false);
                        }
                      });
                    } else {
                      setNin("");
                      setNoNin(false);
                    }

                  }}
                  className="text-primary font-bold cursor-pointer"
                >
                  Click Here
                </span>
              </p>

            </div>

            {index === 0 && <Individual hasNin={!noNin} />}
            {index === 1 && <Cooperate />}
          </div>
          <p className="text-b-1 text-black my-10">
            Already have an account?{" "}
            <span className="text-primary font-bold underline">
              <Link href={"/auth/login"}>LOGIN</Link>
            </span>
          </p>
        </div>
      </div>
      <Modal.Root
        opened={loadingPayerID}
        onClose={() => { }}
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
