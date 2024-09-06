"use client";

import React, { useEffect, useState } from "react";
import BackButton from "../../reusable/BackButton";
import { FiSearch } from "react-icons/fi";
import { IoFilter } from "react-icons/io5";
import { TbFileDownload } from "react-icons/tb";

interface iHistory {
  transactionID: string;
  amount: number;
  status: string;
  type: string;
  rrr: string;
}

const History = () => {
  const [history, setHistory] = useState<iHistory[]>(
    Array(10).fill({
      transactionID: "2024523846831124",
      amount: 10000,
      status: "Success",
      type: "1% PROCESSING FEE",
      rrr: "2024523846831124",
    })
  );
  const [search, setSearch] = useState<string>("");

  return (
    <div className="mb-[5rem] flex flex-col items-start gap-5 lg:w-[80%] xs:w-full h-full xs:h-auto">
      <BackButton classicArrow={true} color={"#000000"} text={"History"} />
      <div className="w-full h-full xs:h-auto lg:max-h-[65vh] bg-white rounded-xl lg:p-4  xs:px-2 xs:py-4 flex flex-col gap-6">
        <div className="flex xs:flex-col lg:flex-row xs:gap-2 w-full justify-between items-center">
          <div className="relative text-[#595959] lg:w-[45%] xs:w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-[40px] rounded-[8px] border border-[#EDEEEF] pl-10 pr-3 text-body bg-[#F6F6F7]"
              placeholder="Search a bill"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-3" />
          </div>
          <div className="flex text-hint lg:w-fit xs:w-full items-center gap-2">
            <div className="lg:justify-start xs:justify-center xs:w-1/2 lg:w-fit text-b-1 flex bg-[#FEFEFE] text-black cursor-pointer rounded-lg py-2 items-center gap-1 px-3 border border-[#DFDFDF]">
              <IoFilter />
              <p className="font-semibold">Sort By</p>
            </div>
            <div className="lg:justify-start xs:justify-center xs:w-1/2 lg:w-fit text-b-1 flex bg-[#FEFEFE] text-black cursor-pointer rounded-lg py-2 items-center gap-1 px-3 border border-[#DFDFDF]">
              <IoFilter />
              <p className="font-semibold">Filter</p>
            </div>
          </div>
        </div>
        <div className="overflow-scroll scrollbar-thin w-full">
          <table className="w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Transaction Type</th>
                <th>RRR/TRX ID</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index} className="">
                  <td>{index + 1}</td>
                  <td>{item.transactionID}</td>
                  <td>₦{item.amount.toLocaleString("en-US")}</td>
                  <td>{item.status}</td>
                  <td>{item.type}</td>
                  <td>{item.rrr}</td>
                  <td>
                    <button className="text-[#3A3A3A] bg-[#D9EFE2] rounded text-smaller flex gap-1 px-2 py-1 items-center">
                      <TbFileDownload size={"16px"} />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
