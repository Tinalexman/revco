"use client";

import React, { ReactNode, FC } from "react";

import Image from "next/image";

interface iAuthLayout {
  children: ReactNode;
}

const AuthLayout: FC<iAuthLayout> = ({ children }) => {
  return (
    <div className="w-[100vw] h-[100vh] flex font-nunito">
      <div className="w-[50%] h-full bg-[url('../../public/image_264.png')] bg-cover bg-no-repeat bg-center">
        <div className="bg-primary bg-opacity-[0.53] w-full h-full flex flex-col"></div>
      </div>

      <div className="w-[50%] h-full bg-[url('../../public/image_263.png')] bg-cover bg-no-repeat bg-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
