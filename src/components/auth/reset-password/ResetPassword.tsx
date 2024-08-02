"use client";

import React, { useState } from "react";
import BackButton from "@/src/components/reusable/BackButton";
import { motion } from "framer-motion";

const ResetPassword = () => {
  const [email, setEmail] = useState<string>("");

  return (
    <div className="w-full h-full flex items-center justify-center bg-background bg-opacity-[0.95]">
      <div className="w-[400px] flex flex-col gap-3 relative">
        <div className="absolute -top-[60%] left-0">
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
          className={`bg-primary rounded-full w-full text-body h-[60px] text-white font-bold mt-3`}
        >
          Send Reset Link
        </motion.button>
      </div>
    </div>
  );
};

export default ResetPassword;
