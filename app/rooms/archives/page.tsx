"use client"

import { useState, useCallback } from "react"
import { RoomHeader } from "@/components/rooms/room-header"
import { StatusBar } from "@/components/dashboard/status-bar"
import { PixelAvatar } from "@/components/dashboard/pixel-avatar"
import { ModeSwitcher, type ViewMode } from "@/components/dashboard/mode-switcher"
import { ArtifactViewerWindows } from "@/components/dashboard/artifact-viewer-windows"
import { ArtifactViewerHologram } from "@/components/dashboard/artifact-viewer-hologram"
import { ArtifactViewerSlide } from "@/components/dashboard/artifact-viewer-slide"
import { inventoryItems } from "@/components/dashboard/artifact-data"
import { FileCode, Map, Image, FileText, Star, Package, Sparkles, Search, Filter } from "lucide-react"

const typeIcons: Record<string, typeof FileCode> = {
  code: FileCode,
  map: Map,
  design: Image,
  doc: FileText,
}

const rarityColors: Record<string, { border: string; text: string; label: string; bg: string }> = {
  common: { border: "border-[#555]", text: "text-[#888]", label: "\u4E26", bg: "bg-[#111]" },
  rare: { border: "border-neon-cyan", text: "text-neon-cyan", label: "\u7A00", bg: "bg-[#0a1520]" },
  epic: { border: "border-neon-pink", text: "text-neon-pink", label: "\u6975", bg: "bg-[#1a0a15]" },
  legendary: { border: "border-neon-green", text: "text-neon-green", label: "\u4F1D", bg: "bg-[#0a1a0a]" },
}

export default function ArchivesRoom() {
  const [viewMode, setViewMode] = useState<ViewMode>("windows")
  const [openIds, setOpenIds] = useState<number[]>([])
  const [filter, setFilter] = useState<string>("all")

  const handleToggle = useCallback((id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }, [])

  const handleClose = useCallback((id: number) => {
    setOpenIds((prev) => prev.filter((x) => x !== id))
  }, [])

  const handleCloseAll = useCallback(() => {
    setOpenIds([])
  }, [])

  const filteredItems = filter === "all"
    ? inventoryItems
    : inventoryItems.filter((i) => i.type === filter)

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Scanline */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.15) 2px, rgba(0,240,255,0.15) 4px)",
        }}
      />

      <RoomHeader roomName="\u8CC7\u6599\u5EAB" roomNameEn="ARCHIVES" borderClass="neon-border-green" textClass="text-neon-green" />

      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#1a1a1a] bg-[#060606]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <PixelAvatar character="genspark" status="active" size={20} />
            <span className="text-[7px] font-dot-jp text-neon-green">{"GenSpark: \u9B54\u5C0E\u66F8\u7BA1\u7406\u4E2D..."}</span>
          </div>
          <div className="flex items-center gap-2">
            <PixelAvatar character="antigravity" status="idle" size={20} />
            <span className="text-[7px] font-dot-jp text-neon-cyan">{"Antigravity: \u76E3\u8996\u4E2D..."}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ModeSwitcher current={viewMode} onChange={setViewMode} />
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 px-4 py-1.5 border-b border-[#1a1a1a] bg-[#080808]">
        <Filter className="w-2.5 h-2.5 text-[#555]" />
        <span className="text-[7px] font-dot-jp text-[#555]">{"\u7D5E\u8FBC:"}</span>
        {["all", "code", "design", "map", "doc"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-2 py-0.5 border text-[7px] transition-colors ${
              filter === f
                ? "border-neon-green text-neon-green bg-[#0a1a0a]"
                : "border-[#333] text-[#666] hover:border-[#555]"
            }`}
          >
            <span className="font-dot-jp">{f === "all" ? "\u5168\u3066" : f === "code" ? "\u30B3\u30FC\u30C9" : f === "design" ? "\u30C7\u30B6\u30A4\u30F3" : f === "map" ? "\u5730\u56F3" : "\u6587\u66F8"}</span>
          </button>
        ))}
        <div className="flex-1" />
        <span className="text-[7px] text-[#555]">{filteredItems.length}{"\u4EF6"}</span>
      </div>

      {/* Main grid area */}
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
                className={`flex flex-col p-3 border transition-all text-left hover:-translate-y-0.5 ${
                  isOpen
                    ? `${rarity.border} ${rarity.bg}`
                    : "border-[#222] bg-[#0d0d0d] hover:border-[#444]"
                }`}
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

        {/* Artifact viewers overlay */}
        {viewMode === "windows" && (
          <ArtifactViewerWindows items={inventoryItems} openIds={openIds} onClose={handleClose} />
        )}
        {viewMode === "hologram" && (
          <ArtifactViewerHologram items={inventoryItems} openIds={openIds} onClose={handleClose} />
        )}
        {viewMode === "slide" && (
          <ArtifactViewerSlide items={inventoryItems} openIds={openIds} onClose={handleClose} onClosePanel={handleCloseAll} />
        )}
      </div>

      {/* Bottom stats */}
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

      <StatusBar />
    </div>
  )
}
