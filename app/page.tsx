"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { AgentSidebar } from "@/components/dashboard/agent-sidebar"
import { MissionConsole } from "@/components/dashboard/mission-console"
import { InventorySidebar } from "@/components/dashboard/inventory-sidebar"
import { StatusBar } from "@/components/dashboard/status-bar"

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Scanline overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.15) 2px, rgba(0,240,255,0.15) 4px)",
        }}
      />

      <DashboardHeader />

      <div className="flex flex-1 min-h-0">
        <AgentSidebar />
        <MissionConsole />
        <InventorySidebar />
      </div>

      <StatusBar />
    </div>
  )
}
