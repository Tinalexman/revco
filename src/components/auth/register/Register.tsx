"use client";

import React, { useState } from "react";
import Link from "next/link";

import { PiInfoLight } from "react-icons/pi";

import { motion } from "framer-motion";
import Cooperate from "./Cooperate";
import Individual from "./Individual";

interface iRegister {
  name: string;
  link: string;
}

const Register = () => {
  const [index, setIndex] = useState<number>(-1);
  const [nin, setNin] = useState<string>("");
  const [noNin, setNoNin] = useState<boolean>(false);
  const registerProps: string[] = ["Individual Account", "Cooperate"];

  return (
    <div className="w-full h-full flex items-center justify-center bg-background bg-opacity-[0.95] font-nunito">
      <div className="w-[400px] flex flex-col items-center gap-5 max-h-[90%] overflow-y-scroll scrollbar-custom">
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="flex flex-col gap-1 items-center">
            <motion.h1
              initial={{
                x: "100%",
              }}
              animate={{
                x: "0%",
                transition: {
                  duration: 1,
                  ease: "easeOut",
                },
              }}
              className="text-header font-bold text-black"
            >
              Create your account
            </motion.h1>
            <p className="text-smaller text-black">
              Fill in the form to finish registration, you can select the type
              of account you are registering.
            </p>
          </div>
          <div className="w-full justify-between items-center flex">
            {registerProps.map((rp, i) => (
              <div
                key={i}
                onClick={() => setIndex(i)}
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
          <div className="flex flex-col gap-[2px] w-full">
            <div className="flex w-full justify-between items-center">
              <h3 className="text-body text-neutral-2">
                National Identification Number
              </h3>
              <PiInfoLight size={"20px"} className="text-[#FF9500]" />
            </div>
            <input
              type="text"
              placeholder="Enter your NIN"
              value={nin}
              onChange={(e) => setNin(e.target.value)}
              className="w-full text-body"
            />
            <p className="text-hint font-nunito text-black mt-1">
              Don&apos;t have a NIN?{" "}
              <span
                onClick={() => setNoNin(true)}
                className="text-primary font-bold"
              >
                Click Here
              </span>
            </p>
          </div>

          {index === 0 && <Individual />}
          {index === 1 && <Cooperate />}
        </div>
        <p className="text-hint text-black">
          Already have an account?{" "}
          <span className="text-primary font-bold underline">
            <Link href={"/auth/login"}>LOGIN</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
