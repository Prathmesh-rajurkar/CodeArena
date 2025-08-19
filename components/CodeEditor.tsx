"use client";

import { useState, useEffect, useMemo } from "react";
import Editor from "@monaco-editor/react";

interface StarterCodeItem {
  language: string;
  code: string;
  _id: string;
}

export default function CodeEditor({ starter_code }: { starter_code?: StarterCodeItem[] }) {
  const initialLanguage = "javascript"; // Default language

  // Convert array into object { javascript: "...", python: "..." }
  const starter_code_map = useMemo(() => {
    return (starter_code || []).reduce(
      (acc: Record<string, string>, item) => {
        acc[item.language] = item.code;
        return acc;
      },
      {}
    );
  }, [starter_code]);

  const [language, setLanguage] = useState(initialLanguage);
  const [code, setCode] = useState(starter_code_map[initialLanguage] || "");

  useEffect(() => {
    if (starter_code_map[language]) {
      setCode(starter_code_map[language] || "");
    }
  }, [language, starter_code_map]);

  const handleSubmit = () => {
    console.log("Submitted code:", code);
    // TODO: send code to backend
  };

  return (
    <div className="flex flex-col h-full w-full gap-4 z-50 pb-2">
      <div className="flex-1 border border-gray-800 rounded overflow-hidden">
        {/* Header */}
        <div className="bg-gray-800 text-white px-4 py-2 font-mono text-sm flex justify-between items-center">
          <h1 className="text-lg">Code</h1>
          <button
            onClick={handleSubmit}
            className="bg-cyan-500 text-black font-semibold px-4 py-1.5 rounded hover:bg-cyan-400 transition"
          >
            Submit
          </button>
        </div>

        {/* Language Selector */}
        <div className="flex items-center justify-between mb-3 px-2">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-[#1e293b] border border-gray-600 rounded px-3 py-1 text-white text-sm focus:outline-none"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
          </div>
        </div>

        {/* Monaco Editor */}
        <Editor
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="hc-black"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: "on",
            smoothScrolling: true,
            scrollbar: {
              vertical: "hidden",
              horizontal: "auto",
              handleMouseWheel: true,
            },
            guides: {
              indentation: true,
              bracketPairs: true,
            },
          }}
        />
      </div>
    </div>
  );
}
