"use client";

import Navbar from "@/src/components/reusable/Navbar";
import React, { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import { RiLockPasswordLine } from "react-icons/ri";

interface iPaymentLayout {
  children: ReactNode;
}

const PaymentLayout: FC<iPaymentLayout> = ({ children }) => {
  return (
    <>
      <Toaster />
      <div className="w-[100vw] h-[100vh] bg-[url('../../public/image_263.png')] bg-cover bg-center bg-no-repeat">
        <div className="w-full h-full px-16 pt-5 pb-2 flex flex-col items-center bg-background bg-opacity-[0.95] font-nunito">
          <Navbar swap={true} />
          <div className="mt-5 w-full h-[1px] bg-[#373737] bg-opacity-30 " />
          <div className="flex flex-col w-full h-[calc(100vh-165px)] justify-between items-center">
            {children}
          </div>
          <div className="w-[180px] h-[40px] bg-white border-2 text-black border-[#E6E6E6] rounded-[6px] flex items-center justify-center gap-1 font-nunito mt-1">
            <RiLockPasswordLine size={16} />
            <p className="text-smaller">
              Powered by{" "}
              <span className="text-tertiary font-bold">paysure</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentLayout;
