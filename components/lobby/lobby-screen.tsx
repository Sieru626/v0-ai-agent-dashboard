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
    id: "conference",
    name: "会議室",
    nameEn: "CONFERENCE ROOM",
    description: "AIたちとのチャットルーム",
    href: "/rooms/conference",
    image: "/rooms/conference.jpg",
    icon: MessageSquare,
    borderClass: "neon-border-pink",
    textClass: "text-neon-pink",
    neonClass: "neon-text-pink",
    glowColor: "rgba(255,45,120,0.2)",
    agents: [
      { character: "v0", name: "v0" },
      { character: "notebooklm", name: "NotebookLM" },
    ],
  },
  {
    id: "factory",
    name: "工房",
    nameEn: "FACTORY",
    description: "プレビュー画面付きの作業場",
    href: "/rooms/factory",
    image: "/rooms/factory.jpg",
    icon: Wrench,
    borderClass: "neon-border-cyan",
    textClass: "text-neon-cyan",
    neonClass: "neon-text-cyan",
    glowColor: "rgba(0,240,255,0.2)",
    agents: [
      { character: "cursor", name: "Cursor" },
      { character: "v0", name: "v0" },
    ],
  },
  {
    id: "archives",
    name: "資料庫",
    nameEn: "ARCHIVES",
    description: "地図や資料の保管庫",
    href: "/rooms/archives",
    image: "/rooms/archives.jpg",
    icon: BookOpen,
    borderClass: "neon-border-green",
    textClass: "text-neon-green",
    neonClass: "neon-text-green",
    glowColor: "rgba(57,255,20,0.2)",
    agents: [
      { character: "genspark", name: "GenSpark" },
      { character: "antigravity", name: "Antigravity" },
    ],
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
      className={`relative flex flex-col items-center gap-4 p-6 border-2 bg-[#0a0a0a] transition-all duration-300 cursor-pointer group animate-fade-up ${room.borderClass} ${
        hovered ? "scale-[1.03] -translate-y-1" : ""
      }`}
      style={{
        animationDelay: `${0.3 + index * 0.15}s`,
        animationFillMode: "both",
        boxShadow: hovered
          ? `0 0 30px ${room.glowColor}, 0 0 60px ${room.glowColor}, inset 0 0 20px ${room.glowColor}`
          : `0 0 10px ${room.glowColor}`,
      }}
    >
      {/* Room image */}
      <div className={`relative border ${room.borderClass} overflow-hidden`}>
        <Image
          src={room.image}
          alt={room.name}
          width={140}
          height={140}
          className="block transition-transform duration-300 group-hover:scale-110"
          style={{ imageRendering: "pixelated" }}
          unoptimized
        />
        {/* Scan overlay on hover */}
        {hovered && (
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.3) 2px, rgba(0,240,255,0.3) 3px)",
            }}
          />
        )}
      </div>

      {/* Room info */}
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-2">
          <Icon className={`w-3.5 h-3.5 ${room.textClass}`} />
          <span className={`text-[10px] ${room.neonClass} tracking-wider`}>{room.nameEn}</span>
        </div>
        <span className={`text-xs ${room.textClass}`}>{room.name}</span>
        <span className="text-[7px] text-[#666]">{room.description}</span>
      </div>

      {/* Character peek-a-boo on hover */}
      <div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-2 transition-all duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          transform: `translateX(-50%) translateY(${hovered ? "0" : "16px"})`,
        }}
      >
        {room.agents.map((agent) => (
          <div
            key={agent.character}
            className="animate-pop-in"
          >
            <PixelAvatar character={agent.character} status="active" size={32} />
          </div>
        ))}
      </div>

      {/* Bottom label */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${hovered ? "bg-neon-pink" : "bg-[#222]"} transition-colors`} />
    </button>
  )
}

export function LobbyScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Scanline overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.15) 2px, rgba(0,240,255,0.15) 4px)",
        }}
      />

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,240,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Header */}
      <div className="flex flex-col items-center gap-2 mb-12 animate-fade-up">
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-neon-pink animate-pulse-glow" />
          <h1 className="text-sm neon-text-pink tracking-wider">
            {"なりたたせ屋本舗"}
          </h1>
          <Zap className="w-5 h-5 text-neon-pink animate-pulse-glow" />
        </div>
        <p className="text-[8px] text-neon-cyan opacity-50 tracking-[0.2em]">
          {"// CENTRAL HUB // 部屋を選んでください"}
        </p>
      </div>

      {/* Room buttons */}
      <div className="flex gap-8 items-start pb-16">
        {rooms.map((room, idx) => (
          <RoomButton key={room.id} room={room} index={idx} />
        ))}
      </div>

      {/* Bottom status */}
      <div className="absolute bottom-6 flex items-center gap-6 text-[7px] text-[#444]">
        <span>{"SEC: OK"}</span>
        <span>{"NET: 100%"}</span>
        <span className="text-neon-green">{"ONLINE"}</span>
        <span>{"THE 5 SISTERS"}</span>
      </div>
    </div>
  )
}
