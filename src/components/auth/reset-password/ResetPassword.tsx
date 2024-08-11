"use client";

import React, { useEffect, useState } from "react";
import BackButton from "@/src/components/reusable/BackButton";
import { motion } from "framer-motion";
import { useGlobalStore } from "@/src/stores/globalStore";

const ResetPassword = () => {
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    useGlobalStore.setState({ activeIndex: -1 });
  }, []);

  return (
    <div className="w-full h-full flex items-center md:items-start justify-center bg-background bg-opacity-[0.95] font-nunito">
      <div className="w-[400px] md:w-full md:px-5 flex flex-col gap-3 relative md:mt-24">
        <div className="absolute -top-[60%] md:-top-14 left-0 md:left-5">
          <BackButton color={"#000000"} classicArrow={true} text="Back" />
        </div>
        <motion.h1
          initial={{
            x: "100%",
          }}
          animate={{
            x: "0%",
            transition: {
              duration: 1,
              ease: "easeOut",
            },
          }}
          className="text-header font-bold text-neutral-2"
        >
          Reset Password
        </motion.h1>
        <div className="flex flex-col gap-[2px] w-full mt-2">
          <h3 className="text-body text-neutral-2">Email</h3>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-body"
          />
        </div>
        <motion.button
          initial={{
            y: "10%",
          }}
          animate={{
            y: "0%",
            transition: {
              duration: 1,
              ease: "easeOut",
            },
          }}
          onClick={() => {
            window.location.assign(`/auth/confirmation?email=${email}`);
          }}
          className={`bg-primary rounded-full w-full text-large h-[60px] md:h-12 text-white font-bold mt-3`}
        >
          Send Reset Link
        </motion.button>
      </div>
    </div>
  );
};

export default ResetPassword;
