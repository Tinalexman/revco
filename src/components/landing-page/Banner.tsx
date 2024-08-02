import React from "react";
import Navbar from "../reusable/Navbar";

import Link from "next/link";

import Image, { StaticImageData } from "next/image";

import BillsImage from "@/public/pay_bills.png";
import PinImage from "@/public/get_pin.png";
import Invoice from "@/public/invoice.png";

import { MdOutlineGroups2 } from "react-icons/md";
import { IconType } from "react-icons";

interface iBannerProps {
  image: StaticImageData;
  name: string;
  link: string;
}

interface iBottomLink {
  name: string;
  icon: IconType;
}

const Banner = () => {
  const props: iBannerProps[] = [
    {
      image: BillsImage,
      name: "Pay Bills",
      link: "/pay-bills",
    },
    {
      image: PinImage,
      name: "Generate PIN",
      link: "/generate-pin",
    },
    {
      image: Invoice,
      name: "Validate Invoice",
      link: "/validate-receipt",
    },
  ];

  const bottomLinks: iBottomLink[] = Array(4).fill({
    name: "Item One",
    icon: MdOutlineGroups2,
  });

  return (
    <div className="w-[100vw] h-[100vh]  bg-[url('../../public/image_266.png')] bg-cover bg-no-repeat bg-center">
      <div className="w-full h-full bg-[#005324] bg-opacity-[0.65] px-16 py-5 relative">
        {/* <div className="bg-[url('../../public/image_262.png')] w-full h-full bg-cover bg-no-repeat bg-center absolute" /> */}
        <div className="flex flex-col z-5">
          <Navbar />
          <hr className="mt-5 bg-white bg-opacity-[0.75]" />
          <div className="flex flex-col w-full h-[calc(100vh-132px)] justify-between items-center">
            <div className="pl-5 mt-14 w-full">
              <h1 className="text-extra font-quantico text-white font-bold">
                TARABA STATE
              </h1>
              <h2 className="text-title font-quantico text-secondary font-bold">
                INTERNAL REVENUE SERVICE
              </h2>
            </div>
            <div className="flex justify-center items-center gap-8 w-full">
              {props.map((prop, i) => (
                <Link
                  key={i}
                  href={prop.link}
                  className="flex flex-col gap-2 items-center px-10 py-4"
                >
                  <Image
                    src={prop.image}
                    alt="prop"
                    className="size-[100px] object-cover"
                    width={100}
                    height={100}
                  />
                  <p className="text-body text-white font-nunito">
                    {prop.name}
                  </p>
                </Link>
              ))}
            </div>
            <div className="flex flex-col items-center gap-4 w-[80%]">
              <hr className="bg-white bg-opacity-[0.75] w-full" />
              <div className="w-full justify-center gap-14 items-center flex text-white font-nunito">
                {bottomLinks.map((bl, i) => {
                  const Icon = bl.icon;
                  return (
                    <div className="flex gap-[10px] w-fit items-center" key={i}>
                      <Icon size={"24px"} />
                      <p className="text-small">{bl.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
