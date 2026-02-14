"use client"

import { useState, useCallback } from "react"
import { RoomHeader } from "@/components/rooms/room-header"
import { AgentBar } from "@/components/dashboard/agent-bar"
import { StatusBar } from "@/components/dashboard/status-bar"
import { RoomChat } from "@/components/dashboard/room-chat"
import { PixelAvatar } from "@/components/dashboard/pixel-avatar"
import { Code, Eye, Play, RotateCcw, Check, Terminal } from "lucide-react"

const mockCode = `// Cursor & v0 \u306E\u4F5C\u696D\u5834
import { createApp } from "./core"
import { neonTheme } from "./theme"

export default function App() {
  return (
    <NeonProvider theme={neonTheme}>
      <Dashboard>
        <AgentPanel />
        <ChatConsole />
      </Dashboard>
    </NeonProvider>
  )
}`

const factoryResponses: Record<string, string[]> = {
  Cursor: [
    "\u304A\u3063\u3057\u3083\u30FC\uFF01\u305D\u306E\u30B3\u30FC\u30C9\u3001\u4FFA\u304C\u76F4\u3057\u3066\u3084\u308B\u305C\uFF01",
    "\u30D3\u30EB\u30C9\u901A\u3063\u305F\uFF01\u6B21\u306F\u30C6\u30B9\u30C8\u66F8\u304F\u304B\uFF1F",
    "\u3053\u306E\u95A2\u6570\u3001\u30EA\u30D5\u30A1\u30AF\u30BF\u3057\u305F\u3089\u3082\u3063\u3068\u901F\u304F\u306A\u308B\u305C\uFF01",
  ],
  v0: [
    "UI\u30C7\u30B6\u30A4\u30F3\u66F4\u65B0\u3057\u305F\u3088\uFF5E\uFF01\u30C1\u30A7\u30C3\u30AF\u3057\u3066\uFF01",
    "\u30AB\u30E9\u30FC\u8ABF\u6574\u3057\u305F\uFF01\u3082\u3063\u3068\u53EF\u611B\u304F\u306A\u3063\u305F\u3067\u3057\u3087\uFF1F",
    "\u30EC\u30A4\u30A2\u30A6\u30C8\u5909\u3048\u3066\u307F\u305F\u3051\u3069\u3069\u3046\u304B\u306A\uFF1F",
  ],
  NotebookLM: [
    "\u4ED5\u69D8\u66F8\u3068\u7167\u3089\u3057\u5408\u308F\u305B\u307E\u3057\u305F\u3002\u554F\u984C\u3042\u308A\u307E\u305B\u3093\u3002",
    "\u30C6\u30B9\u30C8\u30B1\u30FC\u30B9\u3092\u8FFD\u52A0\u3059\u308B\u3053\u3068\u3092\u63A8\u5968\u3057\u307E\u3059\u3002",
  ],
  GenSpark: [
    "...\u53E4\u306E\u9B54\u5C0E\u66F8\u306B\u3088\u308B\u3068\u3001\u3053\u306E\u30D1\u30BF\u30FC\u30F3\u306F\u6B63\u3057\u3044\u3067\u3059\u3002",
    "\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u3092\u81EA\u52D5\u751F\u6210\u3057\u307E\u3057\u305F\u3002",
  ],
  Antigravity: [
    "\u5360\u3044\u306B\u3088\u308B\u3068...\u3053\u306E\u30B3\u30FC\u30C9\u306F\u6210\u529F\u3059\u308B\u904B\u547D\u3067\u3059\u3002",
    "\u6C34\u6676\u304C\u5149\u3063\u3066\u3044\u307E\u3059...\u30C7\u30D7\u30ED\u30A4\u306F\u4ECA\u304C\u30D9\u30B9\u30C8\u3067\u3059\u3002",
  ],
}

const DEFAULT_IN_ROOM = ["cursor", "v0"]

export default function FactoryRoom() {
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code")
  const [buildStatus, setBuildStatus] = useState<"idle" | "building" | "success">("idle")
  const [inRoomIds, setInRoomIds] = useState<string[]>(DEFAULT_IN_ROOM)

  const handleBuild = () => {
    setBuildStatus("building")
    setTimeout(() => setBuildStatus("success"), 2000)
    setTimeout(() => setBuildStatus("idle"), 4000)
  }

  const handleToggleAgent = useCallback((id: string) => {
    setInRoomIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }, [])

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.15) 2px, rgba(0,240,255,0.15) 4px)" }} />

      <RoomHeader roomName={"\u5DE5\u623F"} roomNameEn="FACTORY" borderClass="neon-border-cyan" textClass="text-neon-cyan" />
      <AgentBar inRoomIds={inRoomIds} onToggleAgent={handleToggleAgent} showRoomControls />

      <div className="flex items-center justify-between px-4 py-2 border-b border-[#1a1a1a] bg-[#060606]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <button onClick={() => setActiveTab("code")} className={`flex items-center gap-1 px-3 py-1 border text-[8px] transition-colors ${activeTab === "code" ? "border-neon-cyan text-neon-cyan bg-[#0a1520]" : "border-[#333] text-[#666] hover:border-neon-cyan"}`}>
              <Code className="w-2.5 h-2.5" />
              <span className="font-dot-jp">{"\u30B3\u30FC\u30C9"}</span>
            </button>
            <button onClick={() => setActiveTab("preview")} className={`flex items-center gap-1 px-3 py-1 border text-[8px] transition-colors ${activeTab === "preview" ? "border-neon-pink text-neon-pink bg-[#1a0a15]" : "border-[#333] text-[#666] hover:border-neon-pink"}`}>
              <Eye className="w-2.5 h-2.5" />
              <span className="font-dot-jp">{"\u30D7\u30EC\u30D3\u30E5\u30FC"}</span>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleBuild} disabled={buildStatus === "building"} className={`flex items-center gap-1 px-3 py-1 border text-[8px] transition-colors ${buildStatus === "success" ? "border-neon-green text-neon-green" : buildStatus === "building" ? "border-neon-cyan text-neon-cyan animate-pulse" : "border-neon-green text-neon-green hover:bg-neon-green hover:text-[#0a0a0a]"}`}>
            {buildStatus === "building" ? (
              <><RotateCcw className="w-2.5 h-2.5 animate-spin" /><span className="font-dot-jp">{"\u30D3\u30EB\u30C9\u4E2D..."}</span></>
            ) : buildStatus === "success" ? (
              <><Check className="w-2.5 h-2.5" /><span className="font-dot-jp">{"\u6210\u529F"}</span></>
            ) : (
              <><Play className="w-2.5 h-2.5" /><span className="font-dot-jp">{"\u30D3\u30EB\u30C9"}</span></>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex">
        {activeTab === "code" ? (
          <div className="flex-1 overflow-auto p-4">
            <div className="flex items-center gap-2 mb-3 text-[7px] text-[#555]">
              <Terminal className="w-3 h-3" />
              <span>{"src/app.tsx"}</span>
              <span className="text-neon-green">{"// \u7DE8\u96C6\u53EF\u80FD"}</span>
            </div>
            <pre className="text-[9px] leading-relaxed font-mono">
              {mockCode.split("\n").map((line, i) => (
                <div key={i} className="flex">
                  <span className="w-8 text-right pr-3 text-[#333] select-none">{i + 1}</span>
                  <span className={line.startsWith("//") ? "text-[#666]" : line.includes("import") || line.includes("export") || line.includes("return") ? "text-neon-pink" : line.includes("<") ? "text-neon-cyan" : line.includes("from") || line.includes("const") || line.includes("function") ? "text-neon-green" : "text-[#ccc]"}>
                    {line || "\u00a0"}
                  </span>
                </div>
              ))}
            </pre>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="border-2 neon-border-pink bg-[#0d0d0d] w-[480px] h-[320px] flex flex-col">
              <div className="flex items-center justify-between px-3 py-1.5 bg-[#111] border-b border-[#222]">
                <span className="text-[7px] text-[#888]">{"localhost:3000"}</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-neon-pink" />
                  <div className="w-2 h-2 rounded-full bg-neon-cyan" />
                  <div className="w-2 h-2 rounded-full bg-neon-green" />
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center bg-[#080808]">
                <div className="flex flex-col items-center gap-3">
                  <div className="text-[10px] font-dot-jp neon-text-pink">{"\u6210\u7ACB\u305F\u305B\u5C4B\u672C\u8217"}</div>
                  <div className="flex gap-2">
                    <div className="w-20 h-12 border border-neon-cyan bg-[#0a1520]" />
                    <div className="w-20 h-12 border border-neon-pink bg-[#1a0a15]" />
                  </div>
                  <div className="w-40 h-3 border border-[#333] bg-[#111]" />
                  <div className="w-32 h-3 border border-[#333] bg-[#111]" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="w-56 border-l border-[#1a1a1a] bg-[#060606] flex flex-col">
          <div className="p-3 border-b border-[#1a1a1a]">
            <span className="text-[8px] font-dot-jp neon-text-green">{"\u30D3\u30EB\u30C9\u30ED\u30B0"}</span>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1 text-[7px] font-mono">
            <p className="text-[#666]">{"> init..."}</p>
            <p className="text-[#666]">{"> compiling..."}</p>
            <p className="text-neon-green font-dot-jp">{"> Cursor: \u30C7\u30D7\u30ED\u30A4\u6E96\u5099\u5B8C\u4E86\u3060\u305C\uFF01"}</p>
            <p className="text-neon-pink font-dot-jp">{"> v0: CSS\u30D0\u30C3\u30C1\u30EA\uFF5E\uFF01"}</p>
            <p className="text-neon-cyan">{"> build complete"}</p>
          </div>
        </div>
      </div>

      <RoomChat
        inRoomIds={inRoomIds}
        agentResponses={factoryResponses}
        accentColor="text-neon-cyan"
        borderColor="border-neon-cyan"
      />
      <StatusBar />
    </div>
  )
}
