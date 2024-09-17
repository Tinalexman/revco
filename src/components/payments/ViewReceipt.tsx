"use client";

import React, { useEffect, useState, Suspense } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Loader } from "@mantine/core";

import { iValidatePaidInvoiceResponse } from "@/src/services/invoiceServices";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

//850596632258

import { iStateColors, stateColorsData } from "@/src/constants/constants";
import { DesktopRevcoReceipt, MobileRevcoReceipt } from "./RevcoReceipt";

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

  useEffect(() => {
    if (target === null) {
      router.back();
    } else {
      const payload = JSON.parse(
        Buffer.from(target!, "base64").toString("utf-8")
      );
      setReceipt(payload);
    }
  }, [router]);

  const stateColors: iStateColors = stateColorsData["Taraba"];

  const downloadReceipt = () => {
    const receiptElement = document.getElementById(
      "revco-desktop-receipt"
    ) as HTMLElement;

    const stateColumn = document.getElementById("state-column") as HTMLElement;
    stateColumn.style.justifyContent = "start";
    stateColumn.style.gap = "8px";

    const paymentDetailsContainer = document.getElementById(
      "payment-details-container"
    ) as HTMLElement;

    paymentDetailsContainer.style.paddingBottom = "12px";

    const pinContainer = document.getElementById(
      "pin-container"
    ) as HTMLElement;

    pinContainer.style.paddingBottom = "12px";

    const pinValueContainer = document.getElementById(
      "pin-value-container"
    ) as HTMLElement;

    pinValueContainer.style.paddingBottom = "12px";

    const amountDetailsContainer = document.getElementById(
      "amount-container"
    ) as HTMLElement;
    amountDetailsContainer.style.paddingBottom = "12px";

    const payerNameSection = document.getElementById(
      "payer-name-section"
    ) as HTMLElement;

    payerNameSection.style.paddingBottom = "10px";

    const mdaSection = document.getElementById("mda-section") as HTMLElement;
    mdaSection.style.paddingBottom = "10px";

    const externalRefSection = document.getElementById(
      "external-ref-section"
    ) as HTMLElement;
    externalRefSection.style.paddingBottom = "10px";

    const revenueHeadSection = document.getElementById(
      "revenue-head-section"
    ) as HTMLElement;
    revenueHeadSection.style.paddingBottom = "10px";

    const payerIDSection = document.getElementById("payer-id-section");
    if (payerIDSection) {
      payerIDSection.style.paddingBottom = "10px";
    }

    const payerTINSection = document.getElementById("payer-tin-section");
    if (payerTINSection) {
      payerTINSection.style.paddingBottom = "10px";
    }

    if (receiptElement) {
      html2canvas(receiptElement, {
        scale: 2, // Adjust the scale to reduce quality
        useCORS: true, // Enable cross-origin for external images
        allowTaint: true, // Allow tainted canvas
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 0.7); // Use JPEG with quality 0.7
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [receiptElement.offsetWidth, receiptElement.offsetHeight],
        });
        pdf.addImage(
          imgData,
          "JPEG",
          0,
          0,
          receiptElement.offsetWidth,
          receiptElement.offsetHeight
        );
        pdf.save("Revco Receipt.pdf");

        stateColumn.style.justifyContent = "center";
        stateColumn.style.gap = "0";
        paymentDetailsContainer.style.paddingBottom = "0";
        amountDetailsContainer.style.paddingBottom = "0";
        payerNameSection.style.paddingBottom = "0";
        mdaSection.style.paddingBottom = "0";
        revenueHeadSection.style.paddingBottom = "0";
        externalRefSection.style.paddingBottom = "0";
        pinContainer.style.paddingBottom = "0";
        pinValueContainer.style.paddingBottom = "0";

        if (payerIDSection) {
          payerIDSection.style.paddingBottom = "0";
        }
        if (payerTINSection) {
          payerTINSection.style.paddingBottom = "0";
        }
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-10 font-poppins pb-20">
      <div className="lg:h-auto lg:overflow-visible xs:h-0 xs:overflow-hidden">
        <DesktopRevcoReceipt receipt={receipt} colors={stateColors} />
      </div>

      <div className="lg:hidden xs:block w-full">
        <MobileRevcoReceipt receipt={receipt} colors={stateColors} />
      </div>

      <button
        onClick={downloadReceipt}
        className="bg-primary lg:h-12 xs:h-10 rounded-full lg:w-[250px] xs:w-full text-white font-semibold"
      >
        Download Receipt
      </button>
    </div>
  );
};

export default ViewReceipt;
