"use client";

import React, { FC, useState, useRef, useEffect } from "react";

import Image from "next/image";
import Logo from "@/public/image_261.png";
import Link from "next/link";

import { IoMdArrowDropdown } from "react-icons/io";

import { GoHistory } from "react-icons/go";
import { TbFileDownload } from "react-icons/tb";
import { BiLogOutCircle } from "react-icons/bi";

interface iNav {
  name: string;
  link: string;
}

const Navbar: FC<{ swap: boolean }> = ({ swap }) => {
  const links: iNav[] = [
    {
      name: "Pay Bills",
      link: "/dashboard/pay-bills",
    },
    {
      name: "Generate PIN",
      link: "/dashboard/generate-pin",
    },
    {
      name: "Validate Invoice",
      link: "/dashboard/validate-invoice",
    },
  ];

  const signedIn: boolean = true;
  const firstName: string = "Micheal";
  const lastName: string = "Adalikwu";

  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex w-full items-center justify-between h-[72px]">
      <Link
        href={"/"}
        className={`flex items-center gap-2 ${
          swap ? "max-w-[18rem]" : "w-fit"
        } `}
      >
        <Image
          src={Logo}
          alt="logo"
          className="size-[72px] object-cover"
          width={72}
          height={72}
        />
        {!swap && (
          <h2 className="text-subtitle font-bold text-[#333333]">
            Taraba State Internal Revenue Service
          </h2>
        )}
      </Link>
      <div className="w-fit flex items-center gap-5">
        {links.map((ln, i) => (
          <Link
            href={ln.link}
            key={i}
            className={`text-small font-semibold font-nunito ${
              swap ? "text-black" : "text-white"
            }`}
          >
            {ln.name}{" "}
          </Link>
        ))}
      </div>
      {!signedIn && (
        <div className="flex items-center gap-5 w-fit">
          <Link
            href={"/auth/register"}
            className={`${
              swap
                ? "bg-primary-light text-primary"
                : "border-2 border-white text-white hover:border-primary border-opacity-[0.28] hover:border-opacity-100"
            } w-[150px] h-10 flex justify-center items-center rounded-full  text-small font-semibold font-nunito  transition-all duration-300 ease-out`}
          >
            Register
          </Link>
          <Link
            href={"/auth/login"}
            className="w-[150px] h-10 flex justify-center items-center rounded-full bg-primary text-small font-semibold font-nunito text-white"
          >
            Login
          </Link>
        </div>
      )}
      {signedIn && (
        <div ref={dropdownRef} onClick={() => setOpen(!open)}>
          <div
            className={`${
              !swap ? "text-white" : "text-black"
            } flex items-center gap-2 w-fit cursor-pointer`}
          >
            <div className="bg-[#B0DDC3] grid place-content-center rounded-full size-9 text-body font-semibold">
              {lastName.charAt(0)}
            </div>
            <p className="text-body">
              {firstName} {lastName}
            </p>
            <IoMdArrowDropdown size={"16px"} />
          </div>
          {open && (
            <div className="absolute z-10 top-20 w-[13.5rem] rounded-[8px] bg-white p-2 flex flex-col gap-2">
              <div
                className="w-full cursor-pointer hover:bg-[#F1F2F0] flex items-center gap-2 px-2 py-1 rounded-md text-black"
                onClick={() => {
                  setOpen(false);
                  window.location.assign("/dashboard/transaction-history");
                }}
              >
                <GoHistory size={"16px"} />
                Transaction History
              </div>
              <div
                className="w-full cursor-pointer hover:bg-[#F1F2F0] flex items-center gap-2 px-2 py-1 rounded-md text-black"
                onClick={() => {
                  setOpen(false);
                  window.location.assign("/dashboard/download-receipt");
                }}
              >
                <TbFileDownload size={"16px"} />
                Download Receipt
              </div>
              <div
                className="w-full cursor-pointer hover:bg-[#F1F2F0] flex items-center gap-2 px-2 py-1 rounded-md text-black"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <BiLogOutCircle size={"16px"} />
                Sign Out
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
