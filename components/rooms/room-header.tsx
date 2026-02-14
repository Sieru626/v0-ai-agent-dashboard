"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft, Zap } from "lucide-react"

interface RoomHeaderProps {
  roomName: string
  roomNameEn: string
  borderClass?: string
  textClass?: string
}

export function RoomHeader({ roomName, roomNameEn, borderClass = "neon-border-pink", textClass = "text-neon-pink" }: RoomHeaderProps) {
  const router = useRouter()
  return (
    <header className={`flex items-center justify-between px-4 py-2 border-b-2 ${borderClass} bg-[#0a0a0a]`}>
      <div className="flex items-center gap-4">
        <button onClick={() => router.push("/lobby")} className="flex items-center gap-1 px-2 py-1 border border-[#333] text-[9px] text-neon-cyan hover:border-neon-cyan hover:bg-[#0a1520] transition-colors">
          <ChevronLeft className="w-3 h-3" />
          <span>{"LOBBY"}</span>
        </button>
        <div className="w-px h-5 bg-[#222]" />
        <div className="flex items-center gap-2">
          <Zap className={`w-3.5 h-3.5 ${textClass} animate-pulse-glow`} />
          <h1 className={`text-[10px] ${textClass} tracking-wider`}>{roomNameEn}</h1>
          <span className="text-[9px] text-[#888]">{roomName}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 text-[7px]">
        <span className="text-neon-green">{"ONLINE"}</span>
        <span className="text-[#555]">{"\u6210\u7ACB\u305F\u305B\u5C4B\u672C\u8217"}</span>
      </div>
    </header>
  )
}
