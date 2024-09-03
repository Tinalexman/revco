"use client";

import React, { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/image_261.png";

import { Form, Formik } from "formik";
import { Loader } from "@mantine/core";

import { useSearchParams, useRouter } from "next/navigation";

import { MdVisibilityOff, MdVisibility } from "react-icons/md";

import { useGlobalStore } from "@/src/stores/globalStore";
import { toast } from "react-hot-toast";

import { useResetPassword } from "@/src/hooks/authHooks";

const ResetPassword = () => (
  <Suspense fallback={<Loader />}>
    <Content />
  </Suspense>
);

interface iVals {
  email: string;
  resetCode: string;
  password: string;
}

const Content = () => {
  const [initialValues, setInitialValues] = useState<iVals>({
    email: "",
    resetCode: "",
    password: "",
  });

  const { loading, fn } = useResetPassword();

  const searchParams = useSearchParams();
  const router = useRouter();

  const target = searchParams.get("email");

  useEffect(() => {
    if (target) {
      setInitialValues({ ...initialValues, email: target });
    } else {
      router.back();
    }
  }, [router]);

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
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-l-1 font-bold text-neutral-2 lg:text-start xs:text-center">
            Reset Password
          </h1>
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validate={(values) => {
              const errors: any = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }

              if (!values.resetCode) {
                errors.resetCode = "Required";
              } else if (values.resetCode.length !== 6) {
                errors.resetCode = "Reset Code must be 6 digits";
              }

              if (!values.password) {
                errors.password = "Required";
              } else if (values.password.length < 8) {
                errors.password = "Password must have at least 8 characters";
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              fn(values, (val?: any) => {
                setSubmitting(false);
                if (val) {
                  setTimeout(() => window.location.assign("/auth/login"), 500);
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
              setFieldValue,
            }) => (
              <Form
                onSubmit={handleSubmit}
                className="w-full flex flex-col xs:gap-2 lg:gap-3 2xl:gap-4 3xl:gap-5 4xl:gap-6"
                method="POST"
              >
                <div className="flex flex-col gap-[2px] w-full mt-5">
                  <h3 className="text-b-2 text-neutral-2">Reset Code</h3>
                  <input
                    type="text"
                    name="resetCode"
                    placeholder="Enter your reset code"
                    value={values.resetCode}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (!isNaN(Number(val))) {
                        setFieldValue("resetCode", val);
                      }
                    }}
                    className="w-full text-b-1"
                  />
                  {errors.resetCode && touched.resetCode && (
                    <p className="text-hint text-error">{errors.resetCode}</p>
                  )}
                </div>

                <div className="flex flex-col gap-[2px] w-full">
                  <h3 className="text-b-1 text-neutral-2">Password</h3>
                  <div className="w-full relative">
                    <input
                      type="text"
                      name="password"
                      placeholder="Enter password"
                      value={values.password}
                      onChange={handleChange}
                      className="w-full text-b-1"
                    />
                  </div>
                  {errors.password && touched.password && (
                    <p className="text-s-4 text-error">{errors.password}</p>
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
                  {loading ? <Loader color="white" /> : "Reset"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
