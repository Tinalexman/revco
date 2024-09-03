import { Loader } from "@mantine/core";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import React, { useState, FC } from "react";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";

import { states } from "@/src/constants/constants";

import { useGlobalStore } from "@/src/stores/globalStore";
import { toast } from "react-hot-toast";
import CustomPhoneInput from "../../reusable/CustomPhoneInput";
import {
  unformatNumberWithThreesAndFours,
  formatNumberWithThreesAndFours,
} from "@/src/functions/numberFunctions";
import { useGetStates, useGetLGAs } from "@/src/hooks/locationHooks";
import Dropdown from "../../reusable/Dropdown";

import { useRegister } from "@/src/hooks/authHooks";

interface iIndividual {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  state: string;
  lga: string;
  email: string;
  tin: string;
  password: string;
  confirmPassword: string;
  address: string;
  gender: string;
  dob: string;
}

const Individual: FC<{ hasNin: boolean }> = ({ hasNin }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const { data: states, loading: loadingStates } = useGetStates();
  const { data: lgas, loading: loadingLGAs, get: getLGA } = useGetLGAs();

  const { loading, fn } = useRegister();

  return (
    <div className="flex flex-col w-full gap-2">
      <h2 className="text-subtitle font-bold text-black font-nunito mt-3">
        Personal Information
      </h2>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          username: "",
          phoneNumber: "",
          state: "",
          lga: "",
          email: "",
          tin: "",
          password: "",
          confirmPassword: "",
          address: "",
          gender: "",
          dob: "",
        }}
        validate={(values) => {
          const errors: Partial<iIndividual> = {};
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

          if (!values.confirmPassword) {
            errors.confirmPassword = "Required";
          } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
          }

          if (!values.dob) {
            errors.dob = "Required";
          }

          if (!values.firstName) {
            errors.firstName = "Required";
          }

          if (!values.lastName) {
            errors.lastName = "Required";
          }

          if (!values.username) {
            errors.username = "Required";
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

          if (!values.address) {
            errors.address = "Required";
          }

          if (!values.gender) {
            errors.gender = "Required";
          }

          if (!values.tin) {
            errors.tin = "Required";
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
              role: "Individual",
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
        validateOnMount={false}
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
                <h3 className="text-b-2 text-neutral-2">Username</h3>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={values.username}
                  onChange={handleChange}
                  className="w-full text-b-1"
                />
                {errors.username && touched.username && (
                  <p className="text-s-1 text-error">{errors.username}</p>
                )}
              </div>
              <div className="flex flex-col gap-[2px] w-[48%]">
                <h3 className="text-b-2 text-neutral-2">Phone Number</h3>
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
                  className="w-full text-b-1"
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="text-s-1 text-error">{errors.phoneNumber}</p>
                )}
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-[2px] w-[48%]">
                <h3 className="text-b-2 text-neutral-2">State of Origin</h3>
                <Dropdown
                  menus={states.map((st, i) => ({
                    name: st.name,
                    onClick: () => {
                      setFieldValue("state", st.name);
                      setFieldValue("lga", "");
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
                {errors.state && touched.state && (
                  <p className="text-s-1 text-error">{errors.state}</p>
                )}
              </div>
              <div className="flex flex-col gap-[2px] w-[48%]">
                <h3 className="text-b-2 text-neutral-2">
                  Local Government Area
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
                {errors.lga && touched.lga && (
                  <p className="text-s-1 text-error">{errors.lga}</p>
                )}
              </div>
            </div>
            {!hasNin && (
              <div className="flex justify-between w-full">
                <div className="flex flex-col gap-[2px] w-[48%]">
                  <h3 className="text-b-2 text-neutral-2">Gender</h3>

                  <Dropdown
                    menus={["Male", "Female"].map((st, i) => ({
                      name: st,
                      onClick: () => {
                        setFieldValue("gender", st);
                      },
                    }))}
                    value={values.gender}
                    hint="Select Gender"
                    fitMenu={true}
                    alignToStart
                    showIcon
                  />

                  {errors.gender && (
                    <p className="text-s-1 text-error">{errors.gender}</p>
                  )}
                </div>
                <div className="flex flex-col gap-[2px] w-[48%]">
                  <h3 className="text-b-2 text-neutral-2">Date of Birth</h3>
                  <input
                    type="date"
                    name="dob"
                    value={values.dob}
                    onChange={handleChange}
                    className="w-full text-b-1"
                  />
                  {errors.dob && touched.dob && (
                    <p className="text-s-1 text-error">{errors.dob}</p>
                  )}
                </div>
              </div>
            )}
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
            <div className="flex flex-col items-center gap-[2px] w-full">
              <div className="w-full">
                <h3 className="text-b-2  text-neutral-2">Address</h3>
              </div>
              <textarea
                name="address"
                placeholder="Enter your address here"
                value={values.address}
                onChange={handleChange}
                className="w-full h-24 text-b-2 resize-none"
              />
              {errors.address && touched.address && (
                <p className="text-s-1 text-error">{errors.address}</p>
              )}
            </div>
            <button
              type="submit"
              onClick={() => {
                setSubmitting(true);
              }}
              disabled={loading}
              className={`bg-primary rounded-full xs:w-full  lg:w-[75%] text-l-1 lg:h-[4rem] grid place-content-center xs:h-10 text-white font-semibold mt-3`}
            >
              {loading ? <Loader color="white.9" /> : "Create Account"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Individual;
