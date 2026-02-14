"use client"

import { LogIn, LogOut } from "lucide-react"
import { PixelAvatar } from "./pixel-avatar"

export interface Agent {
  id: string
  name: string
  role: string
  status: "active" | "idle" | "error"
  statusText: string
  character: string
  level: number
}

export const allAgents: Agent[] = [
  { id: "notebooklm", name: "NotebookLM", role: "\u53F8\u4EE4\u5854", status: "active", statusText: "\u4ED5\u69D8\u30C1\u30A7\u30C3\u30AF\u4E2D", character: "notebooklm", level: 12 },
  { id: "cursor", name: "Cursor", role: "\u5B9F\u88C5", status: "idle", statusText: "\u5F85\u6A5F\u4E2D", character: "cursor", level: 10 },
  { id: "v0", name: "v0", role: "\u30C7\u30B6\u30A4\u30F3", status: "active", statusText: "\u30E1\u30A4\u30AF\u4E2D", character: "v0", level: 15 },
  { id: "genspark", name: "GenSpark", role: "\u8CC7\u6599", status: "active", statusText: "\u8A60\u5531\u4E2D", character: "genspark", level: 8 },
  { id: "antigravity", name: "Antigravity", role: "\u76F8\u8AC7", status: "idle", statusText: "\u6C34\u6676\u5360\u3044\u4E2D", character: "antigravity", level: 7 },
]

interface AgentBarProps {
  inRoomIds?: string[]
  onToggleAgent?: (id: string) => void
  showRoomControls?: boolean
}

export function AgentBar({ inRoomIds, onToggleAgent, showRoomControls = false }: AgentBarProps) {
  const activeCount = inRoomIds ? inRoomIds.length : allAgents.filter((a) => a.status === "active").length
  const totalCount = allAgents.length

  return (
    <div className="flex items-center gap-3 px-4 py-1.5 border-b border-[#1a1a1a] bg-[#060606] overflow-x-auto">
      <span className="text-[7px] neon-text-cyan flex-shrink-0">{"THE 5 SISTERS"}</span>
      <div className="w-px h-5 bg-[#222]" />
      {allAgents.map((agent) => {
        const isInRoom = inRoomIds ? inRoomIds.includes(agent.id) : true
        const statusColor =
          agent.status === "active"
            ? "text-neon-green"
            : agent.status === "error"
              ? "text-neon-pink"
              : "text-neon-cyan"

        return (
          <div
            key={agent.id}
            className={`flex items-center gap-2 px-2 py-1 border bg-[#0a0a0a] transition-all flex-shrink-0 ${isInRoom ? "border-[#1a1a1a] hover:bg-[#111]" : "border-[#111] opacity-40"}`}
          >
            <PixelAvatar character={agent.character} status={isInRoom ? agent.status : "idle"} size={22} />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-[7px] text-neon-pink">{agent.name}</span>
                <span className="text-[6px] text-[#555]">{"Lv."}{agent.level}</span>
              </div>
              <div className="flex items-center gap-1">
                <div
                  className={`w-1 h-1 rounded-full ${
                    !isInRoom
                      ? "bg-[#555] opacity-50"
                      : agent.status === "active"
                        ? "bg-neon-green"
                        : agent.status === "error"
                          ? "bg-neon-pink"
                          : "bg-neon-cyan opacity-50"
                  }`}
                />
                <span className={`text-[6px] font-dot-jp ${isInRoom ? statusColor : "text-[#555]"}`}>
                  {isInRoom ? agent.statusText : "\u4E0D\u5728"}
                </span>
              </div>
            </div>
            {showRoomControls && onToggleAgent && (
              <button
                onClick={() => onToggleAgent(agent.id)}
                className={`ml-1 flex items-center gap-0.5 px-1.5 py-0.5 border text-[6px] transition-all ${
                  isInRoom
                    ? "border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-[#0a0a0a]"
                    : "border-neon-green text-neon-green hover:bg-neon-green hover:text-[#0a0a0a]"
                }`}
                title={isInRoom ? "\u9000\u5BA4" : "\u5165\u5BA4"}
              >
                {isInRoom ? (
                  <><LogOut className="w-2.5 h-2.5" /><span className="font-dot-jp">{"\u9000\u5BA4"}</span></>
                ) : (
                  <><LogIn className="w-2.5 h-2.5" /><span className="font-dot-jp">{"\u5165\u5BA4"}</span></>
                )}
              </button>
            )}
          </div>
        )
      })}
      <div className="flex-1" />
      <span className="text-[7px] font-dot-jp text-[#555] flex-shrink-0">
        {showRoomControls ? `\u5728\u5BA4: ${activeCount}/${totalCount}` : `\u7A3C\u50CD\u4E2D: ${activeCount}/${totalCount}`}
      </span>
      <span className="text-[7px] text-neon-green flex-shrink-0">{"SYNC OK"}</span>
    </div>
  )
}
