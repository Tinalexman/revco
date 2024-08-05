import MakePayment from "@/src/components/payments/MakePayment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Make Payment",
};

export default function PaymentPage() {
  return <MakePayment />;
}
