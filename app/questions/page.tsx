import ExploreProblems from "@/components/ExploreProblems";
import Footer from "@/components/Footer";
import React from "react";

function page() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="pt-[80px]">
        <ExploreProblems />
      </div>
      <Footer/>
    </div>
  );
}

export default page;
