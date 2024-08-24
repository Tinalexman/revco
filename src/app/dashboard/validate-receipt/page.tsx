import Invoice from "@/src/components/dashboard/invoice/Invoice";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Validate Receipt",
};

export default function InvoicePage() {
  return <Invoice />;
}
