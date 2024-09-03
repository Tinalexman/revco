"use client";

import React, { ReactNode, FC } from "react";

import { MdOutlineDoneAll } from "react-icons/md";

interface iAuthLayout {
  children: ReactNode;
}

const AuthLayout: FC<iAuthLayout> = ({ children }) => {
  return (
    <div className="w-[100vw] h-[100vh] xl:h-[100vh] xl:w-[100vw] 2xl:w-[100vw] 2xl:h-[100vh] 3xl:w-[100vw] 3xl:h-[100vh] 4xl:w-[100vw] 4xl:h-[100vh] flex">
      <div className="w-[50vw] xl:h-[100vh] xl:w-[50vw] 2xl:w-[50vw] 2xl:h-[100vh] 3xl:w-[50vw] 3xl:h-[100vh] 4xl:w-[50vw] 4xl:h-[100vh] xs:hidden lg:block h-full bg-[url('../../public/image_264.png')] bg-cover bg-no-repeat bg-center">
        <div className="bg-primary bg-opacity-[0.53] w-full h-full flex flex-col justify-center items-center relative">
          <div className="bg-[url('../../public/image_262.png')] bg-opacity-40 w-full h-full bg-cover bg-no-repeat bg-center absolute" />
          <div className="flex flex-col lg:w-[70%] xl:w-[65%] 2xl:w-[60%] lg:gap-3 xl:gap-4 2xl:gap-5 3xl:gap-6 z-5 ">
            <h1 className="text-h-2 font-semibold text-white ">
              Easily and securely pay your Taraba State taxes online, POS or at
              any bank branch
            </h1>
            <h2 className="text-white text-l-1 font-semibold">Required:</h2>
            <div className="flex lg:gap-2.5 xl:gap-3 2xl:gap-4 3xl:gap-5 4xl:gap-6 text-b-1 items-center text-white">
              <MdOutlineDoneAll />
              <p>NIN</p>
            </div>
            <div className="flex lg:gap-2.5 xl:gap-3 2xl:gap-4 3xl:gap-5 4xl:gap-6 text-b-1 items-center text-white">
              <MdOutlineDoneAll />
              <p>Email address and password</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:w-[50vw] lg:h-[100vh] xs:w-full xs:h-full bg-[url('../../public/image_263.png')] bg-cover bg-no-repeat bg-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
