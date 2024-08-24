import React from "react";

const POS = () => {
  return (
    <div className="lg:w-[60%] xs:w-full mt-2 flex flex-col items-center gap-10">
      <p className="text-s-4 text-center text-black">
        You can make payment at POS terminals in any of the offices of the
        Taraba State Board of Internal Revenue Service with your ATM cards
        (MasterCard, Visa and Verve). You will be required to present your{" "}
        <span className="text-tertiary">Payment Invoice Number (PIN)</span>
      </p>
      <button
        className={`bg-[#408BFC] rounded-[10px] lg:w-[70%] xs:w-[80%] text-b-1 lg:h-12 xs:h-10 text-white font-bold mb-5`}
      >
        Pay Now
      </button>
    </div>
  );
};

export default POS;
