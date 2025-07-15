"use client";

import ContentSection from "@/components/ContentSection";
import HeroSection from "@/components/HeroSection";
import Navbars from "@/components/Navbar";

import { useState } from "react";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="bg-black">
        <Navbars />
        <HeroSection />
      </div>
      <ContentSection />
    </div>
  );
}
