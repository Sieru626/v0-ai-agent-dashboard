"use client"

import { useState, useCallback } from "react"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { RoomHeader } from "@/components/rooms/room-header"
import { AgentBar } from "@/components/dashboard/agent-bar"
import { MissionConsole } from "@/components/dashboard/mission-console"
import { StatusBar } from "@/components/dashboard/status-bar"
import { SiteSelector, type SiteConfig } from "@/components/dashboard/site-selector"
import { SitePreview } from "@/components/dashboard/site-preview"
import { Play, RotateCcw, Check } from "lucide-react"

const agentCharacterMap: Record<string, string> = {
  notebooklm: "NotebookLM", cursor: "Cursor", v0: "v0", genspark: "GenSpark", antigravity: "Antigravity",
}

const DEFAULT_IN_ROOM = ["cursor", "v0"]

export default function FactoryRoom() {
  const [inRoomIds, setInRoomIds] = useState<string[]>(DEFAULT_IN_ROOM)
  const [selectedSite, setSelectedSite] = useState<SiteConfig | null>(null)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [buildStatus, setBuildStatus] = useState<"idle" | "building" | "success">("idle")

  const handleToggleAgent = useCallback((id: string) => {
    setInRoomIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
  }, [])

  const handleBuild = () => {
    setBuildStatus("building")
    setTimeout(() => setBuildStatus("success"), 2000)
    setTimeout(() => setBuildStatus("idle"), 4000)
  }

  const activeAgentNames = inRoomIds.map((id) => agentCharacterMap[id]).filter(Boolean)

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.15) 2px, rgba(0,240,255,0.15) 4px)" }} />

      <RoomHeader roomName={"\u5DE5\u623F"} roomNameEn="FACTORY" borderClass="neon-border-cyan" textClass="text-neon-cyan" />
      <AgentBar inRoomIds={inRoomIds} onToggleAgent={handleToggleAgent} showRoomControls />

      <div className="flex items-center gap-2 px-4 py-1.5 border-b border-[#1a1a1a] bg-[#060606]">
        <button onClick={handleBuild} disabled={buildStatus === "building"} className={`flex items-center gap-1 px-3 py-1 border text-[8px] transition-colors ${buildStatus === "success" ? "border-neon-green text-neon-green" : buildStatus === "building" ? "border-neon-cyan text-neon-cyan animate-pulse" : "border-neon-green text-neon-green hover:bg-neon-green hover:text-[#0a0a0a]"}`}>
          {buildStatus === "building" ? (
            <><RotateCcw className="w-2.5 h-2.5 animate-spin" /><span className="font-dot-jp">{"\u30D3\u30EB\u30C9\u4E2D..."}</span></>
          ) : buildStatus === "success" ? (
            <><Check className="w-2.5 h-2.5" /><span className="font-dot-jp">{"\u6210\u529F"}</span></>
          ) : (
            <><Play className="w-2.5 h-2.5" /><span className="font-dot-jp">{"\u30D3\u30EB\u30C9"}</span></>
          )}
        </button>
      </div>

      <ResizablePanelGroup direction="horizontal" className="flex-1 min-h-0">
        {/* Left: File Tree */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <SiteSelector selectedFile={selectedFile} onSelectFile={setSelectedFile} onSelectSite={setSelectedSite} />
        </ResizablePanel>

        <ResizableHandle withHandle className="bg-[#1a1a1a] w-[3px] hover:bg-neon-cyan transition-colors" />

        {/* Center: Preview / Code */}
        <ResizablePanel defaultSize={45} minSize={25}>
          <SitePreview site={selectedSite} selectedFile={selectedFile} />
        </ResizablePanel>

        <ResizableHandle withHandle className="bg-[#1a1a1a] w-[3px] hover:bg-neon-pink transition-colors" />

        {/* Right: Chat */}
        <ResizablePanel defaultSize={35} minSize={20}>
          <MissionConsole title={"\u5DE5\u623F\u30C1\u30E3\u30C3\u30C8"} activeAgents={activeAgentNames} />
        </ResizablePanel>
      </ResizablePanelGroup>

      <StatusBar />
    </div>
  )
}
