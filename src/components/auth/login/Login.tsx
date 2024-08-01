import React from "react";

import Image from "next/image";
import Logo from "@/public/image 261.png";

const Login = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[500px] flex flex-col items-center gap-5">
        <Image
          src={Logo}
          alt="logo"
          className="size-[100px] object-cover"
          width={100}
          height={100}
        />
        <div className="flex flex-col gap-5">
          <h1 className="text-neutral-2 font-nunito_sans font-bold text-[1.5rem]">
            Log In
          </h1>
          <h3 className="text-[1rem] text-neutral-2">Email</h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
