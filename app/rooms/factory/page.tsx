"use client"

import { useState } from "react"
import { RoomHeader } from "@/components/rooms/room-header"
import { StatusBar } from "@/components/dashboard/status-bar"
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

export default function FactoryRoom() {
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code")
  const [buildStatus, setBuildStatus] = useState<"idle" | "building" | "success">("idle")

  const handleBuild = () => {
    setBuildStatus("building")
    setTimeout(() => setBuildStatus("success"), 2000)
    setTimeout(() => setBuildStatus("idle"), 4000)
  }

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.15) 2px, rgba(0,240,255,0.15) 4px)" }} />

      <RoomHeader roomName={"\u5DE5\u623F"} roomNameEn="FACTORY" borderClass="neon-border-cyan" textClass="text-neon-cyan" />

      <div className="flex items-center justify-between px-4 py-2 border-b border-[#1a1a1a] bg-[#060606]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <button onClick={() => setActiveTab("code")} className={`flex items-center gap-1 px-3 py-1 border text-[8px] transition-colors ${activeTab === "code" ? "border-neon-cyan text-neon-cyan bg-[#0a1520]" : "border-[#333] text-[#666] hover:border-neon-cyan"}`}>
              <Code className="w-2.5 h-2.5" />
              <span>{"\u30B3\u30FC\u30C9"}</span>
            </button>
            <button onClick={() => setActiveTab("preview")} className={`flex items-center gap-1 px-3 py-1 border text-[8px] transition-colors ${activeTab === "preview" ? "border-neon-pink text-neon-pink bg-[#1a0a15]" : "border-[#333] text-[#666] hover:border-neon-pink"}`}>
              <Eye className="w-2.5 h-2.5" />
              <span>{"\u30D7\u30EC\u30D3\u30E5\u30FC"}</span>
            </button>
          </div>
          <div className="w-px h-5 bg-[#222]" />
          <div className="flex items-center gap-2">
            <PixelAvatar character="cursor" status="active" size={20} />
            <span className="text-[7px] text-neon-green">{"Cursor: \u5B9F\u88C5\u4E2D..."}</span>
          </div>
          <div className="flex items-center gap-2">
            <PixelAvatar character="v0" status="active" size={20} />
            <span className="text-[7px] text-neon-pink">{"v0: \u30B9\u30BF\u30A4\u30EA\u30F3\u30B0\u4E2D..."}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleBuild} disabled={buildStatus === "building"} className={`flex items-center gap-1 px-3 py-1 border text-[8px] transition-colors ${buildStatus === "success" ? "border-neon-green text-neon-green" : buildStatus === "building" ? "border-neon-cyan text-neon-cyan animate-pulse" : "border-neon-green text-neon-green hover:bg-neon-green hover:text-[#0a0a0a]"}`}>
            {buildStatus === "building" ? (
              <><RotateCcw className="w-2.5 h-2.5 animate-spin" /><span>{"\u30D3\u30EB\u30C9\u4E2D..."}</span></>
            ) : buildStatus === "success" ? (
              <><Check className="w-2.5 h-2.5" /><span>{"\u6210\u529F"}</span></>
            ) : (
              <><Play className="w-2.5 h-2.5" /><span>{"\u30D3\u30EB\u30C9"}</span></>
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
                  <div className="text-[10px] neon-text-pink">{"\u306A\u308A\u305F\u305F\u305B\u5C4B\u672C\u8217"}</div>
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
            <span className="text-[8px] neon-text-green">{"\u30D3\u30EB\u30C9\u30ED\u30B0"}</span>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1 text-[7px] font-mono">
            <p className="text-[#666]">{"> init..."}</p>
            <p className="text-[#666]">{"> compiling..."}</p>
            <p className="text-neon-green">{"> Cursor: \u30C7\u30D7\u30ED\u30A4\u6E96\u5099\u5B8C\u4E86\u3060\u305C\uFF01"}</p>
            <p className="text-neon-pink">{"> v0: CSS\u30D0\u30C3\u30C1\u30EA\uFF5E\uFF01"}</p>
            <p className="text-neon-cyan">{"> build complete"}</p>
          </div>
        </div>
      </div>

      <StatusBar />
    </div>
  )
}
