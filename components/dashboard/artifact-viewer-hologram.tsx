"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight, FileCode, Map, Image, FileText, Sparkles } from "lucide-react"
import type { InventoryItem } from "./artifact-data"

const typeIcons = { code: FileCode, map: Map, design: Image, doc: FileText }

const rarityColors: Record<string, { border: string; text: string; glow: string; label: string }> = {
  common: { border: "border-[#555]", text: "text-[#888]", glow: "rgba(136,136,136,0.2)", label: "\u4E26" },
  rare: { border: "border-neon-cyan", text: "text-neon-cyan", glow: "rgba(0,240,255,0.2)", label: "\u7A00" },
  epic: { border: "border-neon-pink", text: "text-neon-pink", glow: "rgba(255,45,120,0.2)", label: "\u6975" },
  legendary: { border: "border-neon-green", text: "text-neon-green", glow: "rgba(57,255,20,0.2)", label: "\u4F1D" },
}

export function ArtifactViewerHologram({ items, openIds, onClose }: { items: InventoryItem[]; openIds: number[]; onClose: (id: number) => void }) {
  const openItems = items.filter((i) => openIds.includes(i.id))
  const [currentIdx, setCurrentIdx] = useState(0)
  if (openItems.length === 0) return null

  const item = openItems[Math.min(currentIdx, openItems.length - 1)]
  const rarity = rarityColors[item.rarity]
  const Icon = typeIcons[item.type]

  const handleClose = () => { onClose(item.id); if (currentIdx > 0) setCurrentIdx(currentIdx - 1) }
  const handleCloseAll = () => { openItems.forEach((i) => onClose(i.id)); setCurrentIdx(0) }

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-md" onClick={handleCloseAll} />
      <div className="relative w-[500px] max-w-[90vw] animate-in" style={{ boxShadow: `0 0 40px ${rarity.glow}, 0 0 80px ${rarity.glow}, 0 0 120px ${rarity.glow}` }}>
        <div className="absolute inset-0 pointer-events-none z-10 opacity-10" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.2) 2px, rgba(0,240,255,0.2) 3px)" }} />
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1">
          <Sparkles className="w-4 h-4 text-neon-cyan animate-pulse-glow" />
          <span className="text-[7px] text-neon-cyan animate-blink">{"\u9B54\u6CD5\u5C55\u958B\u4E2D"}</span>
          <Sparkles className="w-4 h-4 text-neon-cyan animate-pulse-glow" />
        </div>

        <div className={`border-2 ${rarity.border} bg-[#0a0a0a]/95`}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#222] bg-[#0d0d0d]">
            <div className="flex items-center gap-3">
              <div className={`p-1.5 border ${rarity.border}`}><Icon className={`w-4 h-4 ${rarity.text}`} /></div>
              <div>
                <h3 className="text-[10px] text-[#ddd]">{item.name}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-[7px] ${rarity.text} font-bold`}>{rarity.label}</span>
                  <span className="text-[7px] text-[#555]">{"\u62C5\u5F53: "}{item.agent}</span>
                </div>
              </div>
            </div>
            <button onClick={handleClose} className="p-1.5 border border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-[#0a0a0a] transition-colors"><X className="w-3.5 h-3.5" /></button>
          </div>

          <div className="p-6 min-h-[240px]">
            <div className="border border-[#222] bg-[#060606] p-4">
              {item.type === "code" && (<div className="space-y-2">
                <p className="text-[8px] text-neon-green font-mono">{'import { auth } from "./lib"'}</p>
                <p className="text-[8px] text-neon-cyan font-mono">{"export async function verify(token: string) {"}</p>
                <p className="text-[8px] text-[#666] font-mono">{"  // GenSpark\u306E\u9B54\u6CD5\u3067\u81EA\u52D5\u751F\u6210\u3055\u308C\u305F\u30B3\u30FC\u30C9"}</p>
                <p className="text-[8px] text-[#666] font-mono">{"  const result = await auth.check(token)"}</p>
                <p className="text-[8px] text-[#666] font-mono">{"  return result.isValid"}</p>
                <p className="text-[8px] text-neon-cyan font-mono">{"}"}</p>
              </div>)}
              {item.type === "design" && (<div className="flex flex-col items-center gap-3">
                <div className="w-full h-28 border border-neon-pink bg-[#1a0a15] flex items-center justify-center">
                  <span className="text-[9px] text-neon-pink">{"[ \u30DB\u30ED\u30B0\u30E9\u30E0 UI\u30D7\u30EC\u30D3\u30E5\u30FC ]"}</span>
                </div>
                <p className="text-[8px] text-[#666]">{"v0\u304C\u30C7\u30B6\u30A4\u30F3\u3057\u305F\u30B3\u30F3\u30DD\u30FC\u30CD\u30F3\u30C8"}</p>
              </div>)}
              {item.type === "map" && (<div className="flex flex-col items-center gap-3">
                <div className="w-full h-28 border border-neon-cyan bg-[#0a1520] flex items-center justify-center">
                  <span className="text-[9px] text-neon-cyan">{"[ \u30DB\u30ED\u30B0\u30E9\u30E0 \u30B7\u30B9\u30C6\u30E0\u69CB\u6210\u56F3 ]"}</span>
                </div>
                <p className="text-[8px] text-[#666]">{"GenSpark\u304C\u751F\u6210\u3057\u305F\u69CB\u6210\u56F3"}</p>
              </div>)}
              {item.type === "doc" && (<div className="space-y-2">
                <p className="text-[9px] text-[#ccc]">{"# \u30C9\u30AD\u30E5\u30E1\u30F3\u30C8"}</p>
                <p className="text-[8px] text-[#888]">{"\u3053\u306E\u6587\u66F8\u306FGenSpark\u306E\u9B54\u6CD5\u3067\u53EC\u559A\u3055\u308C\u307E\u3057\u305F\u3002"}</p>
                <p className="text-[8px] text-[#888]">{"\u5185\u5BB9\u306F\u81EA\u52D5\u7684\u306B\u89E3\u6790\u30FB\u6574\u5F62\u3055\u308C\u3066\u3044\u307E\u3059\u3002"}</p>
                <p className="text-[8px] text-neon-green font-mono mt-3">{"\u30B9\u30C6\u30FC\u30BF\u30B9: \u5B8C\u4E86 // \u627F\u8A8D\u5F85\u3061"}</p>
              </div>)}
            </div>
          </div>

          {openItems.length > 1 && (
            <div className="flex items-center justify-between px-4 py-2 border-t border-[#222]">
              <button onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))} disabled={currentIdx === 0} className="flex items-center gap-1 text-[8px] text-neon-cyan disabled:opacity-30 hover:text-neon-pink transition-colors">
                <ChevronLeft className="w-3 h-3" /><span>{"\u524D\u3078"}</span>
              </button>
              <span className="text-[7px] text-[#555]">{currentIdx + 1} / {openItems.length}</span>
              <button onClick={() => setCurrentIdx(Math.min(openItems.length - 1, currentIdx + 1))} disabled={currentIdx >= openItems.length - 1} className="flex items-center gap-1 text-[8px] text-neon-cyan disabled:opacity-30 hover:text-neon-pink transition-colors">
                <span>{"\u6B21\u3078"}</span><ChevronRight className="w-3 h-3" />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between px-4 py-2 border-t border-[#222] bg-[#060606]">
            <span className="text-[6px] text-[#444]">{item.timestamp}</span>
            <span className="text-[6px] text-neon-cyan">{">> \u30DB\u30ED\u30B0\u30E9\u30E0\u6295\u5F71\u4E2D // \u96C6\u4E2D\u30E2\u30FC\u30C9"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
