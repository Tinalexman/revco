"use client";

import React, { ReactNode, FC } from "react";

import Image from "next/image";
import Background from "@/public/image 264.png";

interface iAuthLayout {
  children: ReactNode;
}

const AuthLayout: FC<iAuthLayout> = ({ children }) => {
  return (
    <div className="w-[100vw] h-[100vh] flex">
      <div className="w-[50%] h-full bg-[url('../../public/image 264.png')] bg-cover bg-no-repeat bg-center"></div>

      <div className="w-[50%] h-full bg-background font-nunito">{children}</div>
    </div>
  );
};

export default AuthLayout;
