"use client"

import { useState, useCallback } from "react"
import { RoomHeader } from "@/components/rooms/room-header"
import { AgentBar } from "@/components/dashboard/agent-bar"
import { StatusBar } from "@/components/dashboard/status-bar"
import { RoomChat } from "@/components/dashboard/room-chat"
import { PixelAvatar } from "@/components/dashboard/pixel-avatar"
import { ModeSwitcher, type ViewMode } from "@/components/dashboard/mode-switcher"
import { ArtifactViewerWindows } from "@/components/dashboard/artifact-viewer-windows"
import { ArtifactViewerHologram } from "@/components/dashboard/artifact-viewer-hologram"
import { ArtifactViewerSlide } from "@/components/dashboard/artifact-viewer-slide"
import { inventoryItems } from "@/components/dashboard/artifact-data"
import { FileCode, Map, Image, FileText, Star, Package, Sparkles, Filter } from "lucide-react"

const typeIcons: Record<string, typeof FileCode> = {
  code: FileCode, map: Map, design: Image, doc: FileText,
}

const rarityColors: Record<string, { border: string; text: string; label: string; bg: string }> = {
  common: { border: "border-[#555]", text: "text-[#888]", label: "\u4E26", bg: "bg-[#111]" },
  rare: { border: "border-neon-cyan", text: "text-neon-cyan", label: "\u7A00", bg: "bg-[#0a1520]" },
  epic: { border: "border-neon-pink", text: "text-neon-pink", label: "\u6975", bg: "bg-[#1a0a15]" },
  legendary: { border: "border-neon-green", text: "text-neon-green", label: "\u4F1D", bg: "bg-[#0a1a0a]" },
}

const archivesResponses: Record<string, string[]> = {
  GenSpark: [
    "...\u53E4\u306E\u6587\u732E\u3092\u89E3\u8AAD\u4E2D...\u3053\u306E\u8CC7\u6599\u306F\u91CD\u8981\u3067\u3059\u3002",
    "\u9B54\u5C0E\u66F8\u3092\u30A2\u30C3\u30D7\u30C7\u30FC\u30C8\u3057\u307E\u3057\u305F\u3002\u65B0\u3057\u3044\u77E5\u898B\u304C\u3042\u308A\u307E\u3059\u3002",
    "\u8A60\u5531\u5B8C\u4E86\u3002\u30A4\u30F3\u30D9\u30F3\u30C8\u30EA\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F\u3002",
  ],
  Antigravity: [
    "\u6C34\u6676\u304C\u793A\u3057\u3066\u3044\u307E\u3059...\u3053\u306E\u8CC7\u6599\u306F\u672A\u6765\u306B\u5FC5\u8981\u306A\u3082\u306E\u3067\u3059\u3002",
    "\u661F\u306E\u914D\u7F6E\u304B\u3089\u5224\u65AD\u3059\u308B\u3068\u3001\u5206\u985E\u3092\u898B\u76F4\u3059\u3079\u304D\u3067\u3059\u3002",
    "\u5360\u3044\u306E\u7D50\u679C...\u3053\u306E\u8CC7\u6599\u306F\u300C\u4F1D\u8AAC\u300D\u7D1A\u306E\u4FA1\u5024\u304C\u3042\u308A\u307E\u3059\u3002",
  ],
  NotebookLM: [
    "\u8CC7\u6599\u306E\u6574\u5408\u6027\u3092\u78BA\u8A8D\u3057\u307E\u3057\u305F\u3002\u554F\u984C\u3042\u308A\u307E\u305B\u3093\u3002",
    "\u30A4\u30F3\u30C7\u30C3\u30AF\u30B9\u3092\u518D\u69CB\u7BC9\u3057\u307E\u3057\u305F\u3002\u691C\u7D22\u304C\u901F\u304F\u306A\u308A\u307E\u3059\u3002",
  ],
  Cursor: [
    "\u304A\u3063\u3001\u3053\u306E\u30B3\u30FC\u30C9\u8CC7\u6599\u3044\u3044\u306A\uFF01\u53C2\u8003\u306B\u3059\u308B\u305C\uFF01",
  ],
  v0: [
    "\u3053\u306E\u30C7\u30B6\u30A4\u30F3\u8CC7\u6599\u3001\u53C2\u8003\u306B\u306A\u308B\uFF5E\uFF01\u30A2\u30EC\u30F3\u30B8\u3057\u3066\u304A\u304F\u306D\uFF01",
  ],
}

const DEFAULT_IN_ROOM = ["genspark", "antigravity"]

export default function ArchivesRoom() {
  const [viewMode, setViewMode] = useState<ViewMode>("windows")
  const [openIds, setOpenIds] = useState<number[]>([])
  const [filter, setFilter] = useState<string>("all")
  const [inRoomIds, setInRoomIds] = useState<string[]>(DEFAULT_IN_ROOM)

  const handleToggle = useCallback((id: number) => {
    setOpenIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
  }, [])

  const handleClose = useCallback((id: number) => {
    setOpenIds((prev) => prev.filter((x) => x !== id))
  }, [])

  const handleCloseAll = useCallback(() => { setOpenIds([]) }, [])

  const handleToggleAgent = useCallback((id: string) => {
    setInRoomIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
  }, [])

  const filteredItems = filter === "all" ? inventoryItems : inventoryItems.filter((i) => i.type === filter)

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.15) 2px, rgba(0,240,255,0.15) 4px)" }} />

      <RoomHeader roomName="\u8CC7\u6599\u5EAB" roomNameEn="ARCHIVES" borderClass="neon-border-green" textClass="text-neon-green" />
      <AgentBar inRoomIds={inRoomIds} onToggleAgent={handleToggleAgent} showRoomControls />

      <div className="flex items-center justify-between px-4 py-2 border-b border-[#1a1a1a] bg-[#060606]">
        <div className="flex items-center gap-2">
          <ModeSwitcher current={viewMode} onChange={setViewMode} />
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 py-1.5 border-b border-[#1a1a1a] bg-[#080808]">
        <Filter className="w-2.5 h-2.5 text-[#555]" />
        <span className="text-[7px] font-dot-jp text-[#555]">{"\u7D5E\u8FBC:"}</span>
        {["all", "code", "design", "map", "doc"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-2 py-0.5 border text-[7px] transition-colors ${filter === f ? "border-neon-green text-neon-green bg-[#0a1a0a]" : "border-[#333] text-[#666] hover:border-[#555]"}`}
          >
            <span className="font-dot-jp">{f === "all" ? "\u5168\u3066" : f === "code" ? "\u30B3\u30FC\u30C9" : f === "design" ? "\u30C7\u30B6\u30A4\u30F3" : f === "map" ? "\u5730\u56F3" : "\u6587\u66F8"}</span>
          </button>
        ))}
        <div className="flex-1" />
        <span className="text-[7px] text-[#555]">{filteredItems.length}{"\u4EF6"}</span>
      </div>

      <div className="flex-1 min-h-0 relative overflow-auto p-4">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => {
            const Icon = typeIcons[item.type]
            const rarity = rarityColors[item.rarity]
            const isOpen = openIds.includes(item.id)

            return (
              <button
                key={item.id}
                onClick={() => handleToggle(item.id)}
                className={`flex flex-col p-3 border transition-all text-left hover:-translate-y-0.5 ${isOpen ? `${rarity.border} ${rarity.bg}` : "border-[#222] bg-[#0d0d0d] hover:border-[#444]"}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Icon className={`w-3 h-3 ${rarity.text}`} />
                    <span className={`text-[8px] ${isOpen ? rarity.text : "text-[#ccc]"}`}>{item.name}</span>
                  </div>
                  <span className={`text-[7px] ${rarity.text} font-bold`}>{rarity.label}</span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[6px] font-dot-jp text-[#555]">{"\u62C5\u5F53: "}{item.agent}</span>
                  <span className="text-[6px] text-[#444]">{item.timestamp}</span>
                </div>
                {isOpen && (
                  <div className="flex items-center gap-1 mt-2">
                    <Sparkles className="w-2 h-2 text-neon-cyan" />
                    <span className="text-[6px] font-dot-jp text-neon-cyan">{"\u5C55\u958B\u4E2D"}</span>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {viewMode === "windows" && <ArtifactViewerWindows items={inventoryItems} openIds={openIds} onClose={handleClose} />}
        {viewMode === "hologram" && <ArtifactViewerHologram items={inventoryItems} openIds={openIds} onClose={handleClose} />}
        {viewMode === "slide" && <ArtifactViewerSlide items={inventoryItems} openIds={openIds} onClose={handleClose} onClosePanel={handleCloseAll} />}
      </div>

      <div className="flex items-center justify-between px-4 py-1.5 border-t border-[#1a1a1a] bg-[#060606] text-[7px]">
        <div className="flex items-center gap-2">
          <Package className="w-2.5 h-2.5 text-neon-green" />
          <span className="text-neon-green font-dot-jp">{"\u7DCF\u8CC7\u6599\u6570: "}{inventoryItems.length}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-2.5 h-2.5 text-neon-green" />
          <span className="text-neon-green font-dot-jp">{"\u30B9\u30B3\u30A2: 1,240"}</span>
        </div>
      </div>

      <RoomChat
        inRoomIds={inRoomIds}
        agentResponses={archivesResponses}
        accentColor="text-neon-green"
        borderColor="border-neon-green"
      />
      <StatusBar />
    </div>
  )
}
