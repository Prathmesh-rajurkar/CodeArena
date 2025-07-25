"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionsList from "./QuestionsList";

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
        <Tabs className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Problems</TabsTrigger>
            <TabsTrigger value="easy">Easy</TabsTrigger>
            <TabsTrigger value="medium">Medium</TabsTrigger>
            <TabsTrigger value="hard">Hard</TabsTrigger>
          </TabsList>
          
        </Tabs>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <QuestionsList />
      </div>
    </div>
  );
}

export default ExploreProblems;
