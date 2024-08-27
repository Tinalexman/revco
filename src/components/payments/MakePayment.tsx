"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Form, Formik } from "formik";

import { Loader, Modal } from "@mantine/core";
import BackButton from "../reusable/BackButton";
import Dropdown from "../reusable/Dropdown";

import { useDisclosure } from "@mantine/hooks";

import PaymentModal from "./PaymentModal";
import { PAYMENT_KEY, tProcessPayment } from "@/src/stores/paymentStore";
import {
  formatAmountWithCommas,
  formatNumberWithThreesAndFours,
  unformatNumberWithThreesAndFours,
} from "@/src/functions/numberFunctions";
import { useGetLGAs, useGetStates } from "@/src/hooks/locationHooks";

import Cryptr from "cryptr";
import { HASH_KEY } from "@/src/services/base";

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

  const [role, setRole] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const [mda, setMDA] = useState<string>("");

  useEffect(() => {
    const cryptr = new Cryptr(HASH_KEY);
    const target: string | null = searchParams.get("target");

    if (!target) {
      router.back();
    }

    const payload: string = cryptr.decrypt(target!);
    const parts: string[] = payload.split("#");
    if (parts.length !== 3) {
      router.back();
    }

    setRole(parts[0]);
    setMDA(parts[1]);
    setTarget(parts[2]);
  }, [router]);

  const [proceed, shouldProceed] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [taxPayerID, setTaxPayerID] = useState<string>("");

  const { data: states, loading: loadingStates } = useGetStates();
  const { data: lgas, loading: loadingLGAs, get: getLGA } = useGetLGAs();

  return (
    <>
      <div className="flex flex-col items-start gap-2 lg:w-[700px] xl:w-[800px] 2xl:w-[900px] 3xl:w-[1100px] 4xl:w-[1300px] xs:w-[100vw] xs:px-5 lg:px-0 lg:h-fit xs:h-auto">
        <BackButton classicArrow={true} color={"#000000"} text={"Back"} />
        <h2 className="text-l-1 font-bold text-[#3A3A3A] font-nunito">
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
            const errors: any = {};

            if (!values.fullName) {
              errors.fullName = "Required";
            } else if (values.fullName.length < 3) {
              errors.fullName = "Full name must be at least 3 characters";
            }

            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }

            if (!values.phoneNumber) {
              errors.phoneNumber = "Required";
            }

            if (!values.state) {
              errors.state = "Required";
            }

            if (!values.lga) {
              errors.lga = "Required";
            }

            let v = Number.parseInt(values.amount.replace(/,/g, ""));
            if (v === undefined) {
              errors.amount = "Invalid amount";
            } else if (v <= 0) {
              errors.amount = "Amount must be greater than zero";
            }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(false);
            if (!proceed) {
              shouldProceed(true);
              open();
            } else {
              let processData: tProcessPayment = {
                tin: values.tin,
                amount: Number.parseInt(values.amount.replace(/,/g, "")),
                target: mda ?? "",
                name: values.fullName,
                ref: target ?? "",
                payerID: taxPayerID,
                pin: "383223232323 ",
              };

              window.localStorage.setItem(
                PAYMENT_KEY,
                JSON.stringify(processData)
              );
              window.location.assign("/dashboard/process-payment");
            }
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
            setFieldValue,
          }) => (
            <Form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center xs:gap-3 lg:gap-5"
              method="POST"
            >
              {proceed && taxPayerID && (
                <div className="w-full lg:space-y-2 xs:space-y-1">
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

              <div className="w-full space-y-2">
                <h3 className="text-l-2 text-[#454545] font-bold">
                  Who do you want to pay for{" "}
                  <span className="text-error">*</span>
                </h3>
                <div
                  className={`w-full flex items-center text-b-1 border border-[#DDE2FF] bg-white rounded-[8px] px-4 md:px-2 lg:h-12 xs:h-10 2xl:h-14 3xl:h-16 4xl:h-20 py-2 ${
                    mda.length === 0 ? "text-neutral-2" : "text-black"
                  }`}
                >
                  {mda.length === 0 ? "MDA" : mda}
                </div>
                <div
                  className={`w-full flex items-center text-b-1 border border-[#DDE2FF] bg-white rounded-[8px] px-4 md:px-2 lg:h-12 xs:h-10 2xl:h-14 3xl:h-16 4xl:h-20 py-2 ${
                    target.length === 0 ? "text-neutral-2" : "text-black"
                  }`}
                >
                  {target.length === 0 ? "Revenue Head" : target}
                </div>
              </div>

              <div className="flex items-start justify-between w-full">
                <div className="flex flex-col lg:gap-1 xs:gap-0.5 lg:-[48%] xs:w-[49%]">
                  <h3 className="text-l-2 text-[#454545] font-bold">
                    Full Name <span className="text-error">*</span>
                  </h3>
                  <input
                    type="text"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleChange}
                    className="w-full text-b-1 border border-[#DDE2FF]"
                  />
                  {errors.fullName && touched.fullName && (
                    <p className="text-s-4 text-error">{errors.fullName}</p>
                  )}
                </div>
                <div className="flex flex-col lg:gap-1 xs:gap-0.5 lg:w-[48%] xs:w-[49%]">
                  <h3 className="text-l-2 text-[#454545] font-bold">
                    Email <span className="text-error">*</span>
                  </h3>
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className="w-full text-b-1 border border-[#DDE2FF]"
                  />
                  {errors.email && touched.email && (
                    <p className="text-s-4 text-error">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="flex items-start justify-between w-full">
                <div className="flex flex-col lg:gap-1 xs:gap-0.5 lg:w-[48%] xs:w-[49%]">
                  <h3 className="text-l-2 text-[#454545] font-bold">TIN</h3>
                  <input
                    type="text"
                    name="tin"
                    value={values.tin}
                    onChange={handleChange}
                    className="w-full text-b-1 border border-[#DDE2FF]"
                  />
                  {errors.tin && touched.tin && (
                    <p className="text-hint text-error">{errors.tin}</p>
                  )}
                </div>
                <div className="flex flex-col lg:gap-1 xs:gap-0.5 lg:w-[48%] xs:w-[49%]">
                  <h3 className="text-l-2 text-[#454545] font-bold">
                    Phone number <span className="text-error">*</span>
                  </h3>

                  <input
                    type="tel"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={(e) => {
                      if (e.target.value.length === 0) {
                        setFieldValue("phoneNumber", "");
                        return;
                      }

                      const res = unformatNumberWithThreesAndFours(
                        e.target.value
                      );

                      if (isNaN(Number(res))) return;

                      setFieldValue(
                        "phoneNumber",
                        formatNumberWithThreesAndFours(res)
                      );
                    }}
                    className="w-full text-b-1 border border-[#DDE2FF]"
                  />
                  {errors.phoneNumber && (
                    <p className="text-s-4 text-error">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>
              <div className="flex items-start justify-between w-full">
                <div className="flex flex-col lg:gap-1 xs:gap-0.5 lg:w-[48%] xs:w-[49%]">
                  <h3 className="text-l-2 text-[#454545] font-bold">
                    State <span className="text-error">*</span>
                  </h3>
                  <Dropdown
                    menus={states.map((st, i) => ({
                      name: st.name,
                      onClick: () => {
                        setFieldValue("state", st.name);
                        getLGA(st.id);
                      },
                    }))}
                    value={values.state}
                    hint="Select State"
                    loading={loadingStates}
                    fitMenu={true}
                    alignToStart
                    showIcon
                  />
                  {errors.state && (
                    <p className="text-s-4 text-error">{errors.state}</p>
                  )}
                </div>
                <div className="flex flex-col lg:gap-1 xs:gap-0.5 lg:w-[48%] xs:w-[49%]">
                  <h3 className="text-l-2 text-[#454545] font-bold">
                    LGA <span className="text-error">*</span>
                  </h3>
                  <Dropdown
                    menus={lgas.map((st, i) => ({
                      name: st.name,
                      onClick: () => {
                        setFieldValue("lga", st.name);
                      },
                    }))}
                    loading={loadingLGAs}
                    value={values.lga}
                    hint="Select LGA"
                    fitMenu={true}
                    alignToStart
                    showIcon
                  />
                  {errors.lga && (
                    <p className="text-s-4 text-error">{errors.lga}</p>
                  )}
                </div>
              </div>
              <div className="w-full lg:space-y-2 xs:space-y-1">
                <h3 className="text-l-2 text-[#454545] font-bold">Address</h3>
                <textarea
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  placeholder="Enter your address here"
                  className="w-full text-b-1 border border-[#DDE2FF] resize-none h-[100px]"
                />
              </div>
              <div className="flex items-start justify-between w-full">
                <div className="flex flex-col gap-1 lg:w-[48%] xs:w-[49%]">
                  <h3 className="text-l-2 text-[#454545] font-bold">
                    Amount to Pay (₦) <span className="text-error">*</span>
                  </h3>
                  <div className="w-full flex">
                    <div className="bg-neutral-3 w-[20%] rounded-[8px] rounded-tr-none rounded-br-none lg:h-12 xs:h-10 2xl:h-14 3xl:h-16 4xl:h-20 grid place-content-center">
                      <p className="text-b-1 font-bold text-black">₦</p>
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
                      className="w-[80%] text-b-1 border border-[#DDE2FF] rounded-tl-none rounded-bl-none"
                    />
                  </div>
                  {errors.amount && (
                    <p className="text-s-4 text-error">{errors.amount}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-2 w-full items-center justify-center">
                <input
                  type="checkbox"
                  name="agreed"
                  className="size-3 accent-primary bg-white focus:ring-0"
                />
                <p className="text-s-3 text-black">
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
                  className={`border border-error rounded-full lg:w-[40%] xs:w-[45%] text-b-1 lg:h-12 xs:h-10 2xl:h-14 3xl:h-16 4xl:h-20 text-error font-bold`}
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className={`bg-primary rounded-full lg:w-[40%] xs:w-[45%] text-b-1 lg:h-12 xs:h-10 2xl:h-14 3xl:h-16 4xl:h-20 text-white font-bold`}
                >
                  {proceed ? "PROCEED" : "CONTINUE"}
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
          closeOnClickOutside={false}
          closeOnEscape={false}
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
