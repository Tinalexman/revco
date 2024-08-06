"use client";

import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { useGlobalStore } from "@/src/stores/globalStore";
import { tProcessPayment, PAYMENT_KEY } from "@/src/stores/paymentStore";
import toast from "react-hot-toast";

const ProcessPayments = () => {
  const [paymentDetails, setPaymentDetails] = useState<tProcessPayment>({
    tin: "",
    amount: 0,
    target: "",
    name: "",
    ref: "",
    payerID: "",
    pin: "",
  });
  const router = useRouter();

  useEffect(() => {
    useGlobalStore.setState({ activeIndex: -1 });
    let key = window.localStorage.getItem(PAYMENT_KEY);
    if (key === null) {
      toast.error("An error occurred");
      router.back();
    } else {
      setPaymentDetails(JSON.parse(key));
    }
  }, [router]);

  return (
    <div className="flex flex-col pt-16 items-start gap-4 w-[50rem] h-[100] overflow-y-scroll scrollbar-custom">
      ProcessPayments
    </div>
  );
};

export default ProcessPayments;
