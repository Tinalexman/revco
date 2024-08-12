import React from "react";

const POS = () => {
  return (
    <div className="w-[60%] md:w-full mt-2 flex flex-col items-center gap-10">
      <p className="text-small text-center text-black">
        You can make payment at POS terminals in any of the offices of the Niger
        State Board of Internal Revenue with your ATM cards (MasterCard, Visa
        and Verve). You will be required to present your{" "}
        <span className="text-tertiary">Paysure Invoice Number (PIN)</span>
      </p>
      <button
        className={`bg-[#408BFC] rounded-[10px] w-[70%] md:w-[80%] text-large h-12 md:h-10 text-white font-bold mb-5`}
      >
        Pay Now
      </button>
    </div>
  );
};

export default POS;
