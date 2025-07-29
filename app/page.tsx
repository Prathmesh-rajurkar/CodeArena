"use client";

import ContentSection from "@/components/ContentSection";
import Footer from "@/components/Footer";
import { ShootingStars } from "@/components/ui/shooting-stars";
import HeroSection from "@/components/HeroSection";
// import Navbars from "@/components/Navbar";

// import { useState } from "react";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* <ShootingStars/> */}
      <div className="pt-[80px]">
        {/* <Navbars /> */}
        <HeroSection />
      </div>
      <ContentSection />
      <Footer/>
    </div>
  );
}
