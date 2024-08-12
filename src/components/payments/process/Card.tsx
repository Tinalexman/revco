"use client";

import React from "react";
import { Form, Formik } from "formik";
import { formatNumberInFours } from "@/src/functions/numberFunctions";

import Image from "next/image";
import CardType from "@/public/card_type.svg";

interface iCardDetails {
  cardNumber: string;
  expiry: string;
  cvv: string;
  holder: string;
}

const Card = () => {
  return (
    <div className="w-[60%] md:w-full mt-2">
      <Formik
        initialValues={{
          cardNumber: "",
          expiry: "",
          cvv: "",
          holder: "",
        }}
        validate={(values) => {
          const errors: Partial<iCardDetails> = {};

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
            <div className="flex flex-col w-full">
              <h3 className="text-body text-black">Card Details</h3>
              <div className="mt-1 w-full relative">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  value={values.cardNumber}
                  onChange={(e) => {
                    const res = e.target.value.split(" ").join("");
                    if (res.length <= 16 && !isNaN(Number(res))) {
                      setFieldValue("cardNumber", formatNumberInFours(res));
                    }
                  }}
                  className="w-full text-body rounded-b-none border-b-0 focus:ring-0 focus:border-[#DFDFDF]"
                />
                <Image
                  src={CardType}
                  alt="card type"
                  className="absolute md:w-[5rem] md:h-auto top-1/2 -translate-y-1/2 right-4 object-cover"
                />
              </div>
              <div className="w-full flex">
                <input
                  type="text"
                  placeholder="MM/YY"
                  name="expiry"
                  value={values.expiry}
                  onChange={handleChange}
                  className="w-4/5 text-body rounded-t-none rounded-br-none focus:ring-0 focus:border-[#DFDFDF]"
                />
                <input
                  type="text"
                  placeholder="000"
                  name="cvv"
                  value={values.cvv}
                  onChange={(e) => {
                    const res = e.target.value;
                    if (res.length <= 3 && !isNaN(Number(res))) {
                      setFieldValue("cvv", res);
                    }
                  }}
                  className="w-1/5 text-body rounded-t-none rounded-bl-none border-l-0 focus:ring-0 focus:border-[#DFDFDF]"
                />
              </div>
            </div>

            <div className="flex flex-col w-full">
              <h3 className="text-body text-black">Card Holder Name</h3>
              <input
                type="text"
                name="holder"
                placeholder="Name of Card"
                value={values.holder}
                onChange={handleChange}
                className="w-full text-body mt-1 focus:ring-0 focus:border-[#DFDFDF]"
              />
            </div>

            <button
              disabled={isSubmitting}
              className={`bg-[#408BFC] rounded-[10px] w-[70%] md:w-[80%] text-large h-12 md:h-10 text-white font-bold mt-2 mb-5`}
            >
              Pay Now
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Card;
