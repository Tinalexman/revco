"use client";

import React, { useEffect, useState, Suspense } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Loader } from "@mantine/core";

import Image from "next/image";
import Logo from "@/public/image_261.png";
import Qr from "@/public/paysure qr.png";
import Paid from "@/public/Paid Stamp.svg";
import Coat from "@/public/Coat of Arms.svg";

import { iValidatePaidInvoiceResponse } from "@/src/services/invoiceServices";

import { usePDF } from "react-to-pdf";

//850596632258

const ViewReceipt = () => (
  <Suspense fallback={<Loader />}>
    <Content />
  </Suspense>
);

const Content = () => {
  const [receipt, setReceipt] = useState<iValidatePaidInvoiceResponse>({
    invoiceNo: "",
    invoiceAmount: 0,
    assesedService: "",
    paymentChannel: null,
    businessId: 0,
    business: null,
    serviceId: 0,
    mda: "",
    month: 0,
    year: "",
    customerId: 0,
    payerFirstName: null,
    payerLastName: null,
    tinType: null,
    payerId: "",
    payment: [],
    payerTin: null,
    payer: "",
    payerEmail: "",
    payerPhone: "",
    payerType: null,
    paid: false,
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  const target: string | null = searchParams.get("target");

  const { toPDF, targetRef } = usePDF({
    filename: "Revco Receipt.pdf",
  });

  useEffect(() => {
    if (target === null) {
      router.back();
    } else {
      const payload = JSON.parse(
        Buffer.from(target!, "base64").toString("utf-8")
      );
      console.log(payload);
      setReceipt(payload);
    }
  }, [router]);

  return (
    <div className="w-full flex flex-col items-center gap-10 font-poppins pb-20">
      <div
        ref={targetRef}
        className="w-[804px] shadow-sm border border-gray-200 flex flex-col bg-white "
      >
        <div className="w-full h-full bg-[url('../../public/Background.png')] bg-center bg-cover bg-no-repeat relative">
          <p className="text-[8px] font-medium left-5 top-3 absolute text-black">
            E-receipt
          </p>
          <p className="ml-[72.97px] text-black mt-[83.78px] text-[11.46px] leading-[17.19px]">
            Payment Receipt
          </p>
          <div className="mt-[11.38px] flex gap-4 w-full">
            <div className="bg-[#DA251DB5] h-[79.72px] w-[300px]" />
            <div className={`flex items-center gap-2 w-[320px] h-[79.72px]`}>
              <Image
                src={Logo}
                alt="logo"
                className="size-[79.72px] object-cover"
                width={72}
                height={72}
              />
              <div className="flex flex-col">
                <h2
                  className={`text-[32px] leading-[32px] font-podkova font-bold text-[#333333]`}
                >
                  TARABA STATE
                </h2>
                <p className="text-[#DA251D] text-[11.2px] leading-[11.52px] font-bold">
                  BOARD OF INTERNAL REVENUE SERVICE
                </p>
              </div>
            </div>
            <div className="bg-[#DA251DB5] h-[79.72px] w-[152px]" />
          </div>
          <div className="mt-[51.35px] bg-[#F4BBB9] h-[31.51px] flex items-center pl-[82.43px]">
            <h2 className="text-[14.17px] leading-[17.71px] font-semibold text-black font-poppins">
              Payment Details
            </h2>
          </div>
          <div className="mt-[10.81px] py-[17.57px] px-[82.43px] border border-dashed relative border-[#F9DEDD] flex flex-col gap-[10.71px] text-black text-[14.33px] leading-[17.91px]">
            <Image
              src={Coat}
              alt="paysure qr code"
              className="w-[340px] h-[290px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 absolute"
              width={160}
              height={160}
            />

            <div className="w-full py-[2.7px] border-b flex border-[#F9DEDD] items-center justify-between">
              <p className=" font-light">Payer&apos;s Name:</p>
              <p className="font-medium">{receipt.payer}</p>
            </div>
            <div className="w-full py-[2.7px] border-b flex border-[#F9DEDD] items-center justify-between">
              <p className=" font-light">MDA:</p>
              <p className="font-medium">{receipt.mda}</p>
            </div>
            <div className="w-full py-[2.7px] border-b flex border-[#F9DEDD] items-center justify-between">
              <p className=" font-light">Revenue Head:</p>
              <p className="font-medium">{receipt.assesedService}</p>
            </div>
            {receipt.payerId && (
              <div className="w-full py-[2.7px] border-b flex border-[#F9DEDD] items-center justify-between">
                <p className=" font-light">Payer ID:</p>
                <p className="font-medium">{receipt.payerId}</p>
              </div>
            )}
            <div className="w-full py-[2.7px] border-b flex border-[#F9DEDD] items-center justify-between">
              <p className=" font-light">External Ref. Number:</p>
              <p className="font-medium">{receipt.mda}</p>
            </div>
            {receipt.payerTin && (
              <div className="w-full py-[2.7px] border-b flex border-[#F9DEDD] items-center justify-between">
                <p className=" font-light">TIN:</p>
                <p className="font-medium">{receipt.payerTin}</p>
              </div>
            )}
          </div>
          <div className="mt-[10.81px] bg-[#F9DEDD] h-[44.62px] flex justify-between items-center px-[82.43px]">
            <h2 className="text-[14.17px] leading-[17.71px] font-semibold text-black font-poppins">
              Amount
            </h2>
            <h2 className="text-[14.17px] leading-[17.71px] font-semibold text-black font-poppins">
              ₦{receipt.invoiceAmount.toLocaleString("en-US")}
            </h2>
          </div>
          <div className="mt-[123.52px] ml-[77.02px] w-[351.33px] h-[79px]">
            <div className="h-[32px] w-full bg-[#AE1E17] flex items-center pl-[16.22px] ">
              <p className="text-[16.75px] leading-[20.93px] text-[#FBE9E8] font-medium font-poppins">
                PIN
              </p>
            </div>
            <div className="pl-[16.22px] flex items-center h-[47px] w-full bg-[#E5645F59]">
              <p className="text-[19.45px] leading-[24.31px] text-[#1A0100] font-semibold font-poppins">
                {receipt.invoiceNo}
              </p>
            </div>
          </div>

          <Image
            src={Qr}
            alt="paysure qr code"
            className="size-[160px] mt-[36.27px] ml-[77.02px]"
            width={160}
            height={160}
          />

          {receipt.paid && (
            <Image
              src={Paid}
              alt="paid stamp"
              className="w-[256px] h-[150px] absolute bottom-[170px] right-[34.79px]"
              width={256}
              height={150}
            />
          )}
          <div className="mt-[78.37px] w-full grid place-content-center bg-[#FBE9E86E] h-[56.75px]">
            <p className="text-[12.16px] leading-[15.2px] text-black">
              Powered by:{" "}
              <span className="text-tertiary font-bold">paysure</span>
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={() => toPDF()}
        className="bg-primary h-12 rounded-full w-[250px] text-white font-semibold"
      >
        Download Receipt
      </button>
    </div>
  );
};

export default ViewReceipt;
