"use client";

import React, { Suspense, useEffect } from "react";

import { useSearchParams, useRouter } from "next/navigation";
import { Loader } from "@mantine/core";
import Link from "next/link";

import { MdMarkEmailRead } from "react-icons/md";
import { motion } from "framer-motion";

const Confirmation = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Content />
    </Suspense>
  );
};

const Content = () => {
  const search = useSearchParams();
  const router = useRouter();
  const email: string | null = search.get("email");

  useEffect(() => {
    if (email === null) {
      router.back();
    }
  }, [router]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 bg-background bg-opacity-[0.95] font-nunito">
      <MdMarkEmailRead className="text-primary" size={"60px"} />
      <div className="w-[300px] flex flex-col gap-1 items-center">
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
          Check your email
        </motion.h1>
        <p className="text-hint text-neutral-2 text-center">
          We have sent instructions on how to reset your password to
          <span className="font-bold"> {email}</span>
        </p>
      </div>
      <Link href={"/"} className="text-body text-primary font-bold mt-10">
        Back to Home
      </Link>
    </div>
  );
};

export default Confirmation;
