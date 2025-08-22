'use client';
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface TestCase {
  _id: string;
  input: string;
  expected_output: string;
}

interface TestCaseListProps {
  testCases: TestCase[];
  results?: any[];
}

export default function TestCaseList({ testCases, results }: TestCaseListProps) {
  const [activeTab, setActiveTab] = useState("test_case");

  // 👇 When results are updated, switch to "results"
  useEffect(() => {
    if (results && results.length > 0) {
      setActiveTab("results");
    }
  }, [results]);

  return (
    <div className="max-h-96 w-full space-y-4 p-4 rounded bg-black border border-gray-800">
      <h1 className="text-2xl font-bold text-white mb-4">Test Cases</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="test_case">Test Case</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="test_case">
          {testCases?.map((testCase, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-600"
            >
              <h2 className="text-white font-semibold mb-2">
                Test Case {index + 1}
              </h2>
              <div className="text-sm text-gray-300">
                <p><strong>Input:</strong></p>
                <pre className="bg-gray-700 p-2 rounded text-white whitespace-pre-wrap">
                  {testCase.input}
                </pre>
                <p className="mt-2"><strong>Expected Output:</strong></p>
                <pre className="bg-gray-700 p-2 rounded text-white whitespace-pre-wrap">
                  {testCase.expected_output}
                </pre>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="results">
          {results?.length ? (
            results.map((result, index) => (
              <div
                key={index}
                className={`bg-gray-800 p-4 mt-2 rounded-lg shadow-sm border ${
                  result.status === "Passed"
                    ? "border-green-600"
                    : "border-red-600"
                }`}
              >
                <h2 className="text-white font-semibold mb-2">
                  Test Case {index + 1} - {result.status}
                </h2>
                <div className="text-sm text-gray-300">
                  <p><strong>Input:</strong></p>
                  <pre className="bg-gray-700 p-2 rounded text-white whitespace-pre-wrap">
                    {result.input}
                  </pre>
                  <p className="mt-2"><strong>Expected Output:</strong></p>
                  <pre className="bg-gray-700 p-2 rounded text-white whitespace-pre-wrap">
                    {result.expected_output}
                  </pre>
                  <p className="mt-2"><strong>Actual Output:</strong></p>
                  <pre className="bg-gray-700 p-2 rounded text-white whitespace-pre-wrap">
                    {result.actual_output || 'No output'}
                  </pre>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No results available</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
