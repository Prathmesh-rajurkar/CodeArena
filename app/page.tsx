"use client";

import ContentSection from "@/components/ContentSection";
// import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
// import Navbars from "@/components/Navbar";

// import { useState } from "react";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="pt-[80px]">
        {/* <Navbars /> */}
        <HeroSection />
      </div>
      <ContentSection />
      
    </div>
  );
}
