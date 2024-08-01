import React from "react";
import Navbar from "../reusable/Navbar";

import Image from "next/image";

import BillsImage from "@/public/pay_bills.png";
import PinImage from "@/public/get_pin.png";
import Invoice from "@/public/invoice.png";

const Banner = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-[url('../../public/image_266.png')] bg-cover bg-no-repeat bg-center">
      <div className="w-full h-full bg-[#005324] bg-opacity-[0.65] px-16 py-5 relative">
        {/* <div className="bg-[url('../../public/image_262.png')] w-full h-full bg-cover bg-no-repeat bg-center absolute" /> */}
        <div className="flex flex-col z-5">
          <Navbar />
          <hr className="mt-5  bg-white bg-opacity-[0.75]" />
          <div className="flex flex-col w-full h-full justify-between">
            <div className="pl-5 mt-16">
              <h1 className="text-extra font-quantico text-white font-bold">
                TARABA STATE
              </h1>
              <h2 className="text-title font-quantico text-secondary font-bold">
                INTERNAL REVENUE SERVICE
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
