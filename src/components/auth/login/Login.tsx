"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/image_261.png";

import { Form, Formik } from "formik";
import { Loader } from "@mantine/core";

import { MdVisibilityOff, MdVisibility } from "react-icons/md";

import { motion } from "framer-motion";

import { useGlobalStore } from "@/src/stores/globalStore";
import { toast } from "react-hot-toast";
interface iManualLoginPayload {
  email: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="w-full h-full flex items-center justify-center font-nunito bg-background bg-opacity-[0.95]">
      <div className="w-[350px] flex flex-col items-center gap-5">
        <Image
          src={Logo}
          alt="logo"
          className="size-[100px] object-cover"
          width={100}
          height={100}
        />
        <div className="flex flex-col gap-5 w-full">
          <motion.h1
            initial={{
              x: "100%",
            }}
            animate={{
              x: "0%",
              transition: {
                duration: 1,
                ease: "easeOut",
              },
            }}
            className="text-header font-bold text-neutral-2"
          >
            Log In
          </motion.h1>
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
                errors.password = "Password must be more at least 8 characters";
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(false);
              useGlobalStore.setState({ loggedIn: true });
              toast.success("Welcome back");
              setTimeout(() => {
                window.location.replace("/dashboard");
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
                className="w-full flex flex-col gap-2"
                method="POST"
              >
                <div className="flex flex-col gap-[2px] w-full">
                  <h3 className="text-body text-neutral-2">Email</h3>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={values.email}
                    onChange={handleChange}
                    className="w-full text-body"
                  />
                  {errors.email && touched.email && (
                    <p className="text-hint text-error">{errors.email}</p>
                  )}
                </div>
                <div className="flex flex-col gap-[2px] w-full relative">
                  <h3 className="text-body text-neutral-2">Password</h3>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    className="w-full text-body pr-11"
                  />
                  <div
                    className="absolute text-neutral-2 top-[30px] right-4 flex items-center cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
                      <MdVisibilityOff size={"22px"} />
                    ) : (
                      <MdVisibility size={"22px"} />
                    )}
                  </div>
                  {errors.password && touched.password && (
                    <p className="text-hint text-error">{errors.password}</p>
                  )}
                </div>
                <Link
                  href={"/auth/reset-password"}
                  className="text-body text-neutral-2 font-semibold text-end"
                >
                  Forgot Password?
                </Link>

                <motion.button
                  initial={{
                    y: "10%",
                  }}
                  animate={{
                    y: "0%",
                    transition: {
                      duration: 1,
                      ease: "easeOut",
                    },
                  }}
                  disabled={isSubmitting}
                  className={`bg-primary rounded-full w-full text-body h-[60px] text-white font-bold mt-3`}
                >
                  {isSubmitting ? <Loader color="white" /> : "Log In"}
                </motion.button>
              </Form>
            )}
          </Formik>
        </div>
        <p className="text-hint text-black">
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
