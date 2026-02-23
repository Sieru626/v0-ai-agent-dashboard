"use client"

import { useState, useCallback } from "react"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import { RoomHeader } from "@/components/rooms/room-header"
import { AgentBar } from "@/components/dashboard/agent-bar"
import { MissionConsole } from "@/components/dashboard/mission-console"
import { StatusBar } from "@/components/dashboard/status-bar"
import { SiteSelector, type SiteConfig } from "@/components/dashboard/site-selector"
import { SitePreview } from "@/components/dashboard/site-preview"

const DEFAULT_IN_ROOM = ["notebooklm", "v0", "genspark"]

export default function ConferenceRoom() {
  const [inRoomIds, setInRoomIds] = useState<string[]>(DEFAULT_IN_ROOM)
  const [selectedSite, setSelectedSite] = useState<SiteConfig | null>(null)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  const handleToggleAgent = useCallback((id: string) => {
    setInRoomIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }, [])

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] overflow-hidden">
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.15) 2px, rgba(0,240,255,0.15) 4px)" }}
      />

      <RoomHeader roomName={"\u4F1A\u8B70\u5BA4"} roomNameEn="CONFERENCE ROOM" borderClass="neon-border-pink" textClass="text-neon-pink" />
      <AgentBar inRoomIds={inRoomIds} onToggleAgent={handleToggleAgent} showRoomControls />

      <div className="flex-1 min-h-0">
        <PanelGroup direction="horizontal" className="h-full">
          <Panel defaultSize={20} minSize={15} maxSize={30}>
            <SiteSelector
              selectedFile={selectedFile}
              onSelectFile={setSelectedFile}
              onSelectSite={setSelectedSite}
            />
          </Panel>

          <PanelResizeHandle className="w-1 bg-[#111] hover:bg-neon-cyan transition-colors cursor-col-resize" />

          <Panel defaultSize={45} minSize={30}>
            <MissionConsole
              activeAgents={inRoomIds.map((id) => {
                const map: Record<string, string> = { notebooklm: "NotebookLM", cursor: "Cursor", v0: "v0", genspark: "GenSpark", antigravity: "Antigravity" }
                return map[id] ?? id
              })}
            />
          </Panel>

          <PanelResizeHandle className="w-1 bg-[#111] hover:bg-neon-pink transition-colors cursor-col-resize" />

          <Panel defaultSize={35} minSize={20}>
            <SitePreview site={selectedSite} selectedFile={selectedFile} />
          </Panel>
        </PanelGroup>
      </div>

      <StatusBar />
    </div>
  )
}
