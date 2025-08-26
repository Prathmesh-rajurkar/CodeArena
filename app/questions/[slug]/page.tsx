"use client";
import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import QuestionInfo from "@/components/QuestionInfo";
import CodeEditor from "@/components/CodeEditor";
import TestCaseList from "@/components/TestCaseList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "next/navigation";

interface Question {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  test_cases: { _id: string; input: string; expected_output: string }[];
  starter_code : {_id:string,language: string; code: string}[];
}
export interface Results{
  input: string;
  expected_output: string;
  actual_output: string;
  error: string;
  status: "Passed" | "Failed";
}
function Page() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const [results, setResults] = useState<Results[]>([]); 
  const slug = params.slug as string;

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await fetch(`/api/questions/${slug}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch question");
        const data = await res.json();
        // console.log("Fetched question data:", data);
        
        setQuestion(data);
      } catch (error) {
        console.error(error);
        setError("Error fetching question");
      }
    };
    fetchQuestion();
  }, [slug]);

  if (error) return <div>{error}</div>;
  if (!question)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="w-screen h-screen pt-12">
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg z-50 p-0"
      >
        {/* Left Panel - Question Info */}
        <ResizablePanel defaultSize={50} className="m-2">
          <ScrollArea className="h-full w-full">
            <QuestionInfo question={question} />
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-gray-900" />

        {/* Right Panel - Code + Test Cases */}
        <ResizablePanel defaultSize={50} className="m-2">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={60} className="z-50">
              <CodeEditor starter_code = {question?.starter_code} onResults={(res: Results[]) => setResults(res)}/>
            </ResizablePanel>
            <ResizableHandle withHandle className="bg-gray-900" />
            <ResizablePanel defaultSize={40} className="mt-2 z-50">
              <ScrollArea className="h-full w-full">
                <TestCaseList testCases={question.test_cases} results={results} />
              </ScrollArea>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default Page;
