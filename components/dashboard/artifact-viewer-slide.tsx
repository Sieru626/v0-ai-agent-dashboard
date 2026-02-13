"use client"

import { X, FileCode, Map, Image, FileText, Star } from "lucide-react"
import type { InventoryItem } from "./artifact-data"

const typeIcons = { code: FileCode, map: Map, design: Image, doc: FileText }

const rarityColors: Record<string, { border: string; text: string; label: string }> = {
  common: { border: "border-[#555]", text: "text-[#888]", label: "\u4E26" },
  rare: { border: "border-neon-cyan", text: "text-neon-cyan", label: "\u7A00" },
  epic: { border: "border-neon-pink", text: "text-neon-pink", label: "\u6975" },
  legendary: { border: "border-neon-green", text: "text-neon-green", label: "\u4F1D" },
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
        <button onClick={() => onClose(item.id)} className="text-[#555] hover:text-neon-pink transition-colors"><X className="w-3 h-3" /></button>
      </div>
      <div className="p-3">
        <div className="border border-[#222] bg-[#060606] p-2.5 min-h-[80px]">
          {item.type === "code" && (<div className="space-y-1">
            <p className="text-[7px] text-neon-green font-mono">{'import { auth } from "./lib"'}</p>
            <p className="text-[7px] text-neon-cyan font-mono">{"export async function verify() {"}</p>
            <p className="text-[7px] text-[#666] font-mono">{"  // \u81EA\u52D5\u751F\u6210\u30B3\u30FC\u30C9..."}</p>
            <p className="text-[7px] text-neon-cyan font-mono">{"}"}</p>
          </div>)}
          {item.type === "design" && (<div className="w-full h-14 border border-neon-pink bg-[#1a0a15] flex items-center justify-center">
            <span className="text-[7px] text-neon-pink">{"[ UI\u30D7\u30EC\u30D3\u30E5\u30FC ]"}</span>
          </div>)}
          {item.type === "map" && (<div className="w-full h-14 border border-neon-cyan bg-[#0a1520] flex items-center justify-center">
            <span className="text-[7px] text-neon-cyan">{"[ \u69CB\u6210\u56F3 ]"}</span>
          </div>)}
          {item.type === "doc" && (<div className="space-y-1">
            <p className="text-[7px] text-[#999]">{"# \u30C9\u30AD\u30E5\u30E1\u30F3\u30C8"}</p>
            <p className="text-[7px] text-[#666]">{"\u9B54\u6CD5\u3067\u53EC\u559A\u3055\u308C\u305F\u8CC7\u6599..."}</p>
            <p className="text-[7px] text-neon-green font-mono">{"\u30B9\u30C6\u30FC\u30BF\u30B9: \u5B8C\u4E86"}</p>
          </div>)}
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[6px] text-[#555]">{"\u62C5\u5F53: "}{item.agent}</span>
          <span className="text-[6px] text-[#444]">{item.timestamp}</span>
        </div>
      </div>
    </div>
  )
}

export function ArtifactViewerSlide({ items, openIds, onClose, onClosePanel }: { items: InventoryItem[]; openIds: number[]; onClose: (id: number) => void; onClosePanel: () => void }) {
  const openItems = items.filter((i) => openIds.includes(i.id))
  return (
    <div className={`absolute top-0 right-0 h-full w-72 z-30 bg-[#080808] border-l-2 neon-border-cyan flex flex-col transition-transform duration-300 ${openItems.length > 0 ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#1a1a1a]">
        <div className="flex items-center gap-2">
          <Star className="w-3 h-3 text-neon-cyan" />
          <span className="text-[9px] neon-text-cyan">{"\u8CC7\u6599\u30D1\u30CD\u30EB"}</span>
        </div>
        <button onClick={onClosePanel} className="text-[#555] hover:text-neon-pink transition-colors"><X className="w-3.5 h-3.5" /></button>
      </div>
      <div className="text-[6px] text-[#555] px-3 py-1 border-b border-[#1a1a1a]">
        {"// \u30B9\u30E9\u30A4\u30C9\u30D1\u30CD\u30EB // \u30C1\u30E3\u30C3\u30C8\u53C2\u7167\u30E2\u30FC\u30C9"}
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {openItems.map((item) => (<SlideItem key={item.id} item={item} onClose={onClose} />))}
        {openItems.length === 0 && (<div className="flex items-center justify-center h-full"><p className="text-[8px] text-[#444]">{"\u8CC7\u6599\u304C\u3042\u308A\u307E\u305B\u3093"}</p></div>)}
      </div>
      <div className="px-3 py-2 border-t border-[#1a1a1a] text-[7px] text-[#555]">
        {"\u8868\u793A\u4E2D: "}{openItems.length}{"\u4EF6"}
      </div>
    </div>
  )
}
