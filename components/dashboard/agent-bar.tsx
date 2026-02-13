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
  { id: "notebooklm", name: "NotebookLM", role: "\u53F8\u4EE4\u5854", status: "active", statusText: "\u4ED5\u69D8\u30C1\u30A7\u30C3\u30AF\u4E2D", character: "notebooklm", level: 12 },
  { id: "cursor", name: "Cursor", role: "\u5B9F\u88C5", status: "idle", statusText: "\u5F85\u6A5F\u4E2D", character: "cursor", level: 10 },
  { id: "v0", name: "v0", role: "\u30C7\u30B6\u30A4\u30F3", status: "active", statusText: "\u30E1\u30A4\u30AF\u4E2D", character: "v0", level: 15 },
  { id: "genspark", name: "GenSpark", role: "\u8CC7\u6599", status: "active", statusText: "\u8A60\u5531\u4E2D", character: "genspark", level: 8 },
  { id: "antigravity", name: "Antigravity", role: "\u76F8\u8AC7", status: "idle", statusText: "\u6C34\u6676\u5360\u3044\u4E2D", character: "antigravity", level: 7 },
]

export function AgentBar() {
  return (
    <div className="flex items-center gap-3 px-4 py-1.5 border-b border-[#1a1a1a] bg-[#060606] overflow-x-auto">
      <span className="text-[7px] neon-text-cyan flex-shrink-0">{"THE 5 SISTERS"}</span>
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
                <span className="text-[6px] text-[#555]">{"Lv."}{agent.level}</span>
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
      <span className="text-[7px] text-[#555] flex-shrink-0">{"\u7A3C\u50CD\u4E2D: 3/5"}</span>
      <span className="text-[7px] text-neon-green flex-shrink-0">{"SYNC OK"}</span>
    </div>
  )
}
