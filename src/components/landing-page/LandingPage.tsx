"use client";

import React, { useEffect } from "react";
import Footer from "../reusable/Footer";
import Banner from "./Banner";
import Reasons from "./Reasons";

const LandingPage = () => {
  return (
    <div className="">
      <Banner />
      <Reasons />
      <Footer />
    </div>
  );
};

export default LandingPage;
