"use client"

import { useState, useRef, useEffect } from "react"
import { Send, MessageSquare, ChevronDown, ChevronUp } from "lucide-react"
import { PixelAvatar } from "./pixel-avatar"

interface RoomChatMessage {
  id: number
  agent: string
  character: string
  text: string
  timestamp: string
  type: "agent" | "user"
}

const agentCharacters: Record<string, string> = {
  NotebookLM: "notebooklm", Cursor: "cursor", v0: "v0", GenSpark: "genspark", Antigravity: "antigravity",
}

interface RoomChatProps {
  inRoomIds: string[]
  agentResponses: Record<string, string[]>
  initialMessages?: RoomChatMessage[]
  accentColor?: string
  borderColor?: string
}

export function RoomChat({ inRoomIds, agentResponses, initialMessages = [], accentColor = "text-neon-cyan", borderColor = "border-neon-cyan" }: RoomChatProps) {
  const [messages, setMessages] = useState<RoomChatMessage[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    const timestamp = new Date().toLocaleTimeString("ja-JP", { hour12: false })

    const userMsg: RoomChatMessage = {
      id: Date.now(), agent: "YOU", character: "", text: input, timestamp, type: "user",
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")

    const inRoomAgents = Object.keys(agentResponses).filter(
      (name) => inRoomIds.includes(agentCharacters[name])
    )
    if (inRoomAgents.length === 0) return

    const respondingAgent = inRoomAgents[Math.floor(Math.random() * inRoomAgents.length)]
    const responses = agentResponses[respondingAgent]
    const response = responses[Math.floor(Math.random() * responses.length)]

    setTimeout(() => {
      const agentMsg: RoomChatMessage = {
        id: Date.now() + 1, agent: respondingAgent, character: agentCharacters[respondingAgent],
        text: response, timestamp: new Date().toLocaleTimeString("ja-JP", { hour12: false }), type: "agent",
      }
      setMessages((prev) => [...prev, agentMsg])
    }, 1000)
  }

  const unreadCount = messages.filter((m) => m.type === "agent").length

  return (
    <div className={`border-t ${borderColor} bg-[#060606] flex flex-col transition-all ${isOpen ? "h-64" : "h-8"}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between px-3 py-1.5 hover:bg-[#0d0d0d] transition-colors flex-shrink-0`}
      >
        <div className="flex items-center gap-2">
          <MessageSquare className={`w-3 h-3 ${accentColor}`} />
          <span className={`text-[8px] font-dot-jp ${accentColor}`}>{"\u30C1\u30E3\u30C3\u30C8"}</span>
          {!isOpen && messages.length > 0 && (
            <span className="text-[7px] text-[#555]">{messages.length}{"\u4EF6"}</span>
          )}
        </div>
        {isOpen ? <ChevronDown className="w-3 h-3 text-[#555]" /> : <ChevronUp className="w-3 h-3 text-[#555]" />}
      </button>

      {isOpen && (
        <>
          <div ref={scrollRef} className="flex-1 overflow-y-auto py-1 min-h-0">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <span className="text-[7px] font-dot-jp text-[#444]">{"\u30E1\u30C3\u30BB\u30FC\u30B8\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044"}</span>
              </div>
            )}
            {messages.map((msg) => {
              if (msg.type === "user") {
                return (
                  <div key={msg.id} className="flex justify-end px-2 py-0.5">
                    <div className={`max-w-[60%] ${borderColor} border bg-[#0d0d0d] px-2 py-1`}>
                      <p className="text-[7px] font-dot-jp text-[#ccc]">{msg.text}</p>
                    </div>
                  </div>
                )
              }
              return (
                <div key={msg.id} className="flex gap-1.5 px-2 py-0.5">
                  <PixelAvatar character={msg.character} status="active" size={18} />
                  <div className="flex-1 min-w-0">
                    <span className={`text-[6px] ${accentColor}`}>{msg.agent}</span>
                    <p className="text-[7px] font-dot-jp text-[#ccc] leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex gap-1.5 items-center px-2 py-1.5 border-t border-[#1a1a1a] flex-shrink-0">
            <span className={`text-[7px] ${accentColor}`}>{">"}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSend() }}
              placeholder={"\u8A71\u3057\u304B\u3051\u308B..."}
              className={`flex-1 bg-[#0a0a0a] border border-[#222] px-2 py-1 text-[8px] ${accentColor} placeholder:text-[#333] focus:outline-none focus:${borderColor} transition-colors`}
            />
            <button onClick={handleSend} className={`p-1 border ${borderColor} ${accentColor} hover:bg-[#111] transition-colors`}>
              <Send className="w-2.5 h-2.5" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
