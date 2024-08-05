"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Form, Formik } from "formik";

import { motion } from "framer-motion";
import { Loader } from "@mantine/core";
import BackButton from "../reusable/BackButton";
import Dropdown from "../reusable/Dropdown";

import { states } from "@/src/constants/constants";

interface iPaymentData {
  fullName: string;
  email: string;
  tin: string;
  phoneNumber: string;
  state: string;
  lga: string;
  address: string;
  amount: number;
  curreny: string;
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

  return (
    <div className="flex flex-col pt-16 items-start gap-4 w-[40rem] h-full overflow-y-scroll scrollbar-custom">
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
          curreny: "",
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
        }) => (
          <Form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center gap-5"
            method="POST"
          >
            <div className="w-full space-y-2 px-1">
              <h3 className="text-large text-[#454545]  font-bold">
                Who do you want to pay for <span className="text-error">*</span>
              </h3>
              <input
                type="text"
                readOnly
                value={target ?? ""}
                className="w-full text-body border border-[#DDE2FF]"
              />
            </div>

            <div className="flex items-start justify-between w-full px-2">
              <div className="flex flex-col gap-1 w-[48%]">
                <h3 className="text-large text-[#454545]  font-bold">
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
              <div className="flex flex-col gap-1 w-[48%]">
                <h3 className="text-large text-[#454545]  font-bold">
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
            <div className="flex items-start justify-between w-full px-1">
              <div className="flex flex-col gap-1 w-[48%]">
                <h3 className="text-large text-[#454545]  font-bold">
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
              <div className="flex flex-col gap-1 w-[48%]">
                <h3 className="text-large text-[#454545]  font-bold">
                  Phone number <span className="text-error">*</span>
                </h3>
                <input
                  type="text"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  className="w-full text-body border border-[#DDE2FF]"
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="text-hint text-error">{errors.phoneNumber}</p>
                )}
              </div>
            </div>
            <div className="flex items-start justify-between px-1 w-full">
              <div className="flex flex-col gap-1 w-[48%]">
                <h3 className="text-large text-[#454545]  font-bold">
                  State <span className="text-error">*</span>
                </h3>
                <Dropdown
                  menus={states.map((st, i) => ({
                    name: st,
                    onClick: () => {},
                  }))}
                  value={""}
                  hint=""
                  fitMenu
                />
              </div>
              <div className="flex flex-col gap-1 w-[48%]">
                <h3 className="text-large text-[#454545]  font-bold">
                  Local Government of Origin{" "}
                  <span className="text-error">*</span>
                </h3>
                <Dropdown menus={[]} value={""} hint="" fitMenu />
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
                <Dropdown
                  menus={states.map((st, i) => ({
                    name: st,
                    onClick: () => {},
                  }))}
                  value={""}
                  hint=""
                  fitMenu
                />
              </div>
              <div className="flex flex-col gap-1 w-[48%]">
                <h3 className="text-large text-[#454545]  font-bold">
                  Currency
                  <span className="text-error">*</span>
                </h3>
                <Dropdown
                  menus={currencies.map((cp, i) => ({
                    name: cp,
                    onClick: () => {},
                  }))}
                  value={""}
                  hint={currencies[0]}
                  fitMenu
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

            <div className="flex w-full items-center justify-around  mt-3">
              <button
                className={`border border-error rounded-full w-[40%] text-small h-12 text-error font-bold`}
              >
                CANCEL
              </button>
              <button
                className={`bg-primary rounded-full w-[40%] text-small h-12 text-white font-bold`}
              >
                CONTINUE
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MakePayment;
