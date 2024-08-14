"use client";

import React, { FC, useState, useRef, useEffect } from "react";

import Image from "next/image";
import Logo from "@/public/image_261.png";
import Link from "next/link";

import { IoMdArrowDropdown } from "react-icons/io";

import { GoHistory } from "react-icons/go";
import { TbFileDownload } from "react-icons/tb";
import { BiLogOutCircle } from "react-icons/bi";

import { Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoCloseOutline } from "react-icons/io5";
import { HiMenu } from "react-icons/hi";

import useStore from "@/src/stores/useStore";
import { useGlobalStore } from "@/src/stores/globalStore";

interface iNav {
  name: string;
  link: string;
}

const Navbar: FC<{ swap: boolean; active: number }> = ({ swap, active }) => {
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

  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [openedDrawer, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  const logout = () => {
    useGlobalStore.setState({ loggedIn: false });
    window.location.replace("/");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const signedIn = useStore(useGlobalStore, (state: any) => state.loggedIn);
  const firstName = useStore(useGlobalStore, (state: any) => state.firstName);
  const lastName = useStore(useGlobalStore, (state: any) => state.lastName);

  return (
    <>
      <nav
        className={`flex w-full ${
          swap && "md:bg-white"
        } md:px-5 items-center justify-between h-[72px] md:h-14`}
      >
        <div className="flex gap-4 w-fit h-full items-center">
          <HiMenu
            size={26}
            className={`md:block hidden ${
              swap ? "text-black" : "text-white"
            } cursor-pointer text-header`}
            onClick={openDrawer}
          />
          <Link
            href={"/"}
            className={`flex items-center gap-2 ${
              swap ? "max-w-[20rem]" : "w-fit md:w-[50%]"
            } `}
          >
            <Image
              src={Logo}
              alt="logo"
              className="size-[72px] md:size-[42px] object-cover"
              width={72}
              height={72}
            />
            {swap && (
              <h2 className="text-subtitle font-bold text-[#333333]">
                Taraba State Board of Internal Revenue Service
              </h2>
            )}
          </Link>
        </div>
        <div className="w-fit flex items-center gap-5 md:hidden">
          {links.map((ln, i) => (
            <Link
              href={ln.link}
              key={i}
              className={`text-small font-nunito ${
                active === i
                  ? "text-primary font-bold underline"
                  : swap
                  ? "text-black font-semibold"
                  : "text-white font-semibold"
              }`}
            >
              {ln.name}{" "}
            </Link>
          ))}
        </div>
        {!signedIn && (
          <div className="flex items-center gap-5 w-fit md:hidden">
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
          <div
            ref={dropdownRef}
            onClick={() => setOpen(!open)}
            className="md:hidden"
          >
            <div
              className={`${
                !swap ? "text-white" : "text-black"
              } flex items-center gap-2 md:gap-1 w-fit cursor-pointer`}
            >
              <div className="bg-[#B0DDC3] grid place-content-center rounded-full size-9 text-body font-semibold">
                {lastName.charAt(0)}
              </div>
              <p className="text-body md:hidden">
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
                    logout();
                  }}
                >
                  <BiLogOutCircle size={"16px"} />
                  Sign Out
                </div>
              </div>
            )}
          </div>
        )}
        {signedIn && (
          <div
            className={`${
              !swap ? "text-white" : "text-black"
            } items-center gap-2 md:gap-1 cursor-pointer md:flex hidden`}
          >
            <div className="bg-[#B0DDC3] grid place-content-center rounded-full size-9 text-body font-semibold">
              {lastName.charAt(0)}
            </div>
          </div>
        )}
      </nav>
      <Drawer.Root
        opened={openedDrawer}
        onClose={closeDrawer}
        padding={0}
        top={0}
        position="top"
        size={"100%"}
      >
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Body>
            <div className="w-full h-[100vh] md:h-auto flex flex-col px-3 py-2 gap-5 bg-white">
              <div className="w-full flex justify-between items-center">
                <Image
                  src={Logo}
                  alt="logo"
                  className="size-12 object-cover"
                  width={48}
                  height={48}
                />
                <IoCloseOutline
                  className="text-black text-header"
                  onClick={closeDrawer}
                  size={26}
                />
              </div>

              {signedIn && (
                <div className="w-full flex flex-col gap-3 mt-5">
                  <div className="flex w-fit items-center gap-3 text-black">
                    <div className="bg-[#B0DDC3] grid place-content-center rounded-full size-9 text-body font-semibold">
                      {lastName.charAt(0)}
                    </div>
                    <p className="text-body font-medium">
                      {firstName} {lastName}
                    </p>
                  </div>

                  <Link
                    className="mt-5 w-fit cursor-pointer text-body font-medium font-nunito text-black"
                    href={"/dashboard/transaction-history"}
                  >
                    Transaction History
                  </Link>
                  <Link
                    className="w-fit cursor-pointer text-body font-medium font-nunito text-black"
                    href={"/dashboard/download-receipt"}
                  >
                    Download Receipt
                  </Link>
                </div>
              )}

              <div className="w-fit flex flex-col gap-3 mt-5">
                {links.map((ln, i) => (
                  <Link
                    href={ln.link}
                    key={i}
                    className={`text-body ${
                      active === i
                        ? "text-primary font-bold underline"
                        : "font-medium text-black"
                    } font-nunito`}
                  >
                    {ln.name}
                  </Link>
                ))}
              </div>

              {!signedIn && (
                <div className="flex flex-col items-center gap-3 w-full mt-6">
                  <Link
                    href={"/auth/register"}
                    className={` bg-primary-light text-primary w-full h-10 flex justify-center items-center rounded-full text-small font-semibold font-nunito `}
                  >
                    Register
                  </Link>
                  <Link
                    href={"/auth/login"}
                    className="w-full h-10 flex justify-center items-center rounded-full bg-primary text-small font-semibold font-nunito text-white"
                  >
                    Login
                  </Link>
                </div>
              )}

              {signedIn && (
                <div
                  className="w-fit cursor-pointer text-body font-semibold font-nunito text-error mt-20"
                  onClick={() => {
                    logout();
                  }}
                >
                  Sign Out
                </div>
              )}
            </div>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
};

export default Navbar;
