"use client"

import { FileCode, Map, Image, FileText, Package, Star } from "lucide-react"

interface InventoryItem {
  id: number
  name: string
  type: "code" | "map" | "design" | "doc"
  agent: string
  rarity: "common" | "rare" | "epic" | "legendary"
  timestamp: string
}

const inventoryItems: InventoryItem[] = [
  { id: 1, name: "auth-module.ts", type: "code", agent: "Cursor", rarity: "rare", timestamp: "09:02" },
  { id: 2, name: "dashboard-ui.fig", type: "design", agent: "v0", rarity: "epic", timestamp: "09:04" },
  { id: 3, name: "system-map.svg", type: "map", agent: "GenSpark", rarity: "rare", timestamp: "09:06" },
  { id: 4, name: "api-docs.md", type: "doc", agent: "GenSpark", rarity: "common", timestamp: "09:06" },
  { id: 5, name: "forecast.json", type: "doc", agent: "Antigravity", rarity: "legendary", timestamp: "09:08" },
  { id: 6, name: "spec-v3.2.pdf", type: "doc", agent: "NotebookLM", rarity: "epic", timestamp: "09:10" },
]

const typeIcons = { code: FileCode, map: Map, design: Image, doc: FileText }

const rarityColors = {
  common: { border: "border-[#555]", text: "text-[#888]", label: "\u4E26" },
  rare: { border: "border-neon-cyan", text: "text-neon-cyan", label: "\u7A00" },
  epic: { border: "border-neon-pink", text: "text-neon-pink", label: "\u6975" },
  legendary: { border: "border-neon-green", text: "text-neon-green", label: "\u4F1D" },
}

function InventoryCard({ item }: { item: InventoryItem }) {
  const Icon = typeIcons[item.type]
  const rarity = rarityColors[item.rarity]
  return (
    <div className={`p-2 border ${rarity.border} bg-[#0d0d0d] hover:bg-[#111] transition-all cursor-pointer group`}>
      <div className="flex items-start gap-2">
        <div className={`p-1.5 border ${rarity.border} bg-[#0a0a0a]`}>
          <Icon className={`w-3 h-3 ${rarity.text}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-[7px] text-[#ccc] truncate block flex-1">{item.name}</span>
            <span className={`text-[6px] ${rarity.text} font-bold`}>{rarity.label}</span>
          </div>
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-[6px] text-[#555]">{"\u62C5\u5F53: "}{item.agent}</span>
            <span className="text-[6px] text-[#444]">{item.timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function InventorySidebar() {
  return (
    <aside className="w-52 border-l-2 neon-border-green bg-[#080808] flex flex-col">
      <div className="p-3 border-b border-[#1a1a1a]">
        <div className="flex items-center gap-2 justify-center">
          <Package className="w-3 h-3 text-neon-green" />
          <h2 className="text-[9px] neon-text-green tracking-widest">{"\u5009\u5EAB"}</h2>
        </div>
        <p className="text-[6px] text-center text-[#555] mt-1">{"// \u6210\u679C\u7269\u30FB\u30A2\u30FC\u30C6\u30A3\u30D5\u30A1\u30AF\u30C8"}</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-1 p-2">
          {inventoryItems.map((item) => (<InventoryCard key={item.id} item={item} />))}
        </div>
      </div>
      <div className="p-2 border-t border-[#1a1a1a]">
        <div className="flex items-center justify-between text-[7px]">
          <span className="text-[#555]">{"\u6240\u6301\u54C1: "}{inventoryItems.length}</span>
          <div className="flex items-center gap-1 text-neon-green">
            <Star className="w-2.5 h-2.5" />
            <span>{"\u30B9\u30B3\u30A2: 1,240"}</span>
          </div>
        </div>
        <div className="flex gap-1 mt-1.5">
          {Object.entries(rarityColors).map(([key, val]) => (
            <div key={key} className={`flex-1 text-center py-0.5 border ${val.border} text-[5px] ${val.text}`}>{val.label}</div>
          ))}
        </div>
      </div>
    </aside>
  )
}
