"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionsList from "./QuestionsList";
// import QuestionCard from "./QuestionCard";

function ExploreProblems() {
  return (
    <div>
      <div className="flex flex-col items-center text-center justify-center lg:w-180 w-100 lg:mt-40 mt-30 m-auto text-white px-lg-36 mb-10">
        <h1 className="lg:text-7xl text-6xl font-bold my-3">
          Explore Problems
        </h1>
        <p className="text-gray-500 lg:p-5 mb-5">
          Dive into a vast collection of coding problems designed to challenge
          and enhance your skills. Whether you&apos;re a beginner or an
          experienced coder, you&apos;ll find problems that suit your level and
          help you grow.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <Tabs defaultValue="all" className="w-full z-50">
          <TabsList className="z-50">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black"
            >
              All Problems
            </TabsTrigger>
            <TabsTrigger
              value="easy"
              className="data-[state=active]:bg-green-500 data-[state=active]:text-black"
            >
              Easy
            </TabsTrigger>
            <TabsTrigger
              value="medium"
              className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
            >
              Medium
            </TabsTrigger>
            <TabsTrigger
              value="hard"
              className="data-[state=active]:bg-red-500 data-[state=active]:text-black"
            >
              Hard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="z-50">
            <QuestionsList difficulty={"all"} />
          </TabsContent>
          <TabsContent value="easy" className="z-50">
            <QuestionsList difficulty={"easy"} />
          </TabsContent>
          <TabsContent value="medium" className="z-50">
            <QuestionsList difficulty={"medium"} />
          </TabsContent>
          <TabsContent value="hard" className="z-50">
            <QuestionsList difficulty={"hard"} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default ExploreProblems;
