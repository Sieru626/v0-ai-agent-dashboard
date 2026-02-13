"use client"

import { useState, useCallback } from "react"
import { RoomHeader } from "@/components/rooms/room-header"
import { AgentBar } from "@/components/dashboard/agent-bar"
import { MissionConsole } from "@/components/dashboard/mission-console"
import { InventoryBar } from "@/components/dashboard/inventory-bar"
import { StatusBar } from "@/components/dashboard/status-bar"
import { ModeSwitcher, type ViewMode } from "@/components/dashboard/mode-switcher"
import { ArtifactViewerWindows } from "@/components/dashboard/artifact-viewer-windows"
import { ArtifactViewerHologram } from "@/components/dashboard/artifact-viewer-hologram"
import { ArtifactViewerSlide } from "@/components/dashboard/artifact-viewer-slide"
import { inventoryItems } from "@/components/dashboard/artifact-data"

const DEFAULT_IN_ROOM = ["notebooklm", "v0", "genspark"]

export default function ConferenceRoom() {
  const [viewMode, setViewMode] = useState<ViewMode>("windows")
  const [openArtifactIds, setOpenArtifactIds] = useState<number[]>([])
  const [inRoomIds, setInRoomIds] = useState<string[]>(DEFAULT_IN_ROOM)

  const handleToggleArtifact = useCallback((id: number) => {
    setOpenArtifactIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }, [])

  const handleCloseArtifact = useCallback((id: number) => {
    setOpenArtifactIds((prev) => prev.filter((x) => x !== id))
  }, [])

  const handleCloseAllArtifacts = useCallback(() => {
    setOpenArtifactIds([])
  }, [])

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

      <div className="flex items-center justify-between px-4 py-1 border-b border-[#1a1a1a] bg-[#080808]">
        <ModeSwitcher current={viewMode} onChange={setViewMode} />
        <span className="text-[6px] text-[#444]">
          {"// GenSpark\u306E\u9B54\u6CD5\u3067\u8CC7\u6599\u3092\u53EC\u559A"}
        </span>
      </div>

      <div className="flex-1 min-h-0 relative">
        <MissionConsole />

        {viewMode === "windows" && (
          <ArtifactViewerWindows items={inventoryItems} openIds={openArtifactIds} onClose={handleCloseArtifact} />
        )}
        {viewMode === "hologram" && (
          <ArtifactViewerHologram items={inventoryItems} openIds={openArtifactIds} onClose={handleCloseArtifact} />
        )}
        {viewMode === "slide" && (
          <ArtifactViewerSlide items={inventoryItems} openIds={openArtifactIds} onClose={handleCloseArtifact} onClosePanel={handleCloseAllArtifacts} />
        )}
      </div>

      <InventoryBar openIds={openArtifactIds} onToggle={handleToggleArtifact} />
      <StatusBar />
    </div>
  )
}
