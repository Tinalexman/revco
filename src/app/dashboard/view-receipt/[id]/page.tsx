import ViewReceipt from "@/src/components/payments/ViewReceipt";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Receipt",
};

export default function ViewReceiptPage({ params }: any) {
  const { id } = params;
  return <ViewReceipt invoiceNo={id} />;
}
