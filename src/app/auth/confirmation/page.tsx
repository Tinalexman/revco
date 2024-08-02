import Confirmation from "@/src/components/auth/confirmation/Confirmation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Confirmation",
};

export default function ConfirmationPage() {
  return <Confirmation />;
}
