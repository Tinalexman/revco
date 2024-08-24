"use client";

import Navbar from "@/src/components/reusable/Navbar";
import React, { FC, ReactNode } from "react";
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
    <div className="w-[100vw] lg:h-[100vh] bg-[url('../../public/image_263.png')] bg-cover bg-center bg-no-repeat">
      <div className="w-full h-full overflow-y-scroll xs:pb-2 xs:px-0 lg:px-10 xl:px-16 2xl:px-20 3xl:px-24 4xl:px-32 flex flex-col items-center bg-background bg-opacity-[0.95] relative">
        <div className="xs:left-0 xs:right-0 lg:left-10 lg:right-10 xl:left-16 xl:right-16 2xl:left-20 2xl:right-20 3xl:left-24 3xl:right-24 4xl:left-32 4xl:right-32 lg:py-6 2xl:py-10 3xl:py-12 xs:py-2 z-50 fixed xs:bg-background lg:bg-transparent">
          <div className="xs:px-5">
            <Navbar swap={true} active={active} />
          </div>
        </div>

        <div className="py-10 xs:mt-20 lg:mt-32 xl:mt-44 2xl:mt-60 3xl:mt-72 4xl:mt-96">
          {children}
        </div>
        <div className="text-s-4 xs:py-2 xs:px-3 2xl:py-4 2xl:px-5 bg-white border-2 text-black border-[#E6E6E6] rounded-[6px] flex items-center justify-center gap-1 font-nunito mt-1">
          <RiLockPasswordLine className="text-l-1" />
          <p>
            Powered by <span className="text-tertiary font-bold">paysure</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
