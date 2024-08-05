import Download from "@/src/components/dashboard/download/Download";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Receipt",
};

export default function DownloadsPage() {
  return <Download />;
}
