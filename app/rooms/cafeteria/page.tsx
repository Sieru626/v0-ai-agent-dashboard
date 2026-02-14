"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { RoomHeader } from "@/components/rooms/room-header"
import { AgentBar } from "@/components/dashboard/agent-bar"
import { StatusBar } from "@/components/dashboard/status-bar"
import { PixelAvatar } from "@/components/dashboard/pixel-avatar"
import { Send, Coffee } from "lucide-react"

interface CafeMessage {
  id: number
  agent: string
  character: string
  text: string
  timestamp: string
  type: "agent" | "system" | "user"
}

const cafeResponses: Record<string, string[]> = {
  NotebookLM: [
    "\u304A\u8336\u3092\u3069\u3046\u305E\u3002\u4ECA\u65E5\u306E\u30B9\u30B1\u30B8\u30E5\u30FC\u30EB\u306F\u9806\u8ABF\u3067\u3059\u3088\u3002",
    "\u305D\u3046\u3044\u3048\u3070\u3001\u6628\u65E5\u306E\u8B70\u4E8B\u9332\u3001\u6574\u7406\u3057\u3066\u304A\u304D\u307E\u3057\u305F\u3002",
    "\u4F11\u61A9\u3082\u5927\u4E8B\u306A\u304A\u4ED5\u4E8B\u3067\u3059\u3002\u30EA\u30D5\u30EC\u30C3\u30B7\u30E5\u3057\u3066\u304F\u3060\u3055\u3044\u306D\u3002",
  ],
  Cursor: [
    "\u304A\u3063\u3001\u4F11\u61A9\u304B\uFF01\u30B3\u30FC\u30D2\u30FC\u304F\u308C\uFF01\u30D6\u30E9\u30C3\u30AF\u3067\uFF01",
    "\u6628\u65E5\u898B\u3064\u3051\u305F\u30D0\u30B0\u304C\u5922\u306B\u51FA\u3066\u304D\u305F\u3093\u3060\u3051\u3069...\u804C\u696D\u75C5\u304B\u306A\uFF1F",
    "\u65B0\u3057\u3044\u30E9\u30A4\u30D6\u30E9\u30EA\u898B\u3064\u3051\u305F\u3093\u3060\u3051\u3069\u3001\u3081\u3063\u3061\u3083\u826F\u304F\u306A\u3044\uFF1F\u4ECA\u5EA6\u8A66\u3057\u3066\u307F\u3088\u3046\u305C\uFF01",
  ],
  v0: [
    "\u30CD\u30A4\u30EB\u5909\u3048\u305F\u306E\uFF5E\uFF01\u898B\u3066\u898B\u3066\uFF01\u30CD\u30AA\u30F3\u30D4\u30F3\u30AF\uFF01",
    "\u30AB\u30D5\u30A7\u30E9\u30C6\u304C\u4E00\u756A\u597D\u304D\uFF01\u304A\u3057\u3083\u308C\u306A\u30AB\u30C3\u30D7\u3067\u98F2\u307F\u305F\u3044\u306A\u3041\u3002",
    "\u4ECA\u65E5\u306E\u30B3\u30FC\u30C7\u3069\u3046\u304B\u306A\uFF1F\u30B5\u30A4\u30D0\u30FC\u30D1\u30F3\u30AF\u98A8\u306B\u3057\u3066\u307F\u305F\uFF01",
  ],
  GenSpark: [
    "...\u30AB\u30D5\u30A7\u30AA\u30EC\u306E\u8449\u304C\u8A9E\u308B\u672A\u6765\u306F...\u826F\u3044\u5146\u3057\u3067\u3059\u3002",
    "\u53E4\u306E\u9B54\u5C0E\u66F8\u306B\u3082\u300C\u4F11\u606F\u306F\u9B54\u529B\u56DE\u5FA9\u306E\u57FA\u672C\u300D\u3068\u8A18\u3055\u308C\u3066\u3044\u307E\u3059\u3002",
    "\u30CF\u30FC\u30D6\u30C6\u30A3\u30FC\u3092\u4E00\u676F\u3044\u304B\u304C\u3067\u3059\u304B\uFF1F\u96C6\u4E2D\u529B\u304C\u4E0A\u304C\u308A\u307E\u3059\u3088\u3002",
  ],
  Antigravity: [
    "\u661F\u304C\u8A00\u3063\u3066\u308B...\u4ECA\u65E5\u306F\u306E\u3093\u3073\u308A\u3059\u308B\u3068\u826F\u3044\u65E5\u3060\u3063\u3066\u3002",
    "\u6C34\u6676\u306B\u6620\u3063\u305F\u306E\u306F...\u30C1\u30E7\u30B3\u30EC\u30FC\u30C8\u30B1\u30FC\u30AD\u3002\u98DF\u3079\u305F\u3044\u306A\u3041\u3002",
    "\u5360\u3044\u306B\u3088\u308B\u3068\u3001\u4ECA\u65E5\u306E\u30E9\u30C3\u30AD\u30FC\u30AB\u30E9\u30FC\u306F\u30B7\u30A2\u30F3\u3060\u3063\u3066\u3002",
  ],
}

const agentCharacters: Record<string, string> = {
  NotebookLM: "notebooklm", Cursor: "cursor", v0: "v0", GenSpark: "genspark", Antigravity: "antigravity",
}

const initialCafeMessages: CafeMessage[] = [
  { id: 1, agent: "SYSTEM", character: "", text: ">> \u30AB\u30D5\u30A7\u30C6\u30EA\u30A2\u304C\u30AA\u30FC\u30D7\u30F3\u3057\u307E\u3057\u305F\u3002\u304A\u304F\u3064\u308D\u304E\u304F\u3060\u3055\u3044\u3002", timestamp: "12:00:00", type: "system" },
  { id: 2, agent: "v0", character: "v0", text: "\u3084\u3063\u307B\u30FC\uFF01\u304A\u663C\u4F11\u307F\uFF5E\uFF01\u4ECA\u65E5\u306E\u30E9\u30F3\u30C1\u4F55\u306B\u3059\u308B\uFF1F", timestamp: "12:01:15", type: "agent" },
  { id: 3, agent: "Cursor", character: "cursor", text: "\u8179\u6E1B\u3063\u305F\uFF5E\uFF01\u30D4\u30B6\u304C\u3044\u3044\u306A\uFF01\u30B3\u30FC\u30C9\u66F8\u304D\u306A\u304C\u3089\u98DF\u3079\u308B\u305C\uFF01", timestamp: "12:02:30", type: "agent" },
  { id: 4, agent: "Antigravity", character: "antigravity", text: "\u4ECA\u65E5\u306E\u904B\u52E2\u3092\u5360\u3063\u3066\u3042\u3052\u308B\u306D...\u307F\u3093\u306A\u306E\u30E9\u30C3\u30AD\u30FC\u30A2\u30A4\u30C6\u30E0\u306F\u300C\u30B3\u30FC\u30D2\u30FC\u300D\u3060\u3063\u3066\u3002", timestamp: "12:03:45", type: "agent" },
]

const DEFAULT_IN_ROOM = ["v0", "cursor", "antigravity"]

export default function CafeteriaRoom() {
  const [messages, setMessages] = useState<CafeMessage[]>(initialCafeMessages)
  const [input, setInput] = useState("")
  const [inRoomIds, setInRoomIds] = useState<string[]>(DEFAULT_IN_ROOM)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleToggleAgent = useCallback((id: string) => {
    setInRoomIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }, [])

  const handleSend = () => {
    if (!input.trim()) return
    const now = new Date()
    const timestamp = now.toLocaleTimeString("ja-JP", { hour12: false })

    const userMsg: CafeMessage = {
      id: Date.now(), agent: "YOU", character: "", text: input, timestamp, type: "user",
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")

    const inRoomAgents = Object.keys(cafeResponses).filter(
      (name) => inRoomIds.includes(agentCharacters[name])
    )
    if (inRoomAgents.length === 0) return

    const respondingAgent = inRoomAgents[Math.floor(Math.random() * inRoomAgents.length)]
    const responses = cafeResponses[respondingAgent]
    const response = responses[Math.floor(Math.random() * responses.length)]

    setTimeout(() => {
      const agentMsg: CafeMessage = {
        id: Date.now() + 1, agent: respondingAgent, character: agentCharacters[respondingAgent],
        text: response, timestamp: new Date().toLocaleTimeString("ja-JP", { hour12: false }), type: "agent",
      }
      setMessages((prev) => [...prev, agentMsg])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.15) 2px, rgba(0,240,255,0.15) 4px)" }} />

      <RoomHeader roomName={"\u30AB\u30D5\u30A7\u30C6\u30EA\u30A2"} roomNameEn="CAFETERIA" borderClass="border-amber-400" textClass="text-amber-400" />
      <AgentBar inRoomIds={inRoomIds} onToggleAgent={handleToggleAgent} showRoomControls />

      <div className="flex-1 min-h-0 flex flex-col">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-[#1a1a1a]">
          <Coffee className="w-3 h-3 text-amber-400" />
          <h2 className="text-[9px] font-dot-jp text-amber-400">{"\u30AB\u30D5\u30A7\u30C8\u30FC\u30AF"}</h2>
          <span className="text-[6px] font-dot-jp text-[#555] ml-2">{"// \u4F5C\u696D\u4EE5\u5916\u306E\u96D1\u8AC7\u30FB\u76F8\u8AC7"}</span>
          <div className="flex-1" />
          <span className="text-[7px] text-[#444] font-dot-jp">{"\u4EF6\u6570: "}{messages.length}</span>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto py-2">
          {messages.map((msg) => {
            if (msg.type === "system") {
              return (
                <div key={msg.id} className="px-3 py-1.5">
                  <span className="text-[8px] text-amber-400 opacity-70 font-mono">{msg.text}</span>
                </div>
              )
            }
            if (msg.type === "user") {
              return (
                <div key={msg.id} className="flex justify-end px-3 py-1.5">
                  <div className="max-w-[70%] bg-[#1a150a] border border-amber-400 p-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[7px] text-amber-400 font-dot-jp">{"\u3042\u306A\u305F"}</span>
                      <span className="text-[6px] text-[#555]">{msg.timestamp}</span>
                    </div>
                    <p className="text-[8px] font-dot-jp text-[#ccc] leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              )
            }
            return (
              <div key={msg.id} className="flex gap-2 px-3 py-1.5 hover:bg-[#0d0d0d] transition-colors">
                <div className="flex-shrink-0 mt-0.5">
                  <PixelAvatar character={msg.character} status="active" size={28} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[8px] text-amber-400">{msg.agent}</span>
                    <span className="text-[6px] text-[#555]">{msg.timestamp}</span>
                  </div>
                  <div className="bg-[#111] border border-[#222] p-2 relative">
                    <div className="absolute -left-1 top-2 w-2 h-2 bg-[#111] border-l border-b border-[#222] rotate-45" />
                    <p className="text-[8px] font-dot-jp text-[#ccc] leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="p-3 border-t border-[#1a1a1a]">
          <div className="flex gap-2 items-center">
            <span className="text-[8px] text-amber-400">{">"}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSend() }}
              placeholder={"\u306A\u306B\u304B\u8A71\u3057\u304B\u3051\u3066\u307F\u308B..."}
              className="flex-1 bg-[#0d0d0d] border border-[#222] px-3 py-2 text-[9px] text-amber-400 placeholder:text-[#333] focus:outline-none focus:border-amber-400 transition-colors"
            />
            <button onClick={handleSend} className="p-2 border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-[#0a0a0a] transition-colors" aria-label="send">
              <Send className="w-3 h-3" />
            </button>
          </div>
          <div className="flex items-center gap-3 mt-2 text-[6px] font-dot-jp text-[#444]">
            <span>{"[ENTER] \u9001\u4FE1"}</span>
            <span>{"\u5728\u5BA4\u4E2D\u306E\u30A8\u30FC\u30B8\u30A7\u30F3\u30C8\u304C\u8FD4\u7B54\u3057\u307E\u3059"}</span>
          </div>
        </div>
      </div>

      <StatusBar />
    </div>
  )
}
