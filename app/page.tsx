"use client";

import HeroSection from "@/components/HeroSection";
import Navbars from "@/components/Navbar";

import { useState } from "react";

export default function Home() {
  
  
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbars/>
      <HeroSection/>
    </div>
  );
}
