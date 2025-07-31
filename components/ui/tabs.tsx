"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-gray-950 px-4 py-3 rounded-xl inline-flex items-center justify-start gap-2 border border-[#0c0f1c]",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  value,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & { value: string }) {
  const colorMap: Record<string, string> = {
    "all": "bg-[#0891b2] text-white",
    "easy": "bg-[#15803d] text-white",
    "medium": "bg-[#c2410c] text-white",
    "hard": "bg-[#7f1d1d] text-white"
  }

  const activeColor = colorMap[value.toLowerCase()] || "bg-cyan-500 text-white"

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      value={value}
      className={cn(
        "rounded-full px-6 py-2 text-sm font-semibold transition-all border border-[#1e293b]",
        "data-[state=active]:shadow-sm data-[state=active]:text-black",
        "data-[state=active]:bg-opacity-100",
        "bg-black text-white hover:bg-[#1e293b]",
        `data-[state=active]:${activeColor}`,
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
