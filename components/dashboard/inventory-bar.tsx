"use client"

import { FileCode, Map, Image, FileText, Star, Package, Sparkles } from "lucide-react"
import { inventoryItems } from "./artifact-data"

const typeIcons = {
  code: FileCode,
  map: Map,
  design: Image,
  doc: FileText,
}

const rarityColors: Record<string, { border: string; text: string; label: string }> = {
  common: { border: "border-[#555]", text: "text-[#888]", label: "\u4E26" },
  rare: { border: "border-neon-cyan", text: "text-neon-cyan", label: "\u7A00" },
  epic: { border: "border-neon-pink", text: "text-neon-pink", label: "\u6975" },
  legendary: { border: "border-neon-green", text: "text-neon-green", label: "\u4F1D" },
}

export function InventoryBar({
  openIds,
  onToggle,
}: {
  openIds: number[]
  onToggle: (id: number) => void
}) {
  return (
    <div className="flex items-center gap-2 px-4 py-1.5 border-t border-[#1a1a1a] bg-[#060606]">
      <div className="flex items-center gap-1.5 mr-2">
        <Package className="w-3 h-3 text-neon-green" />
        <span className="text-[7px] neon-text-green">{"\u5009\u5EAB"}</span>
      </div>

      <div className="flex items-center gap-1 flex-1 overflow-x-auto">
        {inventoryItems.map((item) => {
          const Icon = typeIcons[item.type]
          const rarity = rarityColors[item.rarity]
          const isOpen = openIds.includes(item.id)

          return (
            <button
              key={item.id}
              onClick={() => onToggle(item.id)}
              className={`flex items-center gap-1.5 px-2 py-1 border text-[7px] transition-all flex-shrink-0 ${
                isOpen
                  ? `${rarity.border} ${rarity.text} bg-[#111]`
                  : "border-[#222] text-[#666] hover:border-[#444] hover:text-[#999]"
              }`}
            >
              <Icon className="w-2.5 h-2.5" />
              <span className="truncate max-w-[80px]">{item.name}</span>
              <span className={`text-[6px] ${rarity.text} font-bold`}>{rarity.label}</span>
              {isOpen && <Sparkles className="w-2 h-2 text-neon-cyan" />}
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-1 text-[7px] text-neon-green flex-shrink-0">
        <Star className="w-2.5 h-2.5" />
        <span>{"\u30B9\u30B3\u30A2: 1,240"}</span>
      </div>
    </div>
  )
}
