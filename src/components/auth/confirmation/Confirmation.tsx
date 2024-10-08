"use client";

import React, { Suspense, useEffect } from "react";

import { useSearchParams, useRouter } from "next/navigation";
import { Loader } from "@mantine/core";
import Link from "next/link";

import { MdMarkEmailRead } from "react-icons/md";

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
  const newAccount: string | null = search.get("new");

  useEffect(() => {
    if (
      email === null ||
      newAccount == null ||
      (newAccount !== "true" && newAccount !== "false")
    ) {
      router.back();
    }
  }, [router]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 bg-background bg-opacity-[0.95] font-nunito">
      <MdMarkEmailRead className="text-primary" size={"60px"} />
      <div className="xs:w-full lg:w-[400px] flex flex-col gap-1 items-center">
        <h1 className="text-header font-bold text-neutral-2">
          Check your email
        </h1>
        <p className="text-hint text-neutral-2 text-center">
          We have sent instructions on how to{" "}
          {newAccount === "true"
            ? "confirm your account"
            : "reset your password"}{" "}
          to
          <span className="font-bold"> {email}</span>
        </p>
      </div>
      <Link
        href={"/auth/login"}
        className="text-body text-primary font-bold mt-10"
      >
        Back to Login
      </Link>
    </div>
  );
};

export default Confirmation;
