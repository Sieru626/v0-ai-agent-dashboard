"use client"

import { PixelAvatar } from "./pixel-avatar"

interface Agent {
  id: string
  name: string
  role: string
  status: "active" | "idle" | "error"
  statusText: string
  character: string
  level: number
}

const agents: Agent[] = [
  { id: "notebooklm", name: "NotebookLM", role: "司令塔", status: "active", statusText: "仕様チェック中", character: "notebooklm", level: 12 },
  { id: "cursor", name: "Cursor", role: "実装", status: "idle", statusText: "待機中", character: "cursor", level: 10 },
  { id: "v0", name: "v0", role: "デザイン", status: "active", statusText: "メイク中", character: "v0", level: 15 },
  { id: "genspark", name: "GenSpark", role: "資料", status: "active", statusText: "詠唱中", character: "genspark", level: 8 },
  { id: "antigravity", name: "Antigravity", role: "相談", status: "idle", statusText: "水晶占い中", character: "antigravity", level: 7 },
]

export function AgentBar() {
  return (
    <div className="flex items-center gap-3 px-4 py-1.5 border-b border-[#1a1a1a] bg-[#060606] overflow-x-auto">
      <span className="text-[7px] neon-text-cyan flex-shrink-0">{'THE 5 SISTERS'}</span>
      <div className="w-px h-5 bg-[#222]" />
      {agents.map((agent) => {
        const statusColor =
          agent.status === "active"
            ? "text-neon-green"
            : agent.status === "error"
              ? "text-neon-pink"
              : "text-neon-cyan"

        return (
          <div
            key={agent.id}
            className="flex items-center gap-2 px-2 py-1 border border-[#1a1a1a] bg-[#0a0a0a] hover:bg-[#111] transition-colors flex-shrink-0"
          >
            <PixelAvatar character={agent.character} status={agent.status} size={22} />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-[7px] text-neon-pink">{agent.name}</span>
                <span className="text-[6px] text-[#555]">{'Lv.'}{agent.level}</span>
              </div>
              <div className="flex items-center gap-1">
                <div
                  className={`w-1 h-1 rounded-full ${
                    agent.status === "active"
                      ? "bg-neon-green"
                      : agent.status === "error"
                        ? "bg-neon-pink"
                        : "bg-neon-cyan opacity-50"
                  }`}
                />
                <span className={`text-[6px] ${statusColor}`}>{agent.statusText}</span>
              </div>
            </div>
          </div>
        )
      })}
      <div className="flex-1" />
      <span className="text-[7px] text-[#555] flex-shrink-0">{'稼働中: 3/5'}</span>
      <span className="text-[7px] text-neon-green flex-shrink-0">{'SYNC OK'}</span>
    </div>
  )
}
