import React from "react";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/image_261.png";
import { IconType } from "react-icons";

import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

interface iQuickLink {
  name: string;
  link: string;
}

interface iSocialLink {
  icon: IconType;
  link: string;
}

const Footer = () => {
  const quickLinks: iQuickLink[] = [
    {
      name: "Download Receipt",
      link: "/dashboard/download-receipt",
    },
    {
      name: "Contact Us",
      link: "/",
    },
    {
      name: "Make Payment",
      link: "/dashboard/make-payment",
    },
  ];

  const socialLinks: iSocialLink[] = [
    {
      icon: FaFacebookF,
      link: "",
    },
    {
      icon: FaXTwitter,
      link: "",
    },
    {
      icon: AiFillInstagram,
      link: "",
    },
    {
      icon: FaLinkedinIn,
      link: "",
    },
    {
      icon: FaYoutube,
      link: "",
    },
  ];

  return (
    <footer className="w-full bg-white 2xl:p-20 3xl:p-24 4xl:p-28 xl:p-16 lg:p-10 xs:px-2 xs:py-8 gap-8 flex flex-col">
      <div className="w-full flex xl:flex-row lg:flex-row xs:flex-col xl:gap-[14rem] lg:gap-[12rem] xs:gap-8">
        <div className="flex flex-col gap-5 xl:w-[21rem] 2xl:w-[25rem] 3xl:w-[30rem] 4xl:w-[36rem] lg:w-[20rem] xs:w-full">
          <Link href={"/"} className={`flex items-center gap-2 w-fit `}>
            <Image
              src={Logo}
              alt="logo"
              className="xl:size-[3.25rem] 2xl:size-[4rem] 3xl:size-[4.5rem] 4xl:size-[5.5rem] lg:size-[3.15rem] xs:size-[3rem] object-cover"
              width={72}
              height={72}
            />
            <div className="xs:hidden lg:block">
              <h2 className={`text-nav font-podkova font-bold text-[#333333]`}>
                TARABA STATE
              </h2>
              <p className="text-[#DA251D] text-s-1">
                BOARD OF INTERNAL REVENUE SERVICE
              </p>
            </div>
          </Link>
          <p className="text-s-4 text-[#333333] ">
            Experience the easy and secure way to pay your taxes or bills owed
            to the Taraba state government revenue services.
          </p>
        </div>

        <div className="flex xl:flex-row lg:flex-row xs:flex-col w-fit xl:gap-16 2xl:gap-20 3xl:gap-24 4xl:gap-28 lg:gap-10 xs:gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-l-3 text-primary-2 xl:gap-2 font-bold">
              Quick Link
            </h2>
            {quickLinks.map((ql, i) => (
              <Link
                key={i}
                href={ql.link}
                className="text-body font-light text-[#333333]"
              >
                {ql.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-l-3 text-primary-2 font-bold">
              Connect With Us
            </h2>
            <div className="xl:gap-6 xs:gap-4 flex items-center text-[#003316]">
              {socialLinks.map((sl, i) => {
                const Icon = sl.icon;
                return (
                  <Link key={i} href={sl.link} target="__blank">
                    <Icon size={"26px"} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border-t-[1px] pt-4 border-grey-18 text-[#333333] text-s-4 grid place-items-center">
        © Copyright {new Date().getFullYear()}, All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
