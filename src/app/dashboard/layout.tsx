"use client";

import Navbar from "@/src/components/reusable/Navbar";
import React, { FC, ReactNode } from "react";
import { RiLockPasswordLine } from "react-icons/ri";

import { usePathname } from "next/navigation";
import Powered from "@/src/components/reusable/Powered";

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
      case "view-receipt":
        return -10;
    }

    return -1;
  };

  const active = determineIndex();

  return (
    <div className="w-[100vw] lg:h-[100vh] bg-[url('../../public/image_263.png')] bg-cover bg-center bg-no-repeat">
      <div className="w-full h-full overflow-y-scroll flex flex-col items-center bg-white bg-opacity-[0.94]">
        <div className="left-0 right-0 top-0 w-full xs:bg-white lg:bg-transparent border-b border-gray-300">
          <div className="xs:px-5 lg:px-0">
            <Navbar swap={true} active={active} />
          </div>
        </div>

        <div className="w-full flex flex-col items-center xs:px-5 lg:px-0 xs:mt-20 2xl:mt-28 xs:h-[calc(100vh-5rem)] lg:h-fit">
          {children}
          {active !== -10 && <Powered />}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
