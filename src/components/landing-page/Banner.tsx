import React from "react";
import Navbar from "../reusable/Navbar";

import Link from "next/link";

import Image, { StaticImageData } from "next/image";

import BillsImage from "@/public/pay_bills.svg";
import PinImage from "@/public/get_pin.svg";
import Invoice from "@/public/invoice.svg";

import { IconType } from "react-icons";

interface iBannerProps {
  image: StaticImageData;
  name: string;
  link: string;
}

const Banner = () => {
  const props: iBannerProps[] = [
    {
      image: BillsImage,
      name: "Make Payment",
      link: "/dashboard/make-payment",
    },
    {
      image: PinImage,
      name: "Generate Invoice",
      link: "/dashboard/generate-invoice",
    },
    {
      image: Invoice,
      name: "Validate Receipt",
      link: "/dashboard/validate-receipt",
    },
  ];

  return (
    <div className="w-[100vw] h-[100vh] md:h-auto bg-[url('../../public/image_266.png')] bg-cover bg-no-repeat bg-center">
      <div className="w-full h-full bg-[#005324] bg-opacity-[0.65] relative">
        <div className="bg-[url('../../public/image_269.png')] w-[60vw] h-auto bg-cover bg-no-repeat bg-center absolute" />
        <div className="flex flex-col z-5 bg-black bg-opacity-[0.4] w-full h-full px-20 md:px-0 py-5">
          <div className="md:px-2">
            <Navbar swap={false} active={-1} />
          </div>
          <hr className="mt-2 bg-white bg-opacity-[0.75]" />
          <div className="flex flex-col w-full h-[calc(100vh-132px)] md:h-[calc(100vh-100px)] justify-between items-center">
            <div className="pl-5 mt-10 md:mt-6 w-full">
              <h1 className="text-extra text-white font-bold">TARABA STATE</h1>
              <h2 className="text-[2rem] md:text-[1rem] leading-[2.2rem] md:leading-[1.4rem] text-secondary font-bold">
                BOARD OF INTERNAL REVENUE <br />
                SERVICE
              </h2>
            </div>

            <div className="w-full justify-center items-center flex flex-col gap-5 md:px-2">
              <div className="flex md:grid md:grid-cols-3 justify-center items-center gap-8 md:gap-2 w-full">
                {props.map((prop, i) => (
                  <Link
                    key={i}
                    href={prop.link}
                    className="flex flex-col gap-2 items-center py-5 md:py-3 px-8 md:px-0 bg-white rounded-2xl md:rounded-lg cursor-pointer"
                  >
                    <Image
                      src={prop.image}
                      alt="prop"
                      className="size-[80px] md:size-12 object-cover"
                      width={100}
                      height={100}
                    />
                    <p className="text-body md:text-smaller md:text-center text-[#333333] font-semibold">
                      {prop.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 w-[80%] md:w-full">
              <hr className="bg-white bg-opacity-[0.75] w-full" />
              <div className="h-6 md:h-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
