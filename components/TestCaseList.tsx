import React from "react";

interface TestCase {
  _id: string;
  input: string;
  expected_output: string;
}

interface TestCaseListProps {
  testCases: TestCase[];
}

const TestCaseList: React.FC<TestCaseListProps> = ({ testCases }) => {
  return (
    <div className="max-h-96 w-full space-y-4 p-4 rounded bg-black border border-gray-800">
      <h1 className="text-2xl font-bold text-white mb-4">Test Cases</h1>

      {testCases?.map((testCase, index) => (
        <div
          key={index}
          className="bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-600"
        >
          <h2 className="text-white font-semibold mb-2">
            Test Case {index + 1}
          </h2>
          <div className="text-sm text-gray-300">
            <p>
              <strong>Input:</strong>
            </p>
            <pre className="bg-gray-700 p-2 rounded text-white whitespace-pre-wrap">
              {testCase.input}
            </pre>
            <p className="mt-2">
              <strong>Expected Output:</strong>
            </p>
            <pre className="bg-gray-700 p-2 rounded text-white whitespace-pre-wrap">
              {testCase.expected_output}
            </pre>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestCaseList;
