import React from "react";

const Branch = () => {
  return (
    <div className="w-[60%] mt-2 flex flex-col items-center gap-10">
      <p className="text-small text-center text-black">
        Kindly walk into any of the underlisted banks and present your{" "}
        <span className="text-tertiary">Paysure Invoice Number (PIN)</span> to
        make payment against this invoice
      </p>
      <button
        className={`bg-[#408BFC] rounded-[10px] w-[70%] text-large h-12 text-white font-bold mb-5`}
      >
        Print Invoice
      </button>
    </div>
  );
};

export default Branch;
