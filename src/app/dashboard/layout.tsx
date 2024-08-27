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
      <div className="w-full h-full overflow-y-scroll flex flex-col items-center bg-background bg-opacity-[0.95] ">
        <div className="left-0 right-0 top-0 z-50 fixed xs:bg-background lg:bg-transparent">
          <div className="xs:px-5">
            <Navbar swap={true} active={active} />
          </div>
        </div>

        <div className="w-full flex flex-col items-center xs:mt-20 lg:mt-32 xl:mt-40 2xl:mt-48 3xl:mt-56 xs:h-[calc(100vh-5rem)] relative pb-60">
          {children}
          <div className="lg:w-[200px] xl:w-[250px] text-s-4 py-2 bg-white border-2 text-black border-[#E6E6E6] rounded-[6px] flex items-center justify-center gap-1 absolute bottom-5">
            <RiLockPasswordLine className="text-l-1" />
            <p>
              Powered by{" "}
              <span className="text-tertiary font-bold">paysure</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
