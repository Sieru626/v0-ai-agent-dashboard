"use client"

import { useState } from "react"
import { RoomHeader } from "@/components/rooms/room-header"
import { StatusBar } from "@/components/dashboard/status-bar"
import { PixelAvatar } from "@/components/dashboard/pixel-avatar"
import { Code, Eye, Play, RotateCcw, Check, Terminal } from "lucide-react"

const mockCode = `// Cursor & v0 の作業場
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
      {/* Scanline */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.15) 2px, rgba(0,240,255,0.15) 4px)",
        }}
      />

      <RoomHeader roomName="工房" roomNameEn="FACTORY" borderClass="neon-border-cyan" textClass="text-neon-cyan" />

      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#1a1a1a] bg-[#060606]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab("code")}
              className={`flex items-center gap-1 px-3 py-1 border text-[8px] transition-colors ${
                activeTab === "code"
                  ? "border-neon-cyan text-neon-cyan bg-[#0a1520]"
                  : "border-[#333] text-[#666] hover:border-neon-cyan"
              }`}
            >
              <Code className="w-2.5 h-2.5" />
              <span>{"コード"}</span>
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-1 px-3 py-1 border text-[8px] transition-colors ${
                activeTab === "preview"
                  ? "border-neon-pink text-neon-pink bg-[#1a0a15]"
                  : "border-[#333] text-[#666] hover:border-neon-pink"
              }`}
            >
              <Eye className="w-2.5 h-2.5" />
              <span>{"プレビュー"}</span>
            </button>
          </div>

          <div className="w-px h-5 bg-[#222]" />

          <div className="flex items-center gap-2">
            <PixelAvatar character="cursor" status="active" size={20} />
            <span className="text-[7px] text-neon-green">{"Cursor: 実装中..."}</span>
          </div>

          <div className="flex items-center gap-2">
            <PixelAvatar character="v0" status="active" size={20} />
            <span className="text-[7px] text-neon-pink">{"v0: スタイリング中..."}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleBuild}
            disabled={buildStatus === "building"}
            className={`flex items-center gap-1 px-3 py-1 border text-[8px] transition-colors ${
              buildStatus === "success"
                ? "border-neon-green text-neon-green"
                : buildStatus === "building"
                  ? "border-neon-cyan text-neon-cyan animate-pulse"
                  : "border-neon-green text-neon-green hover:bg-neon-green hover:text-[#0a0a0a]"
            }`}
          >
            {buildStatus === "building" ? (
              <><RotateCcw className="w-2.5 h-2.5 animate-spin" /><span>{"ビルド中..."}</span></>
            ) : buildStatus === "success" ? (
              <><Check className="w-2.5 h-2.5" /><span>{"成功"}</span></>
            ) : (
              <><Play className="w-2.5 h-2.5" /><span>{"ビルド"}</span></>
            )}
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 min-h-0 flex">
        {activeTab === "code" ? (
          <div className="flex-1 overflow-auto p-4">
            <div className="flex items-center gap-2 mb-3 text-[7px] text-[#555]">
              <Terminal className="w-3 h-3" />
              <span>{"src/app.tsx"}</span>
              <span className="text-neon-green">{"// 編集可能"}</span>
            </div>
            <pre className="text-[9px] leading-relaxed font-mono">
              {mockCode.split("\n").map((line, i) => (
                <div key={i} className="flex">
                  <span className="w-8 text-right pr-3 text-[#333] select-none">{i + 1}</span>
                  <span
                    className={
                      line.startsWith("//")
                        ? "text-[#666]"
                        : line.includes("import") || line.includes("export") || line.includes("return")
                          ? "text-neon-pink"
                          : line.includes("<")
                            ? "text-neon-cyan"
                            : line.includes("from") || line.includes("const") || line.includes("function")
                              ? "text-neon-green"
                              : "text-[#ccc]"
                    }
                  >
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
                  <div className="text-[10px] neon-text-pink">{"なりたたせ屋本舗"}</div>
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
      </div>

      {/* Build log */}
      <div className="h-24 border-t border-[#1a1a1a] bg-[#060606] overflow-auto p-3">
        <div className="flex items-center gap-2 mb-2">
          <Terminal className="w-3 h-3 text-neon-green" />
          <span className="text-[8px] neon-text-green">{"ビルドログ"}</span>
        </div>
        <div className="space-y-0.5 text-[7px] font-mono">
          <p className="text-neon-green">{"> next build"}</p>
          <p className="text-[#666]">{"  Creating optimized production build..."}</p>
          <p className="text-neon-cyan">{"  Compiled successfully in 2.3s"}</p>
          <p className="text-[#666]">{"  Route (app) | Size | First Load"}</p>
          <p className="text-neon-green">{"  /           | 4.2kB | 87kB"}</p>
          <p className="text-neon-green">{"> Cursor: デプロイ準備完了だぜ！"}</p>
        </div>
      </div>

      <StatusBar />
    </div>
  )
}
