import React from "react";
import { Tabs } from "./ui/tabs";

function ExploreProblems() {
  const tabs = [
    {
      title: "All Problems",
      value: "all",
      content: <div>all problems</div>,
    },
    {
      title: "Easy",
      value: "easy",
      content: <div>easy problems</div>,
    },
    {
      title: "Medium",
      value: "medium",
      content: <div>medium problems</div>,
    },
    {
      title: "Hard",
      value: "hard",
      content: <div>hard problems</div>,
    },
  ];
  return (
    <div>
      <div className="flex flex-col items-center text-center justify-center lg:w-180 w-100 lg:mt-40 mt-30 m-auto text-white px-lg-36 mb-10">
        <h1 className="lg:text-7xl text-6xl font-bold my-3">
          Explore Problems
        </h1>
        <p className="text-gray-500 lg:p-5 mb-5">
          Dive into a vast collection of coding problems designed to challenge
          and enhance your skills. Whether you&apos;re a beginner or an experienced
          coder, you&apos;ll find problems that suit your level and help you grow.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <Tabs tabs={tabs}/>
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default ExploreProblems;
