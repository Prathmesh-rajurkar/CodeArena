import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import QuestionInfo from "@/components/QuestionInfo";
import CodeEditor from "@/components/CodeEditor";
import TestCaseList from "@/components/TestCaseList";
import { ScrollArea } from "@/components/ui/scroll-area";
function page() {
  const testCases = [
    { input: "nums = [2,7,11,15], target = 9", expectedOutput: "[0,1]" },
    { input: "nums = [3,2,4], target = 6", expectedOutput: "[1,2]" },
  ];
  return (
    <div className="w-screen h-screen pt-12">
      <ResizablePanelGroup direction="horizontal" className="rounded-lg z-50 p-0">
        <ResizablePanel defaultSize={50} className="m-2">
          <ScrollArea className="flex justify-center z-50 flex-1 h-full  pl-2 py-0">
            <QuestionInfo />
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-gray-900" />
        <ResizablePanel defaultSize={50} className="m-2">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={60} className="z-50">
              <CodeEditor />
            </ResizablePanel>
            <ResizableHandle withHandle className="bg-gray-900" />
            <ResizablePanel defaultSize={40} className="mt-2 z-50">
              <ScrollArea className="z-50 h-full items-center justify-center ">
                <TestCaseList testCases={testCases} />
              </ScrollArea>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default page;
