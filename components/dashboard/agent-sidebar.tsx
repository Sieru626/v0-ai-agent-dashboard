"use client"

import { PixelAvatar } from "./pixel-avatar"

export interface Agent {
  id: string
  name: string
  role: string
  status: "active" | "idle" | "error"
  statusText: string
  character: string
  xp: number
  level: number
}

const agents: Agent[] = [
  { id: "notebooklm", name: "NotebookLM", role: "\u53F8\u4EE4\u5854", status: "active", statusText: "\u4ED5\u69D8\u30C1\u30A7\u30C3\u30AF\u4E2D...", character: "notebooklm", xp: 78, level: 12 },
  { id: "cursor", name: "Cursor", role: "\u5B9F\u88C5", status: "idle", statusText: "\u5F85\u6A5F\u4E2D\uFF08\u5C45\u7720\u308A\uFF09", character: "cursor", xp: 65, level: 10 },
  { id: "v0", name: "v0", role: "\u30C7\u30B6\u30A4\u30F3", status: "active", statusText: "\u30E1\u30A4\u30AF\u4E2D", character: "v0", xp: 90, level: 15 },
  { id: "genspark", name: "GenSpark", role: "\u8CC7\u6599", status: "active", statusText: "\u8A60\u5531\u4E2D", character: "genspark", xp: 55, level: 8 },
  { id: "antigravity", name: "Antigravity", role: "\u76F8\u8AC7", status: "idle", statusText: "\u6C34\u6676\u5360\u3044\u4E2D", character: "antigravity", xp: 42, level: 7 },
]

function XPBar({ value, max = 100 }: { value: number; max?: number }) {
  const percentage = (value / max) * 100
  return (
    <div className="w-full h-1.5 bg-[#1a1a1a] border border-[#333] mt-1">
      <div className="h-full bg-neon-cyan transition-all duration-500" style={{ width: `${percentage}%`, boxShadow: "0 0 4px #00f0ff" }} />
    </div>
  )
}

function AgentCard({ agent }: { agent: Agent }) {
  const statusColor = agent.status === "active" ? "text-neon-green" : agent.status === "error" ? "text-neon-pink" : "text-neon-cyan"
  return (
    <div className="p-3 border border-[#1f1f1f] bg-[#0d0d0d] hover:bg-[#111] transition-colors group">
      <div className="flex items-start gap-3">
        <div className={`${agent.status === "idle" ? "opacity-60" : ""} transition-opacity`}>
          <PixelAvatar character={agent.character} status={agent.status} size={40} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-neon-pink truncate">{agent.name}</span>
            <span className="text-[7px] text-[#555]">{"Lv."}{agent.level}</span>
          </div>
          <span className="text-[7px] text-[#666] block">{"["}{agent.role}{"]"}</span>
          <div className="flex items-center gap-1 mt-1">
            <div className={`w-1.5 h-1.5 rounded-full ${agent.status === "active" ? "bg-neon-green" : agent.status === "error" ? "bg-neon-pink" : "bg-neon-cyan opacity-50"}`} />
            <span className={`text-[7px] ${statusColor}`}>{agent.statusText}</span>
          </div>
          <XPBar value={agent.xp} />
        </div>
      </div>
    </div>
  )
}

export function AgentSidebar() {
  return (
    <aside className="w-56 border-r-2 neon-border-cyan bg-[#080808] flex flex-col">
      <div className="p-3 border-b border-[#1a1a1a]">
        <h2 className="text-[9px] neon-text-cyan text-center tracking-widest">{"THE 5 SISTERS"}</h2>
        <p className="text-[6px] text-center text-[#555] mt-1">{"// \u30A8\u30FC\u30B8\u30A7\u30F3\u30C8\u4E00\u89A7"}</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-1 p-2">
          {agents.map((agent) => (<AgentCard key={agent.id} agent={agent} />))}
        </div>
      </div>
      <div className="p-2 border-t border-[#1a1a1a]">
        <div className="flex items-center justify-between text-[7px] text-[#555]">
          <span>{"\u7A3C\u50CD\u4E2D: 3/5"}</span>
          <span className="text-neon-green">{"SYNC OK"}</span>
        </div>
      </div>
    </aside>
  )
}
