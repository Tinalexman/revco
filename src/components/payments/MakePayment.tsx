"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Form, Formik } from "formik";

import { motion } from "framer-motion";
import { Loader, Modal } from "@mantine/core";
import BackButton from "../reusable/BackButton";
import Dropdown from "../reusable/Dropdown";

import { useDisclosure } from "@mantine/hooks";

import { states } from "@/src/constants/constants";
import { useGlobalStore } from "@/src/stores/globalStore";

import PaymentModal from "./PaymentModal";
import { PAYMENT_KEY, tProcessPayment } from "@/src/stores/paymentStore";
import { formatAmountWithCommas } from "@/src/functions/numberFunctions";
import CustomPhoneInput from "../reusable/CustomPhoneInput";

interface iPaymentData {
  fullName: string;
  email: string;
  tin: string;
  phoneNumber: string;
  state: string;
  lga: string;
  address: string;
  amount: number;
}

const MakePayment = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Content />
    </Suspense>
  );
};

const Content = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const target: string | null = searchParams.get("target");

  useEffect(() => {
    if (!target) {
      router.back();
    }
  }, [router]);

  const currencies: string[] = ["NGN - Nigerian Naira"];
  const [proceed, shouldProceed] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [taxPayerID, setTaxPayerID] = useState<string>("");

  return (
    <>
      <div className="flex flex-col mt-16 md:mt-6 items-start gap-4 w-[45rem] md:w-full h-full md:h-auto overflow-y-scroll scrollbar-custom">
        <BackButton classicArrow={true} color={"#000000"} text={"Back"} />
        <h2 className="text-subtitle font-bold text-[#3A3A3A] font-nunito">
          TARABA STATE INTERNAL REVENUE SERVICE
        </h2>
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            tin: "",
            phoneNumber: "",
            state: "",
            lga: "",
            address: "",
            amount: "",
          }}
          validate={(values) => {
            const errors: Partial<iPaymentData> = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(false);
          }}
          validateOnMount={true}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isInitialValid,
            isValid,
            setFieldValue,
          }) => (
            <Form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center gap-5"
              method="POST"
            >
              {proceed && taxPayerID && (
                <div className="w-full space-y-2 px-1">
                  <h3 className="text-large text-[#454545]  font-bold">
                    Tax Payer ID
                  </h3>
                  <input
                    type="text"
                    readOnly
                    value={taxPayerID ?? ""}
                    className="w-full text-body border border-[#DDE2FF]"
                  />
                </div>
              )}

              <div className="w-full space-y-2 px-1">
                <h3 className="text-large text-[#454545]  font-bold">
                  Who do you want to pay for{" "}
                  <span className="text-error">*</span>
                </h3>
                <div className="w-full flex items-center text-body border border-[#DDE2FF] bg-white rounded-[8px] px-4 md:px-2 h-12 md:h-auto py-2 text-black">
                  {target}
                </div>
              </div>

              <div className="flex items-start justify-between w-full px-2 md:px-1">
                <div className="flex flex-col gap-1 w-[48%] md:w-[49%]">
                  <h3 className="text-large  text-[#454545] font-bold">
                    Full Name <span className="text-error">*</span>
                  </h3>
                  <input
                    type="text"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleChange}
                    className="w-full text-body border border-[#DDE2FF]"
                  />
                  {errors.fullName && touched.fullName && (
                    <p className="text-hint text-error">{errors.fullName}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1 w-[48%] md:w-[49%]">
                  <h3 className="text-large text-[#454545] font-bold">
                    Email <span className="text-error">*</span>
                  </h3>
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className="w-full text-body border border-[#DDE2FF]"
                  />
                  {errors.email && touched.email && (
                    <p className="text-hint text-error">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="flex items-start justify-between w-full px-2 md:px-1">
                <div className="flex flex-col gap-1 w-[48%] md:w-[49%]">
                  <h3 className="text-large text-[#454545] font-bold">
                    TIN <span className="text-error">*</span>
                  </h3>
                  <input
                    type="text"
                    name="tin"
                    value={values.tin}
                    onChange={handleChange}
                    className="w-full text-body border border-[#DDE2FF]"
                  />
                  {errors.tin && touched.tin && (
                    <p className="text-hint text-error">{errors.tin}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1 w-[48%] md:w-[49%]">
                  <h3 className="text-large text-[#454545] font-bold">
                    Phone number <span className="text-error">*</span>
                  </h3>
                  <CustomPhoneInput
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    phoneNumber={values.phoneNumber}
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <p className="text-hint text-error">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>
              <div className="flex items-start justify-between px-2 md:px-1 w-full">
                <div className="flex flex-col gap-1 w-[48%] md:w-[49%]">
                  <h3 className="text-large text-[#454545]  font-bold">
                    State <span className="text-error">*</span>
                  </h3>
                  <Dropdown
                    menus={states.map((st, i) => ({
                      name: st,
                      onClick: () => {
                        setFieldValue("state", st);
                      },
                    }))}
                    value={values.state}
                    hint="Select State"
                    fitMenu
                  />
                </div>
                <div className="flex flex-col gap-1 w-[48%] md:w-[49%]">
                  <h3 className="text-large text-[#454545] font-bold">
                    LGA <span className="text-error">*</span>
                  </h3>
                  <Dropdown menus={[]} value={""} hint="Select LGA" fitMenu />
                </div>
              </div>
              <div className="w-full space-y-2 px-1">
                <h3 className="text-large text-[#454545]  font-bold">
                  Address <span className="text-error">*</span>
                </h3>
                <textarea
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  placeholder="Enter your address here"
                  className="w-full text-body border border-[#DDE2FF] resize-none h-[100px]"
                />
              </div>
              <div className="flex items-start justify-between px-1 w-full">
                <div className="flex flex-col gap-1 w-[48%]">
                  <h3 className="text-large text-[#454545]  font-bold">
                    Amount to Pay (₦) <span className="text-error">*</span>
                  </h3>
                  <div className="w-full flex">
                    <div className="bg-background w-[15%] rounded-[8px] rounded-tr-none rounded-br-none h-12 md:h-10 grid place-content-center">
                      <p className="text-large font-bold text-black">₦</p>
                    </div>
                    <input
                      type="text"
                      name="amount"
                      value={values.amount}
                      placeholder="Enter amount"
                      onChange={(e) => {
                        const res = e.target.value.replace(/,/g, "");
                        if (!isNaN(Number(res))) {
                          setFieldValue("amount", formatAmountWithCommas(res));
                        }
                      }}
                      className="w-[85%] text-body border border-[#DDE2FF] rounded-tl-none rounded-bl-none"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-[48%]">
                  <h3 className="text-large text-[#454545]  font-bold">
                    Currency
                    <span className="text-error">*</span>
                  </h3>
                  <input
                    type="text"
                    value={"NGN - Nigerian Naira"}
                    readOnly
                    className="w-full text-body border border-[#DDE2FF]"
                  />
                </div>
              </div>

              <div className="flex gap-2 w-full items-center justify-center">
                <input
                  type="checkbox"
                  name="agreed"
                  className="size-3 accent-primary bg-white focus:ring-0"
                />
                <p className="text-smaller text-black">
                  By clicking Continue, you agree to our{" "}
                  <span className="text-tertiary font-medium cursor-pointer">
                    Terms and Conditions
                  </span>{" "}
                  and{" "}
                  <span className="text-tertiary font-medium cursor-pointer">
                    Privacy Policy
                  </span>
                </p>
              </div>

              <div className="flex w-full items-center justify-around my-3">
                <button
                  className={`border border-error rounded-full w-[40%] md:w-[45%] text-small h-12 md:h-10 text-error font-bold`}
                >
                  CANCEL
                </button>
                <button
                  onClick={() => {
                    if (!proceed) {
                      shouldProceed(true);
                      open();
                    } else {
                      let processData: tProcessPayment = {
                        tin: values.tin,
                        amount: Number.parseInt(
                          values.amount.replace(/,/g, "")
                        ),
                        target: target ?? "",
                        name: values.fullName,
                        ref: "Ministry of Agriculture",
                        payerID: taxPayerID,
                        pin: "383223232323 ",
                      };

                      window.localStorage.setItem(
                        PAYMENT_KEY,
                        JSON.stringify(processData)
                      );
                      window.location.assign("/payments/process");
                    }
                  }}
                  className={`bg-primary rounded-full w-[40%] md:w-[45%] text-small h-12 md:h-10 text-white font-bold`}
                >
                  CONTINUE
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {opened && (
        <Modal.Root
          opened={opened}
          onClose={close}
          centered
          padding={0}
          top={0}
        >
          <Modal.Overlay />
          <Modal.Content>
            <Modal.Body>
              <PaymentModal
                onContinue={(val: string) => {
                  close();
                  setTaxPayerID(val);
                }}
              />
            </Modal.Body>
          </Modal.Content>
        </Modal.Root>
      )}
    </>
  );
};

export default MakePayment;
