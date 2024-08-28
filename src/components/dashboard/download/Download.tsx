"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";
import Sent from "@/public/sent.png";
import { useGlobalStore } from "@/src/stores/globalStore";

const Download = () => {
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [sent, isSent] = useState<boolean>(false);

  return (
    <div className="flex flex-col xs:mb-20 items-center gap-5 lg:w-[500px] 2xl:w-[700px] 3xl:w-[800px] xs:w-full h-full xs:h-auto">
      {!sent && (
        <>
          <h2 className="text-header text-start w-full font-bold text-[#595959]">
            Generate Statement
          </h2>
          <div className="flex flex-col gap-2 md:gap-1 w-full">
            <h3 className="text-body text-neutral-2">Date</h3>
            <div className="flex w-full justify-between items-center">
              <input
                type="date"
                value={start}
                placeholder="From"
                onChange={(e) => setStart(e.target.value)}
                className="h-12 md:h-10 rounded-full w-[49%]"
              />
              <input
                type="date"
                value={end}
                placeholder="To"
                onChange={(e) => setEnd(e.target.value)}
                className="h-12 rounded-full w-[49%]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 md:gap-1 w-full">
            <h3 className="text-body text-neutral-2">Email</h3>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-body rounded-full h-12"
            />
          </div>
        </>
      )}
      {sent && (
        <>
          <Image
            src={Sent}
            alt="sent"
            className="size-[100px] object-cover"
            width={100}
            height={100}
          />
          <h2 className="text-header text-center w-full font-bold text-[#595959]">
            Receipt Sent
          </h2>
        </>
      )}
      <button
        onClick={() => {
          if (sent) {
            window.location.assign("/dashboard");
          } else {
            isSent(true);
          }
        }}
        className={`bg-primary rounded-full lg:w-[60%] xs:w-full text-body h-12 md:h-10 md:mb-20 text-white font-bold mt-5`}
      >
        {sent ? "Back to Home" : "Send Receipt"}
      </button>
    </div>
  );
};

export default Download;
