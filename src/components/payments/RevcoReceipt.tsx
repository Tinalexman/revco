"use client";

import React, { FC } from "react";

import Image from "next/image";
import Logo from "@/public/image_261.png";
import Qr from "@/public/paysure qr.png";
import Paid from "@/public/Paid Stamp.svg";
import Coat from "@/public/Coat of Arms.svg";

import { iStateColors } from "@/src/constants/constants";

export interface iReceiptData {
  invoiceNo: string;
  invoiceAmount: number;
  assesedService: string;
  mda: string;
  transactionReference: string;
  payerId: string;
  payerTin: any;
  payer: string;
  payerEmail: string;
  payerPhone: string;
  paid: boolean;
}

export const DesktopRevcoReceipt: FC<{
  receipt: iReceiptData;
  colors: iStateColors;
}> = ({ receipt, colors }) => {
  const isPaid = receipt.paid;
  let refNo = receipt.transactionReference;

  return (
    <div
      id="revco-desktop-receipt"
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
          <div
            style={{
              background: colors.state,
            }}
            className="h-[79.72px] w-[300px]"
          />
          <div className={`flex items-center gap-2 w-[320px] h-[79.72px]`}>
            <Image
              src={Logo}
              alt="logo"
              className="size-[79.72px] object-cover"
              width={72}
              height={72}
            />
            <div
              id="state-column"
              className="flex flex-col justify-center h-[79.72px] w-[230px]"
            >
              <h2
                className={`text-[32px] leading-[32px] font-podkova font-bold text-[#333333] h-8`}
              >
                {colors.name} STATE
              </h2>
              <p className="text-[#DA251D] text-[11.2px] leading-[11.52px] font-bold h-3">
                BOARD OF INTERNAL REVENUE SERVICE
              </p>
            </div>
          </div>
          <div
            style={{
              background: colors.state,
            }}
            className="h-[79.72px] w-[152px]"
          />
        </div>
        <div
          id="payment-details-container"
          style={{
            background: colors.paymentDetails,
          }}
          className="mt-[51.35px] h-[31.51px] justify-start items-center flex pl-[82.43px] w-full"
        >
          <h2 className="text-[14.17px] leading-[17.71px] font-semibold text-black font-poppins">
            Payment Details
          </h2>
        </div>
        <div
          style={{
            borderColor: colors.border,
          }}
          className="mt-[10.81px] py-[17.57px] px-[82.43px] border border-dashed relative flex flex-col gap-[10.71px] text-black text-[14.33px] leading-[17.91px]"
        >
          <Image
            src={Coat}
            alt="paysure qr code"
            className="w-[340px] h-[290px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 absolute"
            width={160}
            height={160}
          />

          <div
            id="payer-name-section"
            style={{
              borderColor: colors.border,
            }}
            className="w-full py-[2.7px] border-b flex  items-center justify-between"
          >
            <p className=" font-light">Payer&apos;s Name:</p>
            <p className="font-medium">{receipt.payer}</p>
          </div>
          <div
            id="mda-section"
            style={{
              borderColor: colors.border,
            }}
            className="w-full py-[2.7px] border-b flex  items-center justify-between"
          >
            <p className=" font-light">MDA:</p>
            <p className="font-medium">{receipt.mda}</p>
          </div>
          <div
            style={{
              borderColor: colors.border,
            }}
            id="revenue-head-section"
            className="w-full py-[2.7px] border-b flex  items-center justify-between"
          >
            <p className=" font-light">Revenue Head:</p>
            <p className="font-medium">{receipt.assesedService}</p>
          </div>
          {receipt.payerId && (
            <div
              style={{
                borderColor: colors.border,
              }}
              id="payer-id-section"
              className="w-full py-[2.7px] border-b flex  items-center justify-between"
            >
              <p className=" font-light">Payer ID:</p>
              <p className="font-medium">{receipt.payerId}</p>
            </div>
          )}
          {isPaid && refNo && (
            <div
              id="external-ref-section"
              style={{
                borderColor: colors.border,
              }}
              className="w-full py-[2.7px] border-b flex  items-center justify-between"
            >
              <p className=" font-light">External Ref. Number:</p>
              <p className="font-medium">{refNo}</p>
            </div>
          )}
          {receipt.payerTin && (
            <div
              id="payer-tin-section"
              style={{
                borderColor: colors.border,
              }}
              className="w-full py-[2.7px] border-b flex  items-center justify-between"
            >
              <p className=" font-light">TIN:</p>
              <p className="font-medium">{receipt.payerTin}</p>
            </div>
          )}
        </div>
        <div
          id="amount-container"
          style={{
            background: colors.amount,
          }}
          className="mt-[10.81px] h-[44.62px] flex justify-between items-center px-[82.43px]"
        >
          <h2 className="text-[14.17px] leading-[17.71px] font-semibold text-black font-poppins">
            Amount
          </h2>
          <h2 className="text-[14.17px] leading-[17.71px] font-semibold text-black font-poppins">
            ₦{receipt.invoiceAmount.toLocaleString("en-US")}
          </h2>
        </div>
        <div className="mt-[123.52px] ml-[77.02px] w-[351.33px] h-[79px]">
          <div
            id="pin-container"
            style={{
              background: colors.pinContainer,
            }}
            className="h-[32px] w-full flex items-center pl-[16.22px] "
          >
            <p
              style={{
                color: colors.pinContainerText,
              }}
              className="text-[16.75px] leading-[20.93px] font-medium font-poppins"
            >
              PIN
            </p>
          </div>
          <div
            id="pin-value-container"
            style={{
              background: colors.pinValueContainer,
            }}
            className="pl-[16.22px] flex items-center h-[47px] w-full"
          >
            <p
              style={{
                color: colors.pinValueContainerText,
              }}
              className="text-[19.45px] leading-[24.31px]  font-semibold font-poppins"
            >
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
        <div
          style={{
            background: colors.footer,
          }}
          className="mt-[78.37px] w-full grid place-content-center  h-[56.75px]"
        >
          <p className="text-[12.16px] leading-[15.2px] text-black">
            Powered by: <span className="text-tertiary font-bold">paysure</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export const MobileRevcoReceipt: FC<{
  receipt: iReceiptData;
  colors: iStateColors;
}> = ({ receipt, colors }) => {
  const isPaid = receipt.paid;
  let refNo = receipt.transactionReference;

  return (
    <div className="w-full shadow-sm border border-gray-200 flex flex-col bg-white ">
      <div className="w-full h-full bg-[url('../../public/Background.png')] bg-center bg-cover bg-no-repeat relative">
        <p className="text-[6px] font-medium left-5 top-3 absolute text-black">
          E-receipt
        </p>
        <p className="ml-[32px] text-black mt-[40px] text-[10px] leading-[14px]">
          Payment Receipt
        </p>
        <div className="mt-[16px] flex justify-between w-full">
          <div
            style={{
              background: colors.state,
            }}
            className="h-[48px] w-[20%]"
          />
          <div className={`flex items-center gap-2 w-[60%] h-[48px]`}>
            <Image
              src={Logo}
              alt="logo"
              className="size-[48px] object-cover"
              width={72}
              height={72}
            />
            <div className="flex flex-col justify-center h-[48px] ">
              <h2
                className={`text-[18px] leading-[20px] font-podkova font-bold text-[#333333]`}
              >
                {colors.name} STATE
              </h2>
              <p className="text-[#DA251D] text-[7px] leading-[7px] font-bold">
                BOARD OF INTERNAL REVENUE SERVICE
              </p>
            </div>
          </div>
          <div
            style={{
              background: colors.state,
            }}
            className="h-[48px] w-[15%]"
          />
        </div>
        <div
          style={{
            background: colors.paymentDetails,
          }}
          className="mt-[16px] h-[28px] justify-start items-center flex pl-[24px] w-full"
        >
          <h2 className="text-[10px] leading-[12px] font-semibold text-black font-poppins">
            Payment Details
          </h2>
        </div>
        <div
          style={{
            borderColor: colors.border,
          }}
          className="mt-[5px] py-[8px] px-[10px] border border-dashed relative flex flex-col gap-[6px] text-black text-[8px] leading-[12px]"
        >
          <Image
            src={Coat}
            alt="paysure qr code"
            className="w-[60%] h-auto top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 absolute"
            width={160}
            height={160}
          />

          <div
            style={{
              borderColor: colors.border,
            }}
            className="w-full py-[2.7px] border-b flex items-center justify-between"
          >
            <p className=" font-light">Payer&apos;s Name:</p>
            <p className="font-medium">{receipt.payer}</p>
          </div>
          <div
            style={{
              borderColor: colors.border,
            }}
            className="w-full py-[2.7px] border-b flex  items-center justify-between"
          >
            <p className=" font-light">MDA:</p>
            <p className="font-medium">{receipt.mda}</p>
          </div>
          <div
            style={{
              borderColor: colors.border,
            }}
            className="w-full py-[2.7px] border-b flex items-center justify-between"
          >
            <p className=" font-light">Revenue Head:</p>
            <p className="font-medium">{receipt.assesedService}</p>
          </div>
          {receipt.payerId && (
            <div
              style={{
                borderColor: colors.border,
              }}
              className="w-full py-[2.7px] border-b flex items-center justify-between"
            >
              <p className=" font-light">Payer ID:</p>
              <p className="font-medium">{receipt.payerId}</p>
            </div>
          )}
          {refNo && (
            <div
              style={{
                borderColor: colors.border,
              }}
              className="w-full py-[2.7px] border-b flex  items-center justify-between"
            >
              <p className=" font-light">External Ref. Number:</p>
              <p className="font-medium">{refNo}</p>
            </div>
          )}
          {receipt.payerTin && (
            <div
              style={{
                borderColor: colors.border,
              }}
              className="w-full py-[2.7px] border-b flex  items-center justify-between"
            >
              <p className=" font-light">TIN:</p>
              <p className="font-medium">{receipt.payerTin}</p>
            </div>
          )}
        </div>

        <div
          style={{
            background: colors.amount,
          }}
          className="mt-[8px] font-poppins text-black h-[32px] flex justify-between font-semibold items-center px-[10px] text-[10px] leading-[12px]"
        >
          <h2>Amount</h2>
          <h2>₦{receipt.invoiceAmount.toLocaleString("en-US")}</h2>
        </div>
        <div className="mt-[60px] ml-[14px] w-[60%] h-[50px]">
          <div
            style={{
              background: colors.pinContainer,
            }}
            className="h-[20px] w-full flex items-center pl-[12px] "
          >
            <p
              style={{
                color: colors.pinContainerText,
              }}
              className="text-[12px] leading-[16px]  font-medium font-poppins"
            >
              PIN
            </p>
          </div>
          <div
            style={{
              background: colors.pinValueContainer,
            }}
            className="pl-[12px] flex items-center h-[30px] w-full "
          >
            <p
              style={{
                color: colors.pinValueContainerText,
              }}
              className="text-[14px] leading-[16px] font-semibold font-poppins"
            >
              {receipt.invoiceNo}
            </p>
          </div>
        </div>

        <Image
          src={Qr}
          alt="paysure qr code"
          className="size-[80px] mt-[16px] ml-[12px]"
          width={160}
          height={160}
        />

        {receipt.paid && (
          <Image
            src={Paid}
            alt="paid stamp"
            className="w-[30%] h-auto absolute bottom-[60px] right-[16px]"
            width={256}
            height={150}
          />
        )}
        <div
          style={{
            background: colors.footer,
          }}
          className="mt-[40px] w-full grid place-content-center  h-[32px]"
        >
          <p className="text-[8px] leading-[2px] text-black">
            Powered by: <span className="text-tertiary font-bold">paysure</span>
          </p>
        </div>
      </div>
    </div>
  );
};
