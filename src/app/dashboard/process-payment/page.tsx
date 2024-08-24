import ProcessPayments from "@/src/components/payments/process/ProcessPayments";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Process Payments",
};

export default function ProcessPaymentsPage() {
  return <ProcessPayments />;
}
