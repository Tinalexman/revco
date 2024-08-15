import React from "react";

const Branch = () => {
  return (
    <div className="w-[60%] md:w-full mt-2 flex flex-col items-center gap-10">
      <p className="text-small text-center text-black">
        Kindly walk into any of the underlisted banks and present your{" "}
        <span className="text-tertiary">Payment Invoice Number (PIN)</span> to
        make payment against this invoice
      </p>
      <button
        className={`bg-[#408BFC] rounded-[10px] w-[70%] md:w-[80%] text-large h-12 md:h-10 text-white font-bold mb-5`}
      >
        Print Invoice
      </button>
    </div>
  );
};

export default Branch;
