"use client";

import React, { FC, useEffect, useState } from "react";
import BackButton from "../../reusable/BackButton";
import { FiSearch } from "react-icons/fi";
import { IoFilter } from "react-icons/io5";
import { TbFileDownload } from "react-icons/tb";
import Dropdown from "../../reusable/Dropdown";

interface iHistory {
  invoiceNo: string;
  amount: number;
  paid: boolean;
  mda: string;
  revenueHead: string;
}

const History = () => {
  const [history, setHistory] = useState<iHistory[]>([
    {
      invoiceNo: "1234567890123",
      amount: 10000,
      paid: true,
      mda: "Ministry of Finance",
      revenueHead: "PAYEE",
    },
    {
      invoiceNo: "1234567890123",
      amount: 15000,
      paid: false,
      mda: "Ministry of Land",
      revenueHead: "Service Bills",
    },
    {
      invoiceNo: "1234567890123",
      amount: 9000,
      paid: true,
      mda: "Ministry of Power",
      revenueHead: "Nepa Money",
    },
  ]);
  const [filteredHistory, setFilteredHistory] = useState<iHistory[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("All");

  const [hasFilter, setHasFilter] = useState<boolean>(false);

  const searchHistory = (event: any) => {
    let text: string = event.target.value.trim();
    setSearch(text);

    if (text === "") {
      setFilteredHistory([]);
      setHasFilter(filter !== "All");
      return;
    }

    const newHistory: iHistory[] = [];
    text = text.toLowerCase();

    for (let i = 0; i < history.length; ++i) {
      const contains =
        history[i].invoiceNo.toLowerCase().includes(text) ||
        history[i].mda.toLowerCase().includes(text) ||
        history[i].revenueHead.toLowerCase().includes(text) ||
        history[i].amount.toString().includes(text);
      if (contains) {
        newHistory.push(history[i]);
      }
    }

    setFilteredHistory(newHistory);
    setHasFilter(true);
  };

  const sortHistory = (sortFilter: string) => {
    if (sortFilter === "All") {
      setFilteredHistory([]);
      setHasFilter(false);
      return;
    }

    if (sortFilter === "Paid") {
      setFilteredHistory(history.filter((v) => v.paid));
      setHasFilter(true);
      return;
    }

    if (sortFilter === "Unpaid") {
      setFilteredHistory(history.filter((v) => !v.paid));
      setHasFilter(true);
      return;
    }
  };

  return (
    <div className="mb-[5rem] flex flex-col items-start gap-5 lg:w-[80%] xs:w-full h-full xs:h-auto">
      <BackButton classicArrow={true} color={"#000000"} text={"History"} />
      <div className="w-full h-full xs:h-auto lg:max-h-[65vh] bg-white rounded-xl lg:p-4  xs:px-2 xs:py-4 flex flex-col gap-6">
        <div className="flex xs:flex-col lg:flex-row xs:gap-2 w-full justify-between items-center">
          <div className="relative text-[#595959] lg:w-[45%] xs:w-full">
            <input
              type="text"
              value={search}
              onChange={searchHistory}
              className="w-full h-[40px] rounded-[8px] border border-[#EDEEEF] pl-10 pr-3 text-body bg-[#F6F6F7]"
              placeholder="Search a bill"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-3" />
          </div>

          <div className="w-[140px]">
            <Dropdown
              menus={["All", "Paid", "Unpaid"].map((v) => ({
                name: v,
                onClick: () => {
                  setFilter(v);
                  sortHistory(v);
                },
              }))}
              value={filter}
              hint="Sort By"
              fitMenu={true}
              alignToStart
              showIcon
            />
          </div>
        </div>
        <div className="overflow-scroll scrollbar-thin w-full">
          <table className="w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Invoice No</th>
                <th>MDA</th>
                <th>Revenue Head</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!hasFilter &&
                history.map((item, index) => (
                  <TransactionRow key={index} index={index} item={item} />
                ))}
              {hasFilter &&
                filteredHistory.map((item, index) => (
                  <TransactionRow key={index} index={index} item={item} />
                ))}
            </tbody>
          </table>
          {hasFilter && filteredHistory.length === 0 && (
            <div className="w-full h-60 grid place-content-center">
              <h2 className="text-[#3A3A3A] text-xl">
                No transactions match your filter
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TransactionRow: FC<{ index: number; item: iHistory }> = ({
  item,
  index,
}) => {
  return (
    <tr className="">
      <td>{index + 1}</td>
      <td>{item.invoiceNo}</td>
      <td>{item.mda}</td>
      <td>{item.revenueHead}</td>

      <td>₦{item.amount.toLocaleString("en-US")}</td>
      <td>{item.paid ? "Paid" : "Unpaid"}</td>

      <td>
        <button className="text-[#3A3A3A] bg-[#D9EFE2] rounded text-smaller flex gap-1 px-2 py-1 items-center">
          <TbFileDownload size={"16px"} />
          Download
        </button>
      </td>
    </tr>
  );
};

export default History;
