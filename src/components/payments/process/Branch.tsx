import React, { FC } from "react";

const Branch: FC<{ print: () => void }> = ({ print }) => {
  return (
    <div className="lg:w-[60%] xs:w-full mt-2 flex flex-col items-center gap-10">
      <p className="text-s-4 text-center text-black">
        Kindly walk into any of the underlisted banks and present your{" "}
        <span className="text-tertiary">Payment Invoice Number (PIN)</span> to
        make payment against this invoice
      </p>
      <button
        onClick={print}
        className={`bg-[#408BFC] rounded-[10px] lg:w-[70%] xs:w-[80%] text-b-1 lg:h-12 xs:h-10 text-white font-bold mb-5`}
      >
        Print Invoice
      </button>
    </div>
  );
};

export default Branch;
