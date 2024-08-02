import { Loader } from "@mantine/core";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";

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
}

const Individual = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  return (
    <div className="flex flex-col border-t-grey-18 border w-full">
      <h2 className="text-subtitle font-bold text-black">Personal Information</h2>
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
            errors.password = "Password must be more at least 8 characters";
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
              className={`bg-primary rounded-full w-full text-body h-[60px] text-white font-bold`}
            >
              Continue
            </motion.button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Individual;
