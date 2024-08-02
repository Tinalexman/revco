import CreateAccount from "@/src/components/auth/create-account/CreateAccount";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
};

export default function CreateAccountPage() {
  return <CreateAccount />;
}
