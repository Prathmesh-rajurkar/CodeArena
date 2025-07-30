import React from 'react';

interface TestCase {
  input: string;
  expectedOutput: string;
}

interface TestCaseListProps {
  testCases: TestCase[];
}

const TestCaseList: React.FC<TestCaseListProps> = ({ testCases }) => {
  return (
    <div className="max-h-96 overflow-y-auto space-y-4 p-4 rounded-lg bg-gray-900 border border-gray-700">
      {testCases.map((testCase, index) => (
        <div
          key={index}
          className="bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-600"
        >
          <h2 className="text-white font-semibold mb-2">Test Case {index + 1}</h2>
          <div className="text-sm text-gray-300">
            <p><strong>Input:</strong></p>
            <pre className="bg-gray-700 p-2 rounded text-white whitespace-pre-wrap">{testCase.input}</pre>
            <p className="mt-2"><strong>Expected Output:</strong></p>
            <pre className="bg-gray-700 p-2 rounded text-white whitespace-pre-wrap">{testCase.expectedOutput}</pre>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestCaseList;
