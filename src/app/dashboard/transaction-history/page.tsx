import History from "@/src/components/dashboard/history/History";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transaction History",
};

export default function HistoryPage() {
  return <History />;
}
