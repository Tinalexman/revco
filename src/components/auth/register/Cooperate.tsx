import { Loader } from "@mantine/core";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import React, { useState, FC } from "react";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";

import { useGlobalStore } from "@/src/stores/globalStore";
import { toast } from "react-hot-toast";

interface iCooperate {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  tin: string;
  password: string;
  confirmPassword: string;
  businessName: string;
  businessCategory: string;
  email: string;
  country: string;
  rc: string;
}

const Cooperate = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  return (
    <div className="flex flex-col gap-3 border-t-grey-18 border-x-0 border-b-0 border w-full">
      <h2 className="text-subtitle font-bold text-black font-nunito mt-3">
        Business Information
      </h2>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          phoneNumber: "",
          tin: "",
          password: "",
          confirmPassword: "",
          businessName: "",
          businessCategory: "",
          email: "",
          country: "",
          rc: "",
        }}
        validate={(values) => {
          const errors: Partial<iCooperate> = {};
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
            className="w-full flex flex-col items-center gap-3"
            method="POST"
          >
            <div className="flex justify-around w-full">
              <div className="flex flex-col gap-[2px] w-[48%]">
                <h3 className="text-body text-neutral-2">Business Name</h3>
                <input
                  type="text"
                  name="businessName"
                  placeholder="Enter business name"
                  value={values.businessName}
                  onChange={handleChange}
                  className="w-full text-body"
                />
                {errors.businessName && touched.businessName && (
                  <p className="text-hint text-error">{errors.businessName}</p>
                )}
              </div>
              <div className="flex flex-col gap-[2px] w-[48%]">
                <h3 className="text-body text-neutral-2">Business Category</h3>
                <select
                  name="businessCategory"
                  value={values.businessCategory}
                  onChange={handleChange}
                  className="w-full text-body"
                ></select>
                {errors.businessCategory && touched.businessCategory && (
                  <p className="text-hint text-error">
                    {errors.businessCategory}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-around w-full">
              <div className="flex flex-col gap-[2px] w-[48%]">
                <h3 className="text-body text-neutral-2">Email Address</h3>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={values.email}
                  onChange={handleChange}
                  className="w-full text-body"
                />
                {errors.email && touched.email && (
                  <p className="text-hint text-error">{errors.email}</p>
                )}
              </div>
              <div className="flex flex-col gap-[2px] w-[48%]">
                <h3 className="text-body text-neutral-2">
                  Country of Operation
                </h3>
                <select
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                  className="w-full text-body"
                ></select>
                {errors.country && touched.country && (
                  <p className="text-hint text-error">{errors.country}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-[2px] w-full pl-2">
              <h3 className="text-body text-neutral-2">RC Number</h3>
              <input
                type="text"
                name="rc"
                placeholder="Enter RC number"
                value={values.rc}
                onChange={handleChange}
                className="w-[48%] text-body"
              />
              {errors.rc && touched.rc && (
                <p className="text-hint text-error">{errors.rc}</p>
              )}
            </div>

            <div className="border-t-grey-18 border-x-0 border-b-0 border w-full">
              <h2 className="text-subtitle font-bold text-black font-nunito mt-3">
                Personal Information
              </h2>
            </div>

            <div className="flex justify-around w-full">
              <div className="flex flex-col gap-[2px] w-[48%]">
                <h3 className="text-body text-neutral-2">First Name</h3>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={values.firstName}
                  onChange={handleChange}
                  className="w-full text-body"
                />
                {errors.firstName && touched.firstName && (
                  <p className="text-hint text-error">{errors.firstName}</p>
                )}
              </div>
              <div className="flex flex-col gap-[2px] w-[48%]">
                <h3 className="text-body text-neutral-2">Last Name</h3>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={values.lastName}
                  onChange={handleChange}
                  className="w-full text-body"
                />
                {errors.lastName && touched.lastName && (
                  <p className="text-hint text-error">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="flex justify-around w-full">
              <div className="flex flex-col gap-[2px] w-[48%]">
                <h3 className="text-body text-neutral-2">Phone Number</h3>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="+234"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  className="w-full text-body"
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="text-hint text-error">{errors.phoneNumber}</p>
                )}
              </div>
              <div className="flex flex-col gap-[2px] w-[48%]">
                <h3 className="text-body text-neutral-2">TIN</h3>
                <input
                  type="text"
                  name="tin"
                  placeholder="Enter your TIN"
                  value={values.tin}
                  onChange={handleChange}
                  className="w-full text-body"
                />
                {errors.tin && touched.tin && (
                  <p className="text-hint text-error">{errors.tin}</p>
                )}
              </div>
            </div>

            <div className="flex justify-around w-full">
              <div className="flex flex-col gap-[2px] w-[48%] relative">
                <h3 className="text-body text-neutral-2">Password</h3>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
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
              <div className="flex flex-col gap-[2px] w-[48%] relative">
                <h3 className="text-body text-neutral-2">Confirm Password</h3>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  className="w-full text-body pr-11"
                />
                <div
                  className="absolute text-neutral-2 top-[30px] right-4 flex items-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                >
                  {showConfirmPassword ? (
                    <MdVisibilityOff size={"22px"} />
                  ) : (
                    <MdVisibility size={"22px"} />
                  )}
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-hint text-error">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

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
              type="submit"
              className={`bg-primary rounded-full w-[75%] text-body h-[60px] text-white font-bold mt-3`}
            >
              Continue
            </motion.button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Cooperate;
