"use client";

import { useState, useEffect, useMemo } from "react";
import Editor from "@monaco-editor/react";
import { useParams } from "next/navigation";
import { Results } from "@/app/questions/[slug]/page";

interface StarterCodeItem {
  language: string;
  code: string;
  _id: string;
}

export default function CodeEditor({
  starter_code,
  onResults,
}: {
  starter_code?: StarterCodeItem[];
  onResults: (res: Results[]) => void;
}) {
  const initialLanguage = "python"; // Default language
  const question_slug = useParams().slug as string;
  const [isLoading, setIsLoading] = useState(false);
  const LANGUAGES: Record<"javascript" | "python" | "java" | "cpp", number> = {
    javascript: 63,
    python: 28,
    java: 4,
    cpp: 2,
  };

  type LanguageKey = keyof typeof LANGUAGES;

  function getLangId(language: LanguageKey) {
    return LANGUAGES[language];
  }
  const starter_code_map = useMemo(() => {
    return (starter_code || []).reduce((acc: Record<string, string>, item) => {
      acc[item.language] = item.code;
      return acc;
    }, {});
  }, [starter_code]);
  const [language, setLanguage] = useState(initialLanguage);
  const [code, setCode] = useState(starter_code_map[initialLanguage] || "");

  useEffect(() => {
    if (starter_code_map[language]) {
      setCode(starter_code_map[language] || "");
    }
  }, [language, starter_code_map]);

  const handleSubmit = async () => {
    console.log("Submitted code:", code);
    console.log("Selected language:", getLangId(language as LanguageKey));
    // TODO: send code to backend
    setIsLoading(true);
    try {
      const results = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language_id: getLangId(language as LanguageKey),
          code,
          question_slug: question_slug,
        }),
      });
      if (!results.ok) {
        throw new Error("Failed to submit code");
      }
      const data = await results.json();
      onResults(data.results || []);
      console.log("Submission results:", data.results);
    } catch (error) {
      console.error("Error submitting code:", error);
    } finally {
      setIsLoading(false);
    }
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
            {isLoading ? "Submitting..." : "Submit"}
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
            scrollBeyondLastLine: true,
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
