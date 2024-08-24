import React, { FC, useState, useEffect } from "react";
import Receipt from "@/public/noto_receipt.png";
import Image from "next/image";
import { Loader } from "@mantine/core";

const PaymentModal: FC<{ onContinue: (val: string) => void }> = ({
  onContinue,
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    generateID();
  }, []);

  const generateID = async () => {
    setTimeout(async () => {
      await Promise.resolve();
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="w-full h-[24rem] flex items-center justify-center bg-white font-nunito">
      {loading && <Loader color="primary.9" />}
      {!loading && (
        <div className="flex flex-col items-center justify-center gap-6 px-6 w-full h-full">
          <Image
            src={Receipt}
            alt="receipt"
            className="size-[6rem] object-cover"
          />
          <p className="text-black text-b-2 text-center">
            A tax profile with the Payer Id{" "}
            <span className="text-primary font-bold">WX-513785 </span>
            has been created for you. You can register later to view all your
            invoices, payments and receipts.
          </p>
          <button
            onClick={() => onContinue("WX-513785")}
            className={`bg-primary rounded-full w-[70%] text-smaller text-s-4 lg:h-12 xs:h-10 2xl:h-14 3xl:h-16 4xl:h-20 text-white font-semibold mt-2`}
          >
            Confirm - Continue To Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentModal;
