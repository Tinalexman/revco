import React from "react";

import Image from "next/image";
import Logo from "@/public/image_261.png";
import Link from "next/link";

interface iNav {
  name: string;
  link: string;
}

const Navbar = () => {
  const links: iNav[] = [
    {
      name: "Pay Bills",
      link: "/pay-bills",
    },
    {
      name: "Generate PIN",
      link: "/generate-pin",
    },
    {
      name: "Validate Receipt",
      link: "/validate-receipt",
    },
  ];
  return (
    <div className="flex w-full items-center justify-between">
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
            className="text-small font-semibold font-nunito text-white"
          >
            {ln.name}{" "}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-5 w-fit">
        <Link
          href={"/auth/register"}
          className="w-[150px] h-10 flex justify-center items-center rounded-full border-2 border-white hover:border-primary border-opacity-[0.28] hover:border-opacity-100 text-small font-semibold font-nunito text-white transition-all duration-300 ease-out"
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
