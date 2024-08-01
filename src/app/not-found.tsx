import React from "react";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="w-[100vw] h-[100vh] bg-[url('../../public/image_263.png')] bg-cover bg-no-repeat bg-center">
      <div className="bg-white w-full h-full bg-opacity-[0.95] flex flex-col justify-center items-center">
        <div className="bg-[url('../../public/not_found.png')] size-[200px] bg-cover bg-no-repeat bg-center" />
        <h1 className="text-header font-bold font-nuito text-black mt-5">
          Page Not Found
        </h1>
        <Link href={"/"} className="text-body text-primary font-bold mt-20">
          Back to Home
        </Link>
      </div>
    </div>
  );
}