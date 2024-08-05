"use client";

import React, { ReactNode, FC } from "react";

import { MdOutlineDoneAll } from "react-icons/md";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

interface iAuthLayout {
  children: ReactNode;
}

const AuthLayout: FC<iAuthLayout> = ({ children }) => {
  return (
    <>
      <Toaster />
      <div className="w-[100vw] h-[100vh] flex">
        <div className="w-[50%] h-full bg-[url('../../public/image_264.png')] bg-cover bg-no-repeat bg-center font-bai">
          <div className="bg-primary bg-opacity-[0.53] w-full h-full flex flex-col justify-center items-center relative">
            <div className="bg-[url('../../public/image_262.png')] w-full h-full bg-cover bg-no-repeat bg-center absolute" />
            <div className="flex flex-col w-[280px] gap-3 z-5 ">
              <motion.h1
                initial={{
                  y: "-75%",
                }}
                animate={{
                  y: "0%",
                  transition: {
                    duration: 2,
                    ease: "easeInOut",
                    type: "spring",
                    bounce: 0.75,
                  },
                }}
                className="text-title font-semibold text-white "
              >
                Access Your Online Billing Account
              </motion.h1>
              <h2 className="text-white text-subtitle font-semibold">
                Required:
              </h2>
              <motion.div
                animate={{
                  x: ["-2%", "0%", "-2%"],
                  transition: {
                    duration: 5,
                    ease: "easeInOut",
                    repeat: Infinity,
                  },
                }}
                className="flex gap-[10px] items-center text-white"
              >
                <MdOutlineDoneAll size={"20px"} />
                <p className="text-body">NIN</p>
              </motion.div>
              <motion.div
                animate={{
                  x: ["2%", "0%", "2%"],
                  transition: {
                    duration: 5,
                    ease: "easeInOut",
                    repeat: Infinity,
                  },
                }}
                className="flex gap-[10px] items-center text-white"
              >
                <MdOutlineDoneAll size={"20px"} />
                <p className="text-body">Email address and password</p>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="w-[50%] h-full bg-[url('../../public/image_263.png')] bg-cover bg-no-repeat bg-center">
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
