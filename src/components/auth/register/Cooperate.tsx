import { Loader } from "@mantine/core";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";

import { useGlobalStore } from "@/src/stores/globalStore";
import { toast } from "react-hot-toast";

import {
  unformatNumberWithThreesAndFours,
  formatNumberWithThreesAndFours,
} from "@/src/functions/numberFunctions";

import { useRegister } from "@/src/hooks/authHooks";

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

  const { loading, fn } = useRegister();

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
            errors.password = "Password must have at least 8 characters";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          fn(
            {
              firstName: values.firstName,
              lastName: values.lastName,
              password: values.password,
              email: values.email,
              passwordConfirmation: values.confirmPassword,
              phone: unformatNumberWithThreesAndFours(values.phoneNumber),
              project: {
                projectId: 2,
              },
              role: "Non-Individual",
            },
            () => {
              setSubmitting(false);
              useGlobalStore.setState({ loggedIn: true });
              setTimeout(() => {
                window.location.replace("/dashboard/make-payment");
              }, 500);
            }
          );
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
          setSubmitting,
        }) => (
          <Form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center gap-3"
            method="POST"
          >
            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-[2px] w-[48%]">
                <h3 className="text-b-2 text-neutral-2">Business Name</h3>
                <input
                  type="text"
                  name="businessName"
                  placeholder="Enter business name"
                  value={values.businessName}
                  onChange={handleChange}
                  className="w-full text-b-1"
                />
                {errors.businessName && touched.businessName && (
                  <p className="text-s-1 text-error">{errors.businessName}</p>
                )}
              </div>

              <div className="flex flex-col gap-[2px] w-[48%]">
                <h3 className="text-b-2 text-neutral-2">Business Category</h3>
                <input
                  type="text"
                  name="businessCategory"
                  placeholder="Enter business category"
                  value={values.businessCategory}
                  onChange={handleChange}
                  className="w-full text-b-1"
                />
                {errors.businessCategory && touched.businessCategory && (
                  <p className="text-s-1 text-error">
                    {errors.businessCategory}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-[2px] w-[48%]">
                <h3 className="text-b-2 text-neutral-2">Email Address</h3>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={values.email}
                  onChange={handleChange}
                  className="w-full text-b-1"
                />
                {errors.email && touched.email && (
                  <p className="text-s-1 text-error">{errors.email}</p>
                )}
              </div>
              <div className="flex flex-col gap-[2px] w-[48%]">
                <h3 className="text-b-2 text-neutral-2">
                  Country of Operation
                </h3>
                <input
                  type="text"
                  name="country"
                  placeholder="Enter country"
                  value={values.country}
                  onChange={handleChange}
                  className="w-full text-b-1"
                />
                {errors.country && touched.country && (
                  <p className="text-s-1 text-error">{errors.country}</p>
                )}
              </div>
            </div>

            <div className="w-full">
              <div className="flex flex-col gap-[2px] w-[48%]">
                <h3 className="text-b-2 text-neutral-2">RC Number</h3>
                <input
                  type="text"
                  name="rc"
                  placeholder="Enter RC number"
                  value={values.rc}
                  onChange={handleChange}
                  className="w-full text-b-1"
                />
                {errors.rc && touched.rc && (
                  <p className="text-s-1 text-error">{errors.rc}</p>
                )}
              </div>
            </div>

            <div className="border-t-grey-18 border-x-0 border-b-0 border w-full">
              <h2 className="text-subtitle font-bold text-black font-nunito mt-3">
                Personal Information
              </h2>
            </div>

            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-[2px] w-[48%]">
                <h3 className="text-b-2 text-neutral-2">First Name</h3>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={values.firstName}
                  onChange={handleChange}
                  className="w-full text-b-1"
                />
                {errors.firstName && touched.firstName && (
                  <p className="text-s-1 text-error">{errors.firstName}</p>
                )}
              </div>
              <div className="flex flex-col gap-[2px] w-[48%]">
                <h3 className="text-b-2 text-neutral-2">Last Name</h3>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={values.lastName}
                  onChange={handleChange}
                  className="w-full text-b-1"
                />
                {errors.lastName && touched.lastName && (
                  <p className="text-s-1 text-error">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-[2px] w-[48%]">
                <h3 className="text-b-2 text-neutral-2">Phone Number</h3>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter 080 *********"
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
                  className="w-full text-b-1"
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="text-s-1 text-error">{errors.phoneNumber}</p>
                )}
              </div>
              <div className="flex flex-col gap-[2px] w-[48%]">
                <h3 className="text-b-2 text-neutral-2">TIN</h3>
                <input
                  type="text"
                  name="tin"
                  placeholder="Enter your TIN"
                  value={values.tin}
                  onChange={handleChange}
                  className="w-full text-b-1"
                />
                {errors.tin && touched.tin && (
                  <p className="text-s-1 text-error">{errors.tin}</p>
                )}
              </div>
            </div>

            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-[2px] w-[48%]">
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
                  <p className="text-s-1 text-error">{errors.password}</p>
                )}
              </div>
              <div className="flex flex-col gap-[2px] w-[48%]">
                <h3 className="text-b-2 text-neutral-2">Confirm Password</h3>
                <div className="w-full relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    className="w-full text-b-1 pr-11"
                  />
                  <div
                    className="absolute text-neutral-2 top-1/2 -translate-y-1/2 right-4 flex items-center cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowConfirmPassword(!showConfirmPassword);
                    }}
                  >
                    {showConfirmPassword ? (
                      <MdVisibilityOff className="text-subextra" />
                    ) : (
                      <MdVisibility className="text-subextra" />
                    )}
                  </div>
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-s-1 text-error">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              onClick={() => {
                setSubmitting(true);
              }}
              disabled={loading}
              className={`bg-primary rounded-full xs:w-full lg:w-[75%] text-l-1 lg:h-[4rem] grid place-content-center xs:h-10 text-white font-semibold mt-5`}
            >
              {loading ? <Loader color="white.9" /> : "Create Account"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Cooperate;
