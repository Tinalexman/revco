import {
  checkForLowerCase,
  checkForNumber,
  checkForUpperCase,
  checkPasswordLength,
  checkPasswordPresent,
} from "@/src/functions/validationFunctions";
import React, { FC } from "react";

import { FaCheckCircle } from "react-icons/fa";

const PasswordChecker: FC<{ password: string }> = ({ password }) => {
  const trimmedPassword = password.trim();
  const passwordPresence = checkPasswordPresent(trimmedPassword);
  const passwordLength = checkPasswordLength(trimmedPassword);
  const uppercasePassword = checkForUpperCase(trimmedPassword);
  const lowercasePassword = checkForLowerCase(trimmedPassword);
  const numberedPassword = checkForNumber(trimmedPassword);

  const allChecksArePassed =
    passwordPresence.valid &&
    passwordLength.valid &&
    uppercasePassword.valid &&
    lowercasePassword.valid &&
    numberedPassword.valid;

  return (
    <div
      className={`${
        allChecksArePassed ? "bg-white" : "bg-[#F9DEDC]"
      } w-full flex flex-col py-3 px-4 rounded-2xl mt-2 gap-2`}
    >
      <h3 className="text-b-2 text-[#111213]">Password must have:</h3>
      <div className="w-full flex flex-col gap-1">
        <div className="w-fit gap-2 flex items-center">
          <FaCheckCircle
            size={16}
            className={`${
              passwordLength.valid ? "text-[#00C593]" : "text-[#A9A9A9]"
            }`}
          />
          <p className="text-[#595959] font-medium text-s-1">
            At least 8 characters
          </p>
        </div>
        <div className="w-fit gap-1 flex items-center">
          <FaCheckCircle
            size={16}
            className={`${
              numberedPassword.valid ? "text-[#00C593]" : "text-[#A9A9A9]"
            }`}
          />
          <p className="text-[#595959] font-medium text-s-1">
            At least 1 number
          </p>
        </div>
        <div className="w-fit gap-1 flex items-center">
          <FaCheckCircle
            size={16}
            className={`${
              uppercasePassword.valid && lowercasePassword.valid
                ? "text-[#00C593]"
                : "text-[#A9A9A9]"
            }`}
          />
          <p className="text-[#595959] font-medium text-s-1 w-[80%]">
            At least 1 UPPERCASE & 1 lowercase
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordChecker;
