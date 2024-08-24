"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/image_261.png";

import { Form, Formik } from "formik";
import { Loader } from "@mantine/core";

import { MdVisibilityOff, MdVisibility } from "react-icons/md";

import { useGlobalStore } from "@/src/stores/globalStore";
import { toast } from "react-hot-toast";
interface iManualLoginPayload {
  email: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-background bg-opacity-[0.95]">
      <div className="h-fit lg:w-[450px] xl:w-[500px] 2xl:w-[600px] 3xl:w-[700px] 4xl:w-[800px] xs:w-full xs:px-5 flex flex-col items-center justify-center gap-5">
        <Image
          src={Logo}
          alt="logo"
          className="4xl:size-[7.5rem] 3xl:size-[6.8rem] 2xl:size-[6.3rem] xl:size-[5.8rem] lg:size-[5.3rem] md:size-[4.8rem] xs:size-[4rem] object-cover"
          width={72}
          height={72}
        />
        <div className="flex flex-col gap-5 w-full">
          <h1 className="text-h-3 font-bold text-neutral-2">Log In</h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validate={(values) => {
              const errors: Partial<iManualLoginPayload> = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }

              if (!values.password) {
                errors.password = "Required";
              } else if (values.password.length < 8) {
                errors.password = "Password must have at least 8 characters";
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(false);
              useGlobalStore.setState({ loggedIn: true });
              toast.success("Welcome back");
              setTimeout(() => {
                window.location.replace("/dashboard/pay-bills");
              }, 1500);
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
                className="w-full flex flex-col xs:gap-2 lg:gap-3 2xl:gap-4 3xl:gap-5 4xl:gap-6"
                method="POST"
              >
                <div className="flex flex-col gap-[2px] w-full">
                  <h3 className="text-b-1 text-neutral-2">Email</h3>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={values.email}
                    onChange={handleChange}
                    className="w-full"
                  />
                  {errors.email && touched.email && (
                    <p className="text-s-4 text-error">{errors.email}</p>
                  )}
                </div>
                <div className="flex flex-col gap-[2px] w-full">
                  <h3 className="text-b-1 text-neutral-2">Password</h3>
                  <div className="w-full relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={values.password}
                      onChange={handleChange}
                      className="w-full pr-11 lg:pr-14 xs:pr-8"
                    />
                    <div className="absolute inset-y-0 top-1/2 -translate-y-1/2 xs:right-2 sm:right-3 md:right-4 lg:right-5 xl:right-6 flex items-center cursor-pointer">
                      {showPassword ? (
                        <MdVisibilityOff className="text-h-3" />
                      ) : (
                        <MdVisibility className="text-h-3" />
                      )}
                    </div>
                  </div>
                  {errors.password && touched.password && (
                    <p className="text-s-4 text-error">{errors.password}</p>
                  )}
                </div>

                <Link
                  href={"/auth/reset-password"}
                  className="text-b-1 text-neutral-2 font-semibold text-end"
                >
                  Forgot Password?
                </Link>

                <button
                  disabled={isSubmitting}
                  className={`bg-primary rounded-full w-full text-l-1 xs:h-10 sm:h-12 md:h-14 lg:h-16 xl:h-18 2xl:h-20 3xl:h-22 4xl:h-24 text-white font-bold xs:mt-2 sm:mt-3 md:mt-4 lg:mt-5 xl:mt-6 2xl:mt-7 3xl:mt-8 4xl:mt-10`}
                >
                  {isSubmitting ? <Loader color="white" /> : "Log In"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <p className="text-b-1 text-black">
          Don&apos;t have an account?{" "}
          <span className="text-primary font-bold underline">
            <Link href={"/auth/register"}>REGISTER</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
