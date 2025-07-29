'use client';

import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  initialLanguage?: string;
}

const starterCodeMap: Record<string, string> = {
  javascript: `function twoSum(nums, target) {
  for(let i = 0; i < nums.length; i++) {
    for(let j = i + 1; j < nums.length; j++) {
      if(nums[i] + nums[j] === target) return [i, j];
    }
  }
  return [];
}`,
  python: `def twoSum(nums, target):
  for i in range(len(nums)):
    for j in range(i + 1, len(nums)):
      if nums[i] + nums[j] == target:
        return [i, j]
  return []`,
  cpp: `#include <vector>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
  for (int i = 0; i < nums.size(); ++i)
    for (int j = i + 1; j < nums.size(); ++j)
      if (nums[i] + nums[j] == target)
        return {i, j};
  return {};
}`
};

export default function CodeEditor({ initialLanguage = 'javascript' }: CodeEditorProps) {
  const [language, setLanguage] = useState(initialLanguage);
  const [code, setCode] = useState(starterCodeMap[initialLanguage]);

  useEffect(() => {
    setCode(starterCodeMap[language]);
  }, [language]);

  const handleSubmit = () => {
    console.log('Submitted code:', code);
    // Send code to backend or handle logic here
  };

  return (
    <div className="flex flex-col h-full w-full gap-4 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-400">Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-[#1e293b] border border-gray-600 rounded px-3 py-1 text-white text-sm focus:outline-none"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-cyan-500 text-black font-semibold px-4 py-1.5 rounded hover:bg-cyan-400 transition"
        >
          Submit
        </button>
      </div>

      <div className="flex-1 border border-[#334155] rounded overflow-hidden">
        <Editor
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="hc-black"
          options={{
            fontSize: 16,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}
