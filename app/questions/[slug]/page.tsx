import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import QuestionInfo from "@/components/QuestionInfo";
import CodeEditor from "@/components/CodeEditor";
function page() {
  return (
    <div className="w-screen h-screen pt-18">
      <ResizablePanelGroup direction="horizontal" className="rounded-lg z-50">
        <ResizablePanel defaultSize={50} className="m-2">
          <div className="flex items-center justify-center z-50 flex-1 h-full overflow-y-auto">
            {/* <span className="font-semibold">One</span> */}
            <QuestionInfo/>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-gray-900" />
        <ResizablePanel defaultSize={50} className="m-2">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={60} className="z-50">
              
                {/* <span className="font-semibold">Two</span> */}
                <CodeEditor/>
              
            </ResizablePanel>
            <ResizableHandle withHandle className="bg-gray-900" />
            <ResizablePanel defaultSize={40} className="m-2">
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default page;
