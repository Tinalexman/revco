import PayBills from "@/src/components/dashboard/bills/PayBills";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pay Bills",
};

export default function PayBillsPage() {
  return <PayBills />;
}
