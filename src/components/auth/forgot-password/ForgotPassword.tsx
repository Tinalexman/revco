"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/image_261.png";

import { Form, Formik } from "formik";
import { Loader } from "@mantine/core";

import { useForgotPassword } from "@/src/hooks/authHooks";

const ForgotPassword = () => {
  const { loading, fn } = useForgotPassword();

  return (
    <div className="w-full h-full flex flex-col items-center lg:justify-center xs:justify-start bg-white bg-opacity-[0.94]">
      <div className="h-fit lg:w-[450px] xl:w-[500px] 2xl:w-[600px] 3xl:w-[700px] 4xl:w-[800px] xs:w-full xs:px-5 xs:mt-10 lg:mt-0 flex flex-col items-center justify-center gap-10">
        <Image
          src={Logo}
          alt="logo"
          className="4xl:size-[7.5rem] 3xl:size-[6.8rem] 2xl:size-[6.3rem] xl:size-[5.8rem] lg:size-[5.3rem] md:size-[4.8rem] xs:size-[4rem] object-cover"
          width={72}
          height={72}
        />
        <div className="flex flex-col gap-5 w-full">
          <h1 className="text-l-1 font-bold text-neutral-2 lg:text-start xs:text-center">
            Forgot Password
          </h1>
          <Formik
            initialValues={{
              email: "",
            }}
            validate={(values) => {
              const errors: any = {};
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
              fn(values.email, (val?: any) => {
                setSubmitting(false);
                if (val) {
                  setTimeout(
                    () =>
                      window.location.assign(
                        `/auth/confirmation?email=${values.email}&new=false`
                      ),
                    500
                  );
                }
              });
            }}
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
              setSubmitting,
            }) => (
              <Form
                onSubmit={handleSubmit}
                className="w-full flex flex-col xs:gap-2 lg:gap-3 2xl:gap-4 3xl:gap-5 4xl:gap-6"
                method="POST"
              >
                <div className="flex flex-col gap-[2px] w-full mt-5">
                  <h3 className="text-b-2 text-neutral-2">Email</h3>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={values.email}
                    onChange={handleChange}
                    className="w-full text-b-1"
                  />
                  {errors.email && touched.email && (
                    <p className="text-hint text-error">{errors.email}</p>
                  )}
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  onClick={() => {
                    setSubmitting(true);
                  }}
                  className={`bg-primary rounded-full w-full text-l-1 lg:h-[4rem] grid place-content-center xs:h-10 text-white font-semibold mt-3`}
                >
                  {loading ? <Loader color="white" /> : "Proceed"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
