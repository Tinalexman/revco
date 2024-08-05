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
      link: "/dashboard/contact-us",
    },
    {
      name: "Pay Bills",
      link: "/dashboard/pay-bills",
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
    <div className="w-full bg-white px-20 md:px-5 py-16 md:py-5 gap-8 flex flex-col font-nunito">
      <div className="w-full flex md:flex-col gap-[200px] md:gap-10">
        <div className="flex flex-col gap-5 w-[340px] md:w-full">
          <Image
            src={Logo}
            alt="logo"
            className="size-16 object-cover"
            width={64}
            height={64}
          />
          <p className="text-smaller text-[#333333] ">
            Experience the easy and secure way to pay your taxes or bills owed
            to the Taraba state government revenue services.
          </p>
        </div>
        <div className="flex md:flex-col w-fit gap-16 md:gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-subtitle text-primary-2 font-bold">
              Quick Link
            </h2>
            {quickLinks.map((ql, i) => (
              <Link
                key={i}
                href={ql.link}
                className="text-body font-medium text-[#333333]"
              >
                {ql.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-subtitle text-primary-2 font-bold">
              Connect With Us
            </h2>
            <div className="gap-6 flex items-center text-[#003316]">
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
      <div className="w-full border-t-[1px] pt-4 border-grey-18 text-[#333333] text-smaller grid place-items-center">
        © Copyright {new Date().getFullYear()}, All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
