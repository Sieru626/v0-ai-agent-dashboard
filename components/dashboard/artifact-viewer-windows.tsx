"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { X, Minimize2, Maximize2, FileCode, Map, Image, FileText } from "lucide-react"
import type { InventoryItem } from "./artifact-data"

const typeIcons = {
  code: FileCode,
  map: Map,
  design: Image,
  doc: FileText,
}

const rarityColors: Record<string, { border: string; text: string; glow: string }> = {
  common: { border: "border-[#555]", text: "text-[#888]", glow: "rgba(136,136,136,0.3)" },
  rare: { border: "border-neon-cyan", text: "text-neon-cyan", glow: "rgba(0,240,255,0.3)" },
  epic: { border: "border-neon-pink", text: "text-neon-pink", glow: "rgba(255,45,120,0.3)" },
  legendary: { border: "border-neon-green", text: "text-neon-green", glow: "rgba(57,255,20,0.3)" },
}

interface DragState {
  isDragging: boolean
  offsetX: number
  offsetY: number
}

function DraggableWindow({
  item,
  index,
  onClose,
}: {
  item: InventoryItem
  index: number
  onClose: (id: number) => void
}) {
  const rarity = rarityColors[item.rarity]
  const Icon = typeIcons[item.type]
  const [pos, setPos] = useState({ x: 80 + index * 30, y: 60 + index * 30 })
  const [minimized, setMinimized] = useState(false)
  const [zIndex, setZIndex] = useState(10 + index)
  const dragRef = useRef<DragState>({ isDragging: false, offsetX: 0, offsetY: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    dragRef.current = {
      isDragging: true,
      offsetX: e.clientX - pos.x,
      offsetY: e.clientY - pos.y,
    }
    setZIndex(100)
  }, [pos])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current.isDragging) return
      setPos({
        x: e.clientX - dragRef.current.offsetX,
        y: e.clientY - dragRef.current.offsetY,
      })
    }
    const handleMouseUp = () => {
      dragRef.current.isDragging = false
    }
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <div
      ref={windowRef}
      className={`absolute ${rarity.border} border-2 bg-[#0a0a0a] transition-shadow`}
      style={{
        left: pos.x,
        top: pos.y,
        width: 320,
        zIndex,
        boxShadow: `0 0 20px ${rarity.glow}, 0 0 60px ${rarity.glow}`,
      }}
      onClick={() => setZIndex(100)}
    >
      {/* Title bar - pixel OS style */}
      <div
        className="flex items-center justify-between px-2 py-1.5 bg-[#111] border-b border-[#222] cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <Icon className={`w-3 h-3 ${rarity.text}`} />
          <span className="text-[8px] text-[#ccc]">{item.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); setMinimized(!minimized) }}
            className="w-4 h-4 flex items-center justify-center border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-[#0a0a0a] transition-colors text-[8px]"
            aria-label="最小化"
          >
            {'-'}
          </button>
          <button
            className="w-4 h-4 flex items-center justify-center border border-neon-green text-neon-green hover:bg-neon-green hover:text-[#0a0a0a] transition-colors text-[8px]"
            aria-label="最大化"
          >
            {'O'}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(item.id) }}
            className="w-4 h-4 flex items-center justify-center border border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-[#0a0a0a] transition-colors text-[8px]"
            aria-label="閉じる"
          >
            {'X'}
          </button>
        </div>
      </div>

      {/* Content */}
      {!minimized && (
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[7px] ${rarity.text} font-bold`}>
              {item.rarity === "common" ? "並" : item.rarity === "rare" ? "稀" : item.rarity === "epic" ? "極" : "伝"}
            </span>
            <span className="text-[7px] text-[#555]">{'担当: '}{item.agent}</span>
          </div>

          {/* Simulated content area */}
          <div className="border border-[#222] bg-[#060606] p-3 min-h-[120px]">
            <div className="space-y-1.5">
              {item.type === "code" && (
                <>
                  <p className="text-[7px] text-neon-green font-mono">{'import { auth } from "./lib"'}</p>
                  <p className="text-[7px] text-neon-cyan font-mono">{'export async function verify() {'}</p>
                  <p className="text-[7px] text-[#666] font-mono">{'  // GenSparkが召喚した実装...'}</p>
                  <p className="text-[7px] text-neon-cyan font-mono">{'}'}</p>
                </>
              )}
              {item.type === "design" && (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-full h-16 border border-neon-pink bg-[#1a0a15] flex items-center justify-center">
                    <span className="text-[7px] text-neon-pink">{'[ UIプレビュー ]'}</span>
                  </div>
                  <p className="text-[7px] text-[#666]">{'v0がデザインしたUI'}</p>
                </div>
              )}
              {item.type === "map" && (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-full h-16 border border-neon-cyan bg-[#0a1520] flex items-center justify-center">
                    <span className="text-[7px] text-neon-cyan">{'[ システム構成図 ]'}</span>
                  </div>
                  <p className="text-[7px] text-[#666]">{'GenSparkが生成した図面'}</p>
                </div>
              )}
              {item.type === "doc" && (
                <>
                  <p className="text-[7px] text-[#999]">{'# ドキュメント'}</p>
                  <p className="text-[7px] text-[#666]">{'この資料はGenSparkの魔法で'}</p>
                  <p className="text-[7px] text-[#666]">{'召喚されました...'}</p>
                  <p className="text-[7px] text-neon-green font-mono">{'ステータス: 完了'}</p>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-[6px] text-[#444]">{item.timestamp}</span>
            <span className="text-[6px] text-neon-green">{'>> 魔法召喚済み'}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export function ArtifactViewerWindows({
  items,
  openIds,
  onClose,
}: {
  items: InventoryItem[]
  openIds: number[]
  onClose: (id: number) => void
}) {
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
