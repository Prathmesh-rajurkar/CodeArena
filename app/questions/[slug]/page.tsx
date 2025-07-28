import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
function page() {
  return (
    <div className="w-screen h-screen pt-20">
      <ResizablePanelGroup direction="horizontal" className="rounded-lg">
        <ResizablePanel defaultSize={50} className="m-2">
          <div className="flex items-center justify-center p-6">
            <span className="font-semibold">One</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-gray-900" />
        <ResizablePanel defaultSize={50} className="m-2">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Two</span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle className="bg-gray-900" />
            <ResizablePanel defaultSize={50} className="m-2">
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
