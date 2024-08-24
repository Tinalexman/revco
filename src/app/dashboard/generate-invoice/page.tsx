import Pins from "@/src/components/dashboard/pin/Pins";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generate Invoice",
};

export default function PinsPage() {
  return <Pins />;
}
