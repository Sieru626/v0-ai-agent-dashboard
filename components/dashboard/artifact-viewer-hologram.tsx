"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight, FileCode, Map, Image, FileText, Sparkles } from "lucide-react"
import type { InventoryItem } from "./artifact-data"

const typeIcons = {
  code: FileCode,
  map: Map,
  design: Image,
  doc: FileText,
}

const rarityColors: Record<string, { border: string; text: string; glow: string; label: string }> = {
  common: { border: "border-[#555]", text: "text-[#888]", glow: "rgba(136,136,136,0.2)", label: "並" },
  rare: { border: "border-neon-cyan", text: "text-neon-cyan", glow: "rgba(0,240,255,0.2)", label: "稀" },
  epic: { border: "border-neon-pink", text: "text-neon-pink", glow: "rgba(255,45,120,0.2)", label: "極" },
  legendary: { border: "border-neon-green", text: "text-neon-green", glow: "rgba(57,255,20,0.2)", label: "伝" },
}

export function ArtifactViewerHologram({
  items,
  openIds,
  onClose,
}: {
  items: InventoryItem[]
  openIds: number[]
  onClose: (id: number) => void
}) {
  const openItems = items.filter((i) => openIds.includes(i.id))
  const [currentIdx, setCurrentIdx] = useState(0)

  if (openItems.length === 0) return null

  const item = openItems[Math.min(currentIdx, openItems.length - 1)]
  const rarity = rarityColors[item.rarity]
  const Icon = typeIcons[item.type]

  const handleClose = () => {
    onClose(item.id)
    if (currentIdx > 0) setCurrentIdx(currentIdx - 1)
  }

  const handleCloseAll = () => {
    openItems.forEach((i) => onClose(i.id))
    setCurrentIdx(0)
  }

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center">
      {/* Backdrop - glassmorphism blur */}
      <div
        className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-md"
        onClick={handleCloseAll}
      />

      {/* Hologram container */}
      <div
        className="relative w-[500px] max-w-[90vw] animate-in"
        style={{
          boxShadow: `0 0 40px ${rarity.glow}, 0 0 80px ${rarity.glow}, 0 0 120px ${rarity.glow}`,
        }}
      >
        {/* Hologram scan lines */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-10"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.2) 2px, rgba(0,240,255,0.2) 3px)",
          }}
        />

        {/* Summoning effect - top triangles */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1">
          <Sparkles className="w-4 h-4 text-neon-cyan animate-pulse-glow" />
          <span className="text-[7px] text-neon-cyan animate-blink">{'魔法展開中'}</span>
          <Sparkles className="w-4 h-4 text-neon-cyan animate-pulse-glow" />
        </div>

        <div className={`border-2 ${rarity.border} bg-[#0a0a0a]/95`}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#222] bg-[#0d0d0d]">
            <div className="flex items-center gap-3">
              <div className={`p-1.5 border ${rarity.border}`}>
                <Icon className={`w-4 h-4 ${rarity.text}`} />
              </div>
              <div>
                <h3 className="text-[10px] text-[#ddd]">{item.name}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-[7px] ${rarity.text} font-bold`}>{rarity.label}</span>
                  <span className="text-[7px] text-[#555]">{'担当: '}{item.agent}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 border border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-[#0a0a0a] transition-colors"
              aria-label="閉じる"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 min-h-[240px]">
            <div className="border border-[#222] bg-[#060606] p-4">
              {item.type === "code" && (
                <div className="space-y-2">
                  <p className="text-[8px] text-neon-green font-mono">{'import { auth } from "./lib"'}</p>
                  <p className="text-[8px] text-neon-cyan font-mono">{'export async function verify(token: string) {'}</p>
                  <p className="text-[8px] text-[#666] font-mono">{'  // GenSparkの魔法で自動生成されたコード'}</p>
                  <p className="text-[8px] text-[#666] font-mono">{'  const result = await auth.check(token)'}</p>
                  <p className="text-[8px] text-[#666] font-mono">{'  return result.isValid'}</p>
                  <p className="text-[8px] text-neon-cyan font-mono">{'}'}</p>
                </div>
              )}
              {item.type === "design" && (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-full h-28 border border-neon-pink bg-[#1a0a15] flex items-center justify-center">
                    <span className="text-[9px] text-neon-pink">{'[ ホログラム UIプレビュー ]'}</span>
                  </div>
                  <p className="text-[8px] text-[#666]">{'v0がデザインしたコンポーネント'}</p>
                </div>
              )}
              {item.type === "map" && (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-full h-28 border border-neon-cyan bg-[#0a1520] flex items-center justify-center">
                    <span className="text-[9px] text-neon-cyan">{'[ ホログラム システム構成図 ]'}</span>
                  </div>
                  <p className="text-[8px] text-[#666]">{'GenSparkが生成した構成図'}</p>
                </div>
              )}
              {item.type === "doc" && (
                <div className="space-y-2">
                  <p className="text-[9px] text-[#ccc]">{'# ドキュメント'}</p>
                  <p className="text-[8px] text-[#888]">{'この文書はGenSparkの魔法で召喚されました。'}</p>
                  <p className="text-[8px] text-[#888]">{'内容は自動的に解析・整形されています。'}</p>
                  <p className="text-[8px] text-neon-green font-mono mt-3">{'ステータス: 完了 // 承認待ち'}</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          {openItems.length > 1 && (
            <div className="flex items-center justify-between px-4 py-2 border-t border-[#222]">
              <button
                onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                disabled={currentIdx === 0}
                className="flex items-center gap-1 text-[8px] text-neon-cyan disabled:opacity-30 hover:text-neon-pink transition-colors"
              >
                <ChevronLeft className="w-3 h-3" />
                <span>{'前へ'}</span>
              </button>
              <span className="text-[7px] text-[#555]">
                {currentIdx + 1} / {openItems.length}
              </span>
              <button
                onClick={() => setCurrentIdx(Math.min(openItems.length - 1, currentIdx + 1))}
                disabled={currentIdx >= openItems.length - 1}
                className="flex items-center gap-1 text-[8px] text-neon-cyan disabled:opacity-30 hover:text-neon-pink transition-colors"
              >
                <span>{'次へ'}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-[#222] bg-[#060606]">
            <span className="text-[6px] text-[#444]">{item.timestamp}</span>
            <span className="text-[6px] text-neon-cyan">{'>> ホログラム投影中 // 集中モード'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
