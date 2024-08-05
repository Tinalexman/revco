"use client";

import React, { useState } from "react";
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
    Array(3).fill({
      transactionID: "2024523846831124",
      amount: 10000,
      status: "Success",
      type: "1% PROCESSING FEE",
      rrr: "2024523846831124",
    })
  );
  const [search, setSearch] = useState<string>("");

  return (
    <div className="flex flex-col pt-16 items-start gap-5 w-[55rem] h-full">
      <BackButton classicArrow={true} color={"#000000"} text={"History"} />
      <div className="w-full h-full max-h-[20rem] bg-white rounded-xl p-4 flex flex-col gap-6">
        <div className="flex w-full justify-between items-center">
          <div className="relative text-[#595959] w-[280px]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-[40px] rounded-[8px] border border-[#EDEEEF] pl-10 pr-3 text-body bg-[#F6F6F7]"
              placeholder="Search a bill"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-3" />
          </div>
          <div className="flex text-hint w-fit items-center gap-2">
            <div className="flex bg-[#FEFEFE] text-black cursor-pointer rounded-lg py-2 items-center gap-1 px-3 border border-[#DFDFDF]">
              <IoFilter />
              <p className="font-semibold">Sort By</p>
            </div>
            <div className="flex bg-[#FEFEFE] text-black cursor-pointer rounded-lg py-2 items-center gap-1 px-3 border border-[#DFDFDF]">
              <IoFilter />
              <p className="font-semibold">Filter</p>
            </div>
          </div>
        </div>
        <table>
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
  );
};

export default History;
