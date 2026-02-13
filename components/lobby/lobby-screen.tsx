"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Zap, MessageSquare, Wrench, BookOpen } from "lucide-react"
import { PixelAvatar } from "@/components/dashboard/pixel-avatar"

interface RoomConfig {
  id: string
  name: string
  nameEn: string
  description: string
  href: string
  image: string
  icon: typeof MessageSquare
  borderClass: string
  textClass: string
  neonClass: string
  glowColor: string
  agents: { character: string; name: string }[]
}

const rooms: RoomConfig[] = [
  {
    id: "conference", name: "\u4F1A\u8B70\u5BA4", nameEn: "CONFERENCE ROOM",
    description: "AI\u305F\u3061\u3068\u306E\u30C1\u30E3\u30C3\u30C8\u30EB\u30FC\u30E0",
    href: "/rooms/conference", image: "/rooms/conference.jpg", icon: MessageSquare,
    borderClass: "neon-border-pink", textClass: "text-neon-pink", neonClass: "neon-text-pink",
    glowColor: "rgba(255,45,120,0.2)",
    agents: [{ character: "v0", name: "v0" }, { character: "notebooklm", name: "NotebookLM" }],
  },
  {
    id: "factory", name: "\u5DE5\u623F", nameEn: "FACTORY",
    description: "\u30D7\u30EC\u30D3\u30E5\u30FC\u753B\u9762\u4ED8\u304D\u306E\u4F5C\u696D\u5834",
    href: "/rooms/factory", image: "/rooms/factory.jpg", icon: Wrench,
    borderClass: "neon-border-cyan", textClass: "text-neon-cyan", neonClass: "neon-text-cyan",
    glowColor: "rgba(0,240,255,0.2)",
    agents: [{ character: "cursor", name: "Cursor" }, { character: "v0", name: "v0" }],
  },
  {
    id: "archives", name: "\u8CC7\u6599\u5EAB", nameEn: "ARCHIVES",
    description: "\u5730\u56F3\u3084\u8CC7\u6599\u306E\u4FDD\u7BA1\u5EAB",
    href: "/rooms/archives", image: "/rooms/archives.jpg", icon: BookOpen,
    borderClass: "neon-border-green", textClass: "text-neon-green", neonClass: "neon-text-green",
    glowColor: "rgba(57,255,20,0.2)",
    agents: [{ character: "genspark", name: "GenSpark" }, { character: "antigravity", name: "Antigravity" }],
  },
]

function RoomButton({ room, index }: { room: RoomConfig; index: number }) {
  const [hovered, setHovered] = useState(false)
  const router = useRouter()
  const Icon = room.icon

  return (
    <button
      onClick={() => router.push(room.href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex flex-col items-center gap-4 p-6 border-2 bg-[#0a0a0a] transition-all duration-300 cursor-pointer group animate-fade-up ${room.borderClass} ${hovered ? "scale-[1.03] -translate-y-1" : ""}`}
      style={{ animationDelay: `${0.3 + index * 0.15}s`, animationFillMode: "both", boxShadow: hovered ? `0 0 30px ${room.glowColor}, 0 0 60px ${room.glowColor}, inset 0 0 20px ${room.glowColor}` : `0 0 10px ${room.glowColor}` }}
    >
      <div className={`relative border ${room.borderClass} overflow-hidden`}>
        <Image src={room.image} alt={room.name} width={140} height={140} className="block transition-transform duration-300 group-hover:scale-110" style={{ imageRendering: "pixelated" }} unoptimized />
        {hovered && <div className="absolute inset-0 opacity-20" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.3) 2px, rgba(0,240,255,0.3) 3px)" }} />}
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-2">
          <Icon className={`w-3.5 h-3.5 ${room.textClass}`} />
          <span className={`text-[10px] ${room.neonClass} tracking-wider`}>{room.nameEn}</span>
        </div>
        <span className={`text-xs ${room.textClass}`}>{room.name}</span>
        <span className="text-[7px] text-[#666]">{room.description}</span>
      </div>
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-2 transition-all duration-300" style={{ opacity: hovered ? 1 : 0, transform: `translateX(-50%) translateY(${hovered ? "0" : "16px"})` }}>
        {room.agents.map((agent) => (<div key={agent.character} className="animate-pop-in"><PixelAvatar character={agent.character} status="active" size={32} /></div>))}
      </div>
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${hovered ? "bg-neon-pink" : "bg-[#222]"} transition-colors`} />
    </button>
  )
}

export function LobbyScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0a0a0a] relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.15) 2px, rgba(0,240,255,0.15) 4px)" }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(0,240,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="flex flex-col items-center gap-2 mb-12 animate-fade-up">
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-neon-pink animate-pulse-glow" />
          <div className="flex flex-col items-center gap-0.5">
            <h1 className="text-base neon-text-pink tracking-[0.15em] animate-flicker" style={{ textShadow: "0 0 10px #ff2d78, 0 0 30px #ff2d78, 0 0 60px #ff2d78" }}>{"\u6210\u7ACB\u305F\u305B\u5C4B\u672C\u8217"}</h1>
            <span className="text-[6px] text-neon-cyan tracking-[0.4em] opacity-60">{"NARITATASE-YA"}</span>
          </div>
          <Zap className="w-5 h-5 text-neon-pink animate-pulse-glow" />
        </div>
        <p className="text-[8px] text-neon-cyan opacity-50 tracking-[0.2em]">{"// CENTRAL HUB // \u90E8\u5C4B\u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044"}</p>
      </div>

      <div className="flex gap-8 items-start pb-16">
        {rooms.map((room, idx) => (<RoomButton key={room.id} room={room} index={idx} />))}
      </div>

      <div className="absolute bottom-6 flex items-center gap-6 text-[7px] text-[#444]">
        <span>{"SEC: OK"}</span>
        <span>{"NET: 100%"}</span>
        <span className="text-neon-green">{"ONLINE"}</span>
        <span>{"THE 5 SISTERS"}</span>
      </div>
    </div>
  )
}
