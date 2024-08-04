import { Metadata } from "next";
import Image, { StaticImageData } from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

interface iBannerProps {
  image: StaticImageData;
  name: string;
  link: string;
}

import BillsImage from "@/public/pay_bills.png";
import PinImage from "@/public/get_pin.png";
import Invoice from "@/public/invoice.png";
import Link from "next/link";

const Dashboard = () => {
  const props: iBannerProps[] = [
    {
      image: BillsImage,
      name: "Pay Bills",
      link: "/dashboard/pay-bills",
    },
    {
      image: PinImage,
      name: "Generate PIN",
      link: "/dashboard/generate-pin",
    },
    {
      image: Invoice,
      name: "Validate Invoice",
      link: "/dashboard/validate-invoice",
    },
  ];

  return (
    <div className="flex flex-col pt-16 items-center gap-8 w-full h-full">
      <h2 className="text-header font-bold text-neutral-2">
        What would you like to do?
      </h2>
      <div className="flex w-full gap-8 items-center justify-center">
        {props.map((prop, i) => (
          <Link
            key={i}
            href={prop.link}
            className="flex flex-col gap-2 items-center px-6 py-4 bg-white shadow-custom-1 rounded-[8px]"
          >
            <Image
              src={prop.image}
              alt="prop"
              className="size-[8rem] object-cover"
              width={80}
              height={80}
            />
            <p className="text-small font-semibold text-black  font-nunito">
              {prop.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
