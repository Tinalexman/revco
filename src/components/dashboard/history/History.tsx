"use client";

import React, { FC, useEffect, useState } from "react";
import BackButton from "../../reusable/BackButton";
import { FiSearch } from "react-icons/fi";
import { TbFileDownload } from "react-icons/tb";
import Dropdown from "../../reusable/Dropdown";
import { FaRegCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { convertDateWithDayAndMonth } from "@/src/functions/dateFunctions";
import toast from "react-hot-toast";
import { useGetTransactionHistory } from "@/src/hooks/transactionHooks";
import { iGenerateInvoiceResponse } from "@/src/services/invoiceServices";
import Link from "next/link";
import { Loader } from "@mantine/core";

interface DateRange {
  start: string;
  end: string;
}

const History = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date().toISOString().split("T")[0],
    end: new Date().toISOString().split("T")[0],
  });
  const [filteredHistory, setFilteredHistory] = useState<
    iGenerateInvoiceResponse[]
  >([]);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("All");
  const [hasFilter, setHasFilter] = useState<boolean>(false);

  const { get, data: history, loading } = useGetTransactionHistory();

  useEffect(() => {
    get({ ...dateRange });
  }, [dateRange]);

  const handleStartDateChange = (dates: Date[] | null) => {
    if (dates) {
      const startDate = new Date(dates[0]);
      const endDate = new Date(dateRange.end);

      if (startDate > endDate) {
        toast.error("Start date cannot be after the end date");
        return;
      }

      setDateRange({
        ...dateRange,
        start: startDate.toISOString().split("T")[0],
      });
    }
  };

  const handleEndDateChange = (dates: Date[] | null) => {
    if (dates) {
      const endDate = new Date(dates[0]);
      const startDate = new Date(dateRange.start);

      if (endDate < startDate) {
        toast.error("End date cannot be before the start date");
        return;
      }

      setDateRange({
        ...dateRange,
        end: endDate.toISOString().split("T")[0],
      });
    }
  };

  const searchHistory = (event: any) => {
    let text: string = event.target.value.trim();
    setSearch(text);

    if (text === "") {
      sortHistory(filter);
      return;
    }

    let prefilteredHistory: iGenerateInvoiceResponse[] = [...history];
    if (filter === "Unpaid") {
      prefilteredHistory = prefilteredHistory.filter((v) => !v.paid);
    } else if (filter === "Paid") {
      prefilteredHistory = prefilteredHistory.filter((v) => v.paid);
    }

    const newHistory: iGenerateInvoiceResponse[] = [];
    text = text.toLowerCase();

    for (let i = 0; i < prefilteredHistory.length; ++i) {
      const contains =
        prefilteredHistory[i].invoiceNo.includes(text) ||
        prefilteredHistory[i].invoiceAmount.toString().includes(text) ||
        prefilteredHistory[i].payerFirstName?.toLowerCase().includes(text) ||
        prefilteredHistory[i].payerLastName?.toLowerCase().includes(text) ||
        prefilteredHistory[i].payerEmail.toLowerCase().includes(text) ||
        prefilteredHistory[i].payerPhone.includes(text) ||
        prefilteredHistory[i].payerType.toLowerCase().includes(text) ||
        prefilteredHistory[i].assesedService.toLowerCase().includes(text);

      if (contains) {
        newHistory.push(prefilteredHistory[i]);
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
              className="w-full h-12 rounded-[8px] border border-[#EDEEEF] pl-10 pr-3 text-body bg-[#F6F6F7]"
              placeholder="Search a bill"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-3" />
          </div>
          <div className="max-w-[30%] w-fit h-12 flex gap-3 items-center rounded-lg border border-[#DFDFDF] px-3">
            <div className="w-fit flex items-center gap-1">
              <p className=" text-[#10101266] text-[0.815rem] leading-[0.975rem]">
                From:
              </p>
              <DatePicker
                selected={new Date(dateRange.start)}
                onChange={handleStartDateChange}
                selectsMultiple={true}
                dateFormat="MMMM d, yyyy"
                customInput={
                  <div className="flex items-center justify-start w-full h-12 cursor-pointer text-[0.815rem] leading-[0.975rem]">
                    <span className="text-[#16192C] font-medium">
                      {convertDateWithDayAndMonth(dateRange.start)}
                    </span>
                    <FaRegCalendarAlt
                      className="ml-1 text-[#16192C]"
                      size={16}
                    />
                  </div>
                }
              />
            </div>
            <div className="w-[1px] h-[60%] bg-[#DFDFDF]" />
            <div className="w-fit flex items-center gap-1">
              <p className=" text-[#10101266] text-[0.815rem] leading-[0.975rem]">
                To:
              </p>
              <DatePicker
                selected={new Date(dateRange.end)}
                onChange={handleEndDateChange}
                selectsMultiple={true}
                dateFormat="MMMM d, yyyy"
                customInput={
                  <div className="flex items-center justify-start w-full h-12 cursor-pointer text-[0.815rem] leading-[0.975rem]">
                    <span className="text-[#16192C] font-medium">
                      {convertDateWithDayAndMonth(dateRange.end)}
                    </span>
                    <FaRegCalendarAlt
                      className="ml-1 text-[#16192C]"
                      size={16}
                    />
                  </div>
                }
              />
            </div>
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
                <th>PIN</th>
                <th>Payer Name</th>
                <th>Revenue Head</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                !hasFilter &&
                history.map((item, index) => (
                  <TransactionRow key={index} index={index} item={item} />
                ))}
              {!loading &&
                hasFilter &&
                filteredHistory.map((item, index) => (
                  <TransactionRow key={index} index={index} item={item} />
                ))}
            </tbody>
          </table>
          {loading && (
            <div className="w-full h-60 place-content-center grid">
              <Loader color="primary.9" />{" "}
            </div>
          )}
          {!loading && history.length === 0 && (
            <div className="w-full h-60 place-content-center grid text-l-2 text-[#454545]">
              You have not made any transactions yet.
            </div>
          )}
          {!loading && hasFilter && filteredHistory.length === 0 && (
            <div className="w-full h-60 place-content-center grid text-l-2 text-[#454545]">
              No transactions found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TransactionRow: FC<{ index: number; item: iGenerateInvoiceResponse }> = ({
  item,
  index,
}) => {
  const query = item.paid ? "true" : "false";

  return (
    <tr className="">
      <td>{index + 1}</td>
      <td>{item.invoiceNo}</td>
      <td>
        {item.payerFirstName} {item.payerLastName}
      </td>
      <td>{item.assesedService}</td>
      <td>₦{item.invoiceAmount.toLocaleString("en-US")}</td>
      <td>{item.paid ? "Paid" : "Unpaid"}</td>
      <td>
        <Link
          href={`/dashboard/view-receipt/${item.invoiceNo}?status=${query}`}
          className="text-[#3A3A3A] bg-[#D9EFE2] rounded text-smaller flex gap-1 px-2 w-fit py-1 items-center"
        >
          <TbFileDownload size={"16px"} />
          Download
        </Link>
      </td>
    </tr>
  );
};

export default History;
