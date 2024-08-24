import React, { useState, useEffect, forwardRef, FC } from "react";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const CustomPhoneInput: FC<{
  phoneNumber: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleBlur: React.FocusEventHandler<HTMLInputElement>;
  setField: (val: string) => void;
}> = ({ phoneNumber, handleBlur, handleChange, setField }) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState("0.9rem");

  useEffect(() => {
    const updateFontSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setFontSize("0.8rem");
      } else if (width >= 768 && width < 1024) {
        setFontSize("0.9rem");
      } else {
        setFontSize("1rem");
      }
    };

    window.addEventListener("resize", updateFontSize);
    updateFontSize();

    return () => window.removeEventListener("resize", updateFontSize);
  }, []);

  return (
    <PhoneInput
      defaultCountry="NG"
      international={true}
      onChange={(e) => {
        e?.toString() && setField(e?.toString());
      }}
      inputComponent={forwardRef<HTMLInputElement>((props, ref) => (
        <input
          ref={ref}
          name={"phoneNumber"}
          value={phoneNumber}
          placeholder="Enter phone number"
          onChange={handleChange}
          onFocus={() => {
            console.log("On Focus");
            setFocused(true);
          }}
          onBlur={(e) => {
            console.log("On Blur");
            setFocused(false);
            handleBlur(e);
          }}
          type="tel"
          autoComplete="tel"
          style={{
            border: "none",
            boxShadow: "none",
            paddingLeft: "2px",
            fontSize: fontSize,
          }}
          {...props}
        />
      ))}
      className={`bg-white text-black text-body rounded-lg w-full text-body md:pl-2 pl-4 ${
        focused && "ring-2 ring-green-600"
      }`}
    />
  );
};

export default CustomPhoneInput;
