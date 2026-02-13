"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { FileCode, Map, Image, FileText } from "lucide-react"
import type { InventoryItem } from "./artifact-data"

const typeIcons = { code: FileCode, map: Map, design: Image, doc: FileText }

const rarityColors: Record<string, { border: string; text: string; glow: string }> = {
  common: { border: "border-[#555]", text: "text-[#888]", glow: "rgba(136,136,136,0.3)" },
  rare: { border: "border-neon-cyan", text: "text-neon-cyan", glow: "rgba(0,240,255,0.3)" },
  epic: { border: "border-neon-pink", text: "text-neon-pink", glow: "rgba(255,45,120,0.3)" },
  legendary: { border: "border-neon-green", text: "text-neon-green", glow: "rgba(57,255,20,0.3)" },
}

const rarityLabels: Record<string, string> = {
  common: "\u4E26", rare: "\u7A00", epic: "\u6975", legendary: "\u4F1D",
}

interface DragState { isDragging: boolean; offsetX: number; offsetY: number }

function DraggableWindow({ item, index, onClose }: { item: InventoryItem; index: number; onClose: (id: number) => void }) {
  const rarity = rarityColors[item.rarity]
  const Icon = typeIcons[item.type]
  const [pos, setPos] = useState({ x: 80 + index * 30, y: 60 + index * 30 })
  const [minimized, setMinimized] = useState(false)
  const [zIndex, setZIndex] = useState(10 + index)
  const dragRef = useRef<DragState>({ isDragging: false, offsetX: 0, offsetY: 0 })

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    dragRef.current = { isDragging: true, offsetX: e.clientX - pos.x, offsetY: e.clientY - pos.y }
    setZIndex(100)
  }, [pos])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current.isDragging) return
      setPos({ x: e.clientX - dragRef.current.offsetX, y: e.clientY - dragRef.current.offsetY })
    }
    const handleMouseUp = () => { dragRef.current.isDragging = false }
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    return () => { window.removeEventListener("mousemove", handleMouseMove); window.removeEventListener("mouseup", handleMouseUp) }
  }, [])

  return (
    <div
      className={`absolute ${rarity.border} border-2 bg-[#0a0a0a] transition-shadow`}
      style={{ left: pos.x, top: pos.y, width: 320, zIndex, boxShadow: `0 0 20px ${rarity.glow}, 0 0 60px ${rarity.glow}` }}
      onClick={() => setZIndex(100)}
    >
      <div className="flex items-center justify-between px-2 py-1.5 bg-[#111] border-b border-[#222] cursor-move select-none" onMouseDown={handleMouseDown}>
        <div className="flex items-center gap-2">
          <Icon className={`w-3 h-3 ${rarity.text}`} />
          <span className="text-[8px] text-[#ccc]">{item.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={(e) => { e.stopPropagation(); setMinimized(!minimized) }} className="w-4 h-4 flex items-center justify-center border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-[#0a0a0a] transition-colors text-[8px]">{"-"}</button>
          <button className="w-4 h-4 flex items-center justify-center border border-neon-green text-neon-green hover:bg-neon-green hover:text-[#0a0a0a] transition-colors text-[8px]">{"O"}</button>
          <button onClick={(e) => { e.stopPropagation(); onClose(item.id) }} className="w-4 h-4 flex items-center justify-center border border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-[#0a0a0a] transition-colors text-[8px]">{"X"}</button>
        </div>
      </div>
      {!minimized && (
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[7px] ${rarity.text} font-bold`}>{rarityLabels[item.rarity]}</span>
            <span className="text-[7px] text-[#555]">{"\u62C5\u5F53: "}{item.agent}</span>
          </div>
          <div className="border border-[#222] bg-[#060606] p-3 min-h-[120px]">
            <div className="space-y-1.5">
              {item.type === "code" && (<>
                <p className="text-[7px] text-neon-green font-mono">{'import { auth } from "./lib"'}</p>
                <p className="text-[7px] text-neon-cyan font-mono">{"export async function verify() {"}</p>
                <p className="text-[7px] text-[#666] font-mono">{"  // GenSpark\u304C\u53EC\u559A\u3057\u305F\u5B9F\u88C5..."}</p>
                <p className="text-[7px] text-neon-cyan font-mono">{"}"}</p>
              </>)}
              {item.type === "design" && (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-full h-16 border border-neon-pink bg-[#1a0a15] flex items-center justify-center">
                    <span className="text-[7px] text-neon-pink">{"[ UI\u30D7\u30EC\u30D3\u30E5\u30FC ]"}</span>
                  </div>
                  <p className="text-[7px] text-[#666]">{"v0\u304C\u30C7\u30B6\u30A4\u30F3\u3057\u305FUI"}</p>
                </div>
              )}
              {item.type === "map" && (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-full h-16 border border-neon-cyan bg-[#0a1520] flex items-center justify-center">
                    <span className="text-[7px] text-neon-cyan">{"[ \u30B7\u30B9\u30C6\u30E0\u69CB\u6210\u56F3 ]"}</span>
                  </div>
                  <p className="text-[7px] text-[#666]">{"GenSpark\u304C\u751F\u6210\u3057\u305F\u56F3\u9762"}</p>
                </div>
              )}
              {item.type === "doc" && (<>
                <p className="text-[7px] text-[#999]">{"# \u30C9\u30AD\u30E5\u30E1\u30F3\u30C8"}</p>
                <p className="text-[7px] text-[#666]">{"\u3053\u306E\u8CC7\u6599\u306FGenSpark\u306E\u9B54\u6CD5\u3067"}</p>
                <p className="text-[7px] text-[#666]">{"\u53EC\u559A\u3055\u308C\u307E\u3057\u305F..."}</p>
                <p className="text-[7px] text-neon-green font-mono">{"\u30B9\u30C6\u30FC\u30BF\u30B9: \u5B8C\u4E86"}</p>
              </>)}
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[6px] text-[#444]">{item.timestamp}</span>
            <span className="text-[6px] text-neon-green">{">> \u9B54\u6CD5\u53EC\u559A\u6E08\u307F"}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export function ArtifactViewerWindows({ items, openIds, onClose }: { items: InventoryItem[]; openIds: number[]; onClose: (id: number) => void }) {
  const openItems = items.filter((i) => openIds.includes(i.id))
  if (openItems.length === 0) return null
  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {openItems.map((item, idx) => (
        <div key={item.id} className="pointer-events-auto">
          <DraggableWindow item={item} index={idx} onClose={onClose} />
        </div>
      ))}
    </div>
  )
}
