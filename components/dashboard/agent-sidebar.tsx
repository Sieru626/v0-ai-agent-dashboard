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
  {
    id: "notebooklm",
    name: "NotebookLM",
    role: "司令塔",
    status: "active",
    statusText: "仕様チェック中...",
    character: "notebooklm",
    xp: 78,
    level: 12,
  },
  {
    id: "cursor",
    name: "Cursor",
    role: "実装",
    status: "idle",
    statusText: "待機中（居眠り）",
    character: "cursor",
    xp: 65,
    level: 10,
  },
  {
    id: "v0",
    name: "v0",
    role: "デザイン",
    status: "active",
    statusText: "メイク中",
    character: "v0",
    xp: 90,
    level: 15,
  },
  {
    id: "genspark",
    name: "GenSpark",
    role: "資料",
    status: "active",
    statusText: "詠唱中",
    character: "genspark",
    xp: 55,
    level: 8,
  },
  {
    id: "antigravity",
    name: "Antigravity",
    role: "相談",
    status: "idle",
    statusText: "水晶占い中",
    character: "antigravity",
    xp: 42,
    level: 7,
  },
]

function XPBar({ value, max = 100 }: { value: number; max?: number }) {
  const percentage = (value / max) * 100
  return (
    <div className="w-full h-1.5 bg-[#1a1a1a] border border-[#333] mt-1">
      <div
        className="h-full bg-neon-cyan transition-all duration-500"
        style={{
          width: `${percentage}%`,
          boxShadow: "0 0 4px #00f0ff",
        }}
      />
    </div>
  )
}

function AgentCard({ agent }: { agent: Agent }) {
  const statusColor =
    agent.status === "active"
      ? "text-neon-green"
      : agent.status === "error"
        ? "text-neon-pink"
        : "text-neon-cyan"

  return (
    <div className="p-3 border border-[#1f1f1f] bg-[#0d0d0d] hover:bg-[#111] transition-colors group">
      <div className="flex items-start gap-3">
        <div className={`${agent.status === "idle" ? "opacity-60" : ""} transition-opacity`}>
          <PixelAvatar character={agent.character} status={agent.status} size={40} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-neon-pink truncate">
              {agent.name}
            </span>
            <span className="text-[7px] text-[#555]">
              {'Lv.'}{agent.level}
            </span>
          </div>
          <span className="text-[7px] text-[#666] block">
            {'['}{agent.role}{']'}
          </span>
          <div className="flex items-center gap-1 mt-1">
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                agent.status === "active"
                  ? "bg-neon-green"
                  : agent.status === "error"
                    ? "bg-neon-pink"
                    : "bg-neon-cyan opacity-50"
              }`}
            />
            <span className={`text-[7px] ${statusColor}`}>
              {agent.statusText}
            </span>
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
        <h2 className="text-[9px] neon-text-cyan text-center tracking-widest">
          {'THE 5 SISTERS'}
        </h2>
        <p className="text-[6px] text-center text-[#555] mt-1">
          {'// AGENT ROSTER'}
        </p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-1 p-2">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
      <div className="p-2 border-t border-[#1a1a1a]">
        <div className="flex items-center justify-between text-[7px] text-[#555]">
          <span>{'ACTIVE: 3/5'}</span>
          <span className="text-neon-green">{'SYNC OK'}</span>
        </div>
      </div>
    </aside>
  )
}
