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

import { useLogin } from "@/src/hooks/authHooks";

interface iManualLoginPayload {
  username: string;
  password: string;
}

//test2@mail.com taxTax12#

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { loading, fn } = useLogin();

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
            Log In
          </h1>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validate={(values) => {
              const errors: Partial<iManualLoginPayload> = {};
              if (!values.username) {
                errors.username = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                  values.username
                )
              ) {
                errors.username = "Invalid email address";
              }

              if (!values.password) {
                errors.password = "Required";
              } else if (values.password.length < 8) {
                errors.password = "Password must have at least 8 characters";
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              fn(values, (val: any) => {
                setSubmitting(false);
                if (val) {
                  useGlobalStore.setState({ loggedIn: true });
                  setTimeout(() => {
                    window.location.replace("/dashboard/make-payment");
                  }, 500);
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
                <div className="flex flex-col gap-[2px] w-full">
                  <h3 className="text-b-2 text-neutral-2">Email</h3>
                  <input
                    type="email"
                    name="username"
                    placeholder="Enter your email address"
                    value={values.username}
                    onChange={handleChange}
                    className="w-full text-b-1"
                  />
                  {errors.username && touched.username && (
                    <p className="text-s-4 text-error">{errors.username}</p>
                  )}
                </div>
                <div className="flex flex-col gap-[2px] w-full">
                  <h3 className="text-b-2 text-neutral-2">Password</h3>
                  <div className="w-full relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter password"
                      value={values.password}
                      onChange={handleChange}
                      className="w-full text-b-1 pr-11"
                    />
                    <div
                      className="absolute text-neutral-2 top-1/2 -translate-y-1/2 right-4 flex items-center cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword ? (
                        <MdVisibilityOff className="text-subextra" />
                      ) : (
                        <MdVisibility className="text-subextra" />
                      )}
                    </div>
                  </div>
                  {errors.password && touched.password && (
                    <p className="text-s-4 text-error">{errors.password}</p>
                  )}
                </div>

                <Link
                  href={"/auth/forgot-password"}
                  className="text-b-1 text-neutral-2 font-semibold text-end"
                >
                  Forgot Password?
                </Link>

                <button
                  disabled={loading}
                  type="submit"
                  onClick={() => {
                    setSubmitting(true);
                  }}
                  className={`bg-primary rounded-full w-full text-l-1 lg:h-[4rem] grid place-content-center xs:h-10 text-white font-semibold mt-3`}
                >
                  {loading ? <Loader color="white" /> : "Log in"}
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
