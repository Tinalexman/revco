"use client";

import Navbar from "@/src/components/reusable/Navbar";
import React, { FC, ReactNode, useState, useEffect } from "react";
import { RiLockPasswordLine } from "react-icons/ri";

import { usePathname } from "next/navigation";

interface iDashboardLayout {
  children: ReactNode;
}

const DashboardLayout: FC<iDashboardLayout> = ({ children }) => {
  const pathName = usePathname();

  const determineIndex = () => {
    const current = pathName.split("/")[2];
    switch (current) {
      case "make-payment":
        return 0;
      case "generate-invoice":
        return 1;
      case "validate-receipt":
        return 2;
    }

    return -1;
  };

  const active = determineIndex();

  return (
    <div className="w-[100vw] h-[100vh] bg-[url('../../public/image_263.png')] bg-cover bg-center bg-no-repeat">
      <div className="w-full h-full px-16 md:px-0 pb-2 flex flex-col items-center bg-background bg-opacity-[0.95]">
        <Navbar swap={true} active={active} />
        <div className="mt-5 w-full h-[1px] bg-[#373737] bg-opacity-30 md:hidden" />
        <div className="flex flex-col w-full h-[calc(100vh-165px)] md:h-auto md:px-5 justify-between items-center">
          {children}
        </div>
        <div className="w-[180px] md:w-[140px] h-10 md:h-9 bg-white border-2 text-black border-[#E6E6E6] rounded-[6px] flex items-center justify-center gap-1 font-nunito mt-1">
          <RiLockPasswordLine size={16} />
          <p className="text-smaller">
            Powered by <span className="text-tertiary font-bold">paysure</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
