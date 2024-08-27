import React from "react";
import { RiLockPasswordLine } from "react-icons/ri";

const Powered = () => {
  return (
    <div className="xs:w-[160px] lg:w-[200px] xl:w-[250px] 2xl:w-[280px] 3xl:w-[320px] text-s-4 py-2 bg-white border-2 text-black border-[#E6E6E6] rounded-[6px] flex items-center justify-center gap-1">
      <RiLockPasswordLine className="text-l-1" />
      <p>
        Powered by <span className="text-tertiary font-bold">paysure</span>
      </p>
    </div>
  );
};

export default Powered;
