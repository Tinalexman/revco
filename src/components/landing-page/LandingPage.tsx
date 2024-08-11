"use client";

import React, { useEffect } from "react";
import Footer from "../reusable/Footer";
import Banner from "./Banner";
import { useGlobalStore } from "@/src/stores/globalStore";

const LandingPage = () => {
  return (
    <div className="">
      <Banner />
      <Footer />
    </div>
  );
};

export default LandingPage;
