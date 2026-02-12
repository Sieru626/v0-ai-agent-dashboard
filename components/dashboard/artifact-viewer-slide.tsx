"use client"

import { X, FileCode, Map, Image, FileText, Star } from "lucide-react"
import type { InventoryItem } from "./artifact-data"

const typeIcons = {
  code: FileCode,
  map: Map,
  design: Image,
  doc: FileText,
}

const rarityColors: Record<string, { border: string; text: string; label: string }> = {
  common: { border: "border-[#555]", text: "text-[#888]", label: "並" },
  rare: { border: "border-neon-cyan", text: "text-neon-cyan", label: "稀" },
  epic: { border: "border-neon-pink", text: "text-neon-pink", label: "極" },
  legendary: { border: "border-neon-green", text: "text-neon-green", label: "伝" },
}

function SlideItem({ item, onClose }: { item: InventoryItem; onClose: (id: number) => void }) {
  const rarity = rarityColors[item.rarity]
  const Icon = typeIcons[item.type]

  return (
    <div className={`border ${rarity.border} bg-[#0a0a0a] mb-2`}>
      <div className="flex items-center justify-between px-3 py-2 bg-[#0d0d0d] border-b border-[#222]">
        <div className="flex items-center gap-2">
          <Icon className={`w-3 h-3 ${rarity.text}`} />
          <span className="text-[8px] text-[#ccc]">{item.name}</span>
          <span className={`text-[6px] ${rarity.text} font-bold`}>{rarity.label}</span>
        </div>
        <button
          onClick={() => onClose(item.id)}
          className="text-[#555] hover:text-neon-pink transition-colors"
          aria-label="閉じる"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
      <div className="p-3">
        <div className="border border-[#222] bg-[#060606] p-2.5 min-h-[80px]">
          {item.type === "code" && (
            <div className="space-y-1">
              <p className="text-[7px] text-neon-green font-mono">{'import { auth } from "./lib"'}</p>
              <p className="text-[7px] text-neon-cyan font-mono">{'export async function verify() {'}</p>
              <p className="text-[7px] text-[#666] font-mono">{'  // 自動生成コード...'}</p>
              <p className="text-[7px] text-neon-cyan font-mono">{'}'}</p>
            </div>
          )}
          {item.type === "design" && (
            <div className="w-full h-14 border border-neon-pink bg-[#1a0a15] flex items-center justify-center">
              <span className="text-[7px] text-neon-pink">{'[ UIプレビュー ]'}</span>
            </div>
          )}
          {item.type === "map" && (
            <div className="w-full h-14 border border-neon-cyan bg-[#0a1520] flex items-center justify-center">
              <span className="text-[7px] text-neon-cyan">{'[ 構成図 ]'}</span>
            </div>
          )}
          {item.type === "doc" && (
            <div className="space-y-1">
              <p className="text-[7px] text-[#999]">{'# ドキュメント'}</p>
              <p className="text-[7px] text-[#666]">{'魔法で召喚された資料...'}</p>
              <p className="text-[7px] text-neon-green font-mono">{'ステータス: 完了'}</p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[6px] text-[#555]">{'担当: '}{item.agent}</span>
          <span className="text-[6px] text-[#444]">{item.timestamp}</span>
        </div>
      </div>
    </div>
  )
}

export function ArtifactViewerSlide({
  items,
  openIds,
  onClose,
  onClosePanel,
}: {
  items: InventoryItem[]
  openIds: number[]
  onClose: (id: number) => void
  onClosePanel: () => void
}) {
  const openItems = items.filter((i) => openIds.includes(i.id))

  return (
    <div
      className={`absolute top-0 right-0 h-full w-72 z-30 bg-[#080808] border-l-2 neon-border-cyan flex flex-col transition-transform duration-300 ${
        openItems.length > 0 ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#1a1a1a]">
        <div className="flex items-center gap-2">
          <Star className="w-3 h-3 text-neon-cyan" />
          <span className="text-[9px] neon-text-cyan">{'資料パネル'}</span>
        </div>
        <button
          onClick={onClosePanel}
          className="text-[#555] hover:text-neon-pink transition-colors"
          aria-label="パネルを閉じる"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="text-[6px] text-[#555] px-3 py-1 border-b border-[#1a1a1a]">
        {'// スライドパネル // チャット参照モード'}
      </div>

      {/* Items list */}
      <div className="flex-1 overflow-y-auto p-2">
        {openItems.map((item) => (
          <SlideItem key={item.id} item={item} onClose={onClose} />
        ))}
        {openItems.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-[8px] text-[#444]">{'資料がありません'}</p>
          </div>
        )}
      </div>

      <div className="px-3 py-2 border-t border-[#1a1a1a] text-[7px] text-[#555]">
        {'表示中: '}{openItems.length}{'件'}
      </div>
    </div>
  )
}
