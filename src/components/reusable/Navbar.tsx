import React, { FC } from "react";

import Image from "next/image";
import Logo from "@/public/image_261.png";
import Link from "next/link";

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
      name: "Validate Receipt",
      link: "/dashboard/validate-receipt",
    },
  ];
  return (
    <div className="flex w-full items-center justify-between h-[72px]">
      <Image
        src={Logo}
        alt="logo"
        className="size-[72px] object-cover"
        width={72}
        height={72}
      />
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
    </div>
  );
};

export default Navbar;
