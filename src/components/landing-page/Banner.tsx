import React from "react";
import Navbar from "../reusable/Navbar";

import Link from "next/link";

import Image, { StaticImageData } from "next/image";

import BillsImage from "@/public/pay_bills.svg";
import PinImage from "@/public/get_pin.svg";
import Invoice from "@/public/invoice.svg";

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
    <div className="w-[100vw] xl:h-[100vh] xs:h-[100vh] bg-[url('../../public/image_266.png')] bg-cover bg-no-repeat bg-center">
      <div className="w-full h-full bg-[#005324] bg-opacity-[0.65] relative">
        <div className="bg-[url('../../public/image_269.png')] w-[60vw] h-auto bg-cover bg-no-repeat bg-center absolute" />
        <div className="flex flex-col z-5 bg-black bg-opacity-[0.4] w-full h-full lg:px-10 xl:px-16">
          <div className="lg:py-6 xs:py-5">
            <div className="xs:px-5">
              <Navbar swap={false} active={-1} />
            </div>
            <hr className="bg-white bg-opacity-[0.75]" />
          </div>

          <div className="flex flex-col w-full lg:mt-[4rem] xl:mt-[6.7rem] xs:mt-[5.75rem] xl:gap-[11.5rem] lg:gap-[6rem] xs:gap-[3.5rem]">
            <div className="lg:pl-10 xs:px-2 lg:w-[45%] xl:w-[55%] xs:w-full flex flex-col xl:gap-3">
              <h1 className="text-extra text-white font-bold">
                Invest in Taraba Future
              </h1>
              <h2 className="text-subextra text-white xl:block xs:hidden">
                Your tax contributions are the foundation of progress. <br />
                Your Tax, Your Contribution to a Greater Taraba State.
              </h2>
              <h2 className="text-subextra text-white xs:block xl:hidden">
                Your tax contributions are the foundation of progress. Your Tax,
                Your Contribution to a Greater Taraba State.
              </h2>
            </div>

            <div className="w-full grid place-content-center xs:px-2">
              <div className="grid grid-cols-3 lg:gap-8 xs:gap-2 xl:w-[40rem] lg:w-[39rem] xs:w-full">
                {props.map((prop, i) => (
                  <Link
                    key={i}
                    href={prop.link}
                    className="flex flex-col xl:gap-2 xs:gap-2 items-center xl:py-4 xs:py-3 xl:px-6 xs:px-4 bg-white rounded-2xl xs:rounded-lg cursor-pointer"
                  >
                    <Image
                      src={prop.image}
                      alt="prop"
                      className="xl:size-[6.25rem] lg:size-[5rem] xs:size-[4.5rem] object-cover"
                      width={100}
                      height={100}
                    />
                    <p className="text-b-1 text-center text-[#333333] font-semibold">
                      {prop.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
