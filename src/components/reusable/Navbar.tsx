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
      name: "Make Payment",
      link: "/dashboard/make-payment",
    },
    {
      name: "Generate Invoice",
      link: "/dashboard/generate-invoice",
    },
    {
      name: "Validate Receipt",
      link: "/dashboard/validate-receipt",
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
    closeDrawer();
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
        className={`flex w-full lg:px-16 lg:py-6 xs:pb-2 items-center justify-between`}
      >
        <Link href={"/"} className={`flex items-center gap-2 w-fit `}>
          <Image
            src={Logo}
            alt="logo"
            className="xl:size-[3.25rem] 2xl:size-[4rem] 3xl:size-[4.5rem] 4xl:size-[5.5rem] lg:size-[3.15rem] xs:size-[3rem] object-cover"
            width={72}
            height={72}
          />
          <div className="xs:hidden lg:block">
            <h2
              className={`text-nav font-podkova font-bold ${
                !swap ? "text-white" : "text-[#333333]"
              }`}
            >
              TARABA STATE
            </h2>
            <p className="text-[#DA251D] text-s-1">
              BOARD OF INTERNAL REVENUE SERVICE
            </p>
          </div>
        </Link>
        <div className="w-fit hidden items-center lg:gap-5 lg:flex">
          {links.map((ln, i) => (
            <Link
              href={ln.link}
              key={i}
              className={`text-s-2 p-2.5 ${
                active === i
                  ? "text-primary font-bold underline"
                  : swap
                  ? "text-black font-medium"
                  : "text-white font-medium"
              }`}
            >
              {ln.name}{" "}
            </Link>
          ))}
        </div>

        {!signedIn && (
          <div className="lg:flex items-center gap-5 w-fit hidden">
            <Link
              href={"/auth/register"}
              className={`${
                swap
                  ? "bg-primary-light text-primary"
                  : "border-2 border-white text-white hover:border-primary border-opacity-[0.28] hover:border-opacity-100"
              } lg:w-[150px] 2xl:w-[220px] lg:h-10 2xl:h-12 flex justify-center items-center rounded-full text-s-3 font-semibold font-nunito transition-all duration-300 ease-out`}
            >
              Register
            </Link>
            <Link
              href={"/auth/login"}
              className="lg:w-[150px] 2xl:w-[220px] lg:h-10 2xl:h-12 flex justify-center items-center rounded-full bg-primary text-s-3 font-semibold font-nunito text-white"
            >
              Login
            </Link>
          </div>
        )}
        {signedIn && (
          <div
            ref={dropdownRef}
            onClick={() => setOpen(!open)}
            className="hidden lg:block"
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
            {/* {open && (
              
            )} */}
            <div
              className={`absolute transition-all duration-300 ease-out z-10 top-16 w-[13.5rem] rounded-[8px] bg-white flex flex-col gap-2 ${
                open ? "p-2 h-auto" : "h-0 max-h-0 min-h-0 overflow-hidden p-0"
              }`}
            >
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
          </div>
        )}

        <HiMenu
          size={26}
          className={`lg:hidden xs:block ${
            swap ? "text-black" : "text-white"
          } cursor-pointer text-header`}
          onClick={openDrawer}
        />
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

                  <div
                    className="mt-5 w-fit cursor-pointer text-body font-medium font-nunito text-black"
                    onClick={() => {
                      closeDrawer();
                      window.location.assign("/dashboard/transaction-history");
                    }}
                  >
                    Transaction History
                  </div>
                  <div
                    className="w-fit cursor-pointer text-body font-medium font-nunito text-black"
                    onClick={() => {
                      closeDrawer();
                      window.location.assign("/dashboard/download-receipt");
                    }}
                  >
                    Download Receipt
                  </div>
                </div>
              )}

              <div className="w-fit flex flex-col gap-3 mt-5">
                {links.map((ln, i) => (
                  <div
                    onClick={() => {
                      closeDrawer();
                      window.location.assign(ln.link);
                    }}
                    key={i}
                    className={`text-body w-fit ${
                      active === i
                        ? "text-primary font-bold underline"
                        : "font-medium text-black"
                    } font-nunito`}
                  >
                    {ln.name}
                  </div>
                ))}
              </div>

              {!signedIn && (
                <div className="flex flex-col items-center gap-3 w-full mt-6">
                  <div
                    onClick={() => {
                      closeDrawer();
                      window.location.assign("/auth/register");
                    }}
                    className={` bg-primary-light text-primary w-full h-10 flex justify-center items-center rounded-full text-small font-semibold font-nunito `}
                  >
                    Register
                  </div>
                  <div
                    onClick={() => {
                      closeDrawer();
                      window.location.assign("/auth/login");
                    }}
                    className="w-full h-10 flex justify-center items-center rounded-full bg-primary text-small font-semibold font-nunito text-white"
                  >
                    Login
                  </div>
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
