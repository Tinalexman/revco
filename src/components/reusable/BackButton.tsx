"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";

const BackButton: FC<{
  color: string;
  classicArrow: boolean;
  text: string;
}> = ({ color = "#141414", classicArrow = false, text = "" }) => {
  const [pop, set] = useState<boolean>(false);
  const router = useRouter();
  const goBack = () => {
    set(true);
  };

  useEffect(() => {
    if (pop) {
      router.back();
    }
  }, [pop, router]);

  return (
    <div
      className="flex gap-1 items-center w-fit cursor-pointer"
      onClick={goBack}
    >
      {classicArrow ? (
        <GoArrowLeft size={20} fill={color} />
      ) : (
        <IoIosArrowBack size={20} fill={color} />
      )}
      <p
        style={{
          color: color,
        }}
        className={`text-body font-bold`}
      >
        {text}
      </p>
    </div>
  );
};

export default BackButton;
