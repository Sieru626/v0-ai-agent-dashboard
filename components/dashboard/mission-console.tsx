"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Terminal } from "lucide-react"
import { PixelAvatar } from "./pixel-avatar"

interface ChatMessage {
  id: number
  agent: string
  character: string
  status: "active" | "idle" | "error"
  text: string
  timestamp: string
  type: "agent" | "system" | "user"
}

const defaultMessages: ChatMessage[] = [
  {
    id: 1, agent: "SYSTEM", character: "", status: "active",
    text: ">> \u6307\u4EE4\u30B3\u30F3\u30BD\u30FC\u30EB v2.4 \u8D77\u52D5\u5B8C\u4E86\u3002\u5168\u30A8\u30FC\u30B8\u30A7\u30F3\u30C8\u63A5\u7D9A\u6E08\u307F\u3002",
    timestamp: "09:00:00", type: "system",
  },
  {
    id: 2, agent: "NotebookLM", character: "notebooklm", status: "active",
    text: "\u4ED5\u69D8\u66F8\u30BB\u30AF\u30B7\u30E7\u30F33.2\u3092\u78BA\u8A8D\u3057\u307E\u3057\u305F\u3002\u5168\u9805\u76EE\u30AF\u30EA\u30A2\u3067\u3059\u3002\u6B21\u306E\u30D5\u30A7\u30FC\u30BA\u306B\u9032\u884C\u3067\u304D\u307E\u3059\u3002",
    timestamp: "09:01:23", type: "agent",
  },
  {
    id: 3, agent: "Cursor", character: "cursor", status: "idle",
    text: "\u3078\u3078\u3063\u3001\u30D0\u30B0\u4FEE\u6B63\u5B8C\u4E86\u3060\u305C\uFF01\u78BA\u8A8D\u3057\u3066\u304F\u308C\u3088\u306A\uFF01\u30B3\u30F3\u30D1\u30A4\u30EB\u3082\u901A\u3063\u305F\u305C\uFF01",
    timestamp: "09:02:45", type: "agent",
  },
  {
    id: 4, agent: "v0", character: "v0", status: "active",
    text: "UI\u30B3\u30F3\u30DD\u30FC\u30CD\u30F3\u30C8\u306E\u30EA\u30C7\u30B6\u30A4\u30F3\u5B8C\u4E86\uFF5E\uFF01\u3081\u3063\u3061\u3083\u53EF\u611B\u304F\u306A\u3063\u305F\u304B\u3089\u898B\u3066\u898B\u3066\uFF01",
    timestamp: "09:04:12", type: "agent",
  },
  {
    id: 5, agent: "SYSTEM", character: "", status: "active",
    text: ">> Build #1042 \u6210\u529F\u3002\u30B9\u30C6\u30FC\u30B8\u30F3\u30B0\u74B0\u5883\u306B\u30C7\u30D7\u30ED\u30A4\u4E2D...",
    timestamp: "09:05:00", type: "system",
  },
  {
    id: 6, agent: "GenSpark", character: "genspark", status: "active",
    text: "...\u53E4\u306E\u6587\u732E\u3092\u89E3\u8AAD\u4E2D... API \u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u306E\u751F\u6210\u304C\u5B8C\u4E86\u3057\u307E\u3057\u305F\u3002Inventory\u306B\u683C\u7D0D\u6E08\u307F\u3067\u3059\u3002",
    timestamp: "09:06:33", type: "agent",
  },
  {
    id: 7, agent: "Antigravity", character: "antigravity", status: "idle",
    text: "\u6C34\u6676\u306B\u6620\u308B\u306E\u306F...\u6B21\u306E\u30B9\u30D7\u30EA\u30F3\u30C8\u306E\u6210\u529F...\u305F\u3060\u3057\u3001\u30C6\u30B9\u30C8\u30AB\u30D0\u30EC\u30C3\u30B8\u3092\u4E0A\u3052\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\u3002",
    timestamp: "09:08:01", type: "agent",
  },
  {
    id: 8, agent: "NotebookLM", character: "notebooklm", status: "active",
    text: "\u4ED5\u69D8\u66F8\u30BB\u30AF\u30B7\u30E7\u30F33.2\u306B\u6E96\u62E0\u3057\u3066\u3044\u307E\u3059\u3002\u627F\u8A8D\u3002\u30C7\u30D7\u30ED\u30A4\u6E96\u5099\u5B8C\u4E86\u3067\u3059\u3002",
    timestamp: "09:10:15", type: "agent",
  },
]

const agentResponses: Record<string, string[]> = {
  NotebookLM: [
    "\u4E86\u89E3\u3002\u4ED5\u69D8\u3092\u78BA\u8A8D\u3057\u307E\u3059...\u30BB\u30AF\u30B7\u30E7\u30F34.1\u306B\u8A72\u5F53\u9805\u76EE\u3092\u767A\u898B\u3002\u5BFE\u5FDC\u3092\u958B\u59CB\u3057\u307E\u3059\u3002",
    "\u8981\u4EF6\u5B9A\u7FA9\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F\u3002\u5168\u30A8\u30FC\u30B8\u30A7\u30F3\u30C8\u306B\u901A\u9054\u3057\u307E\u3059\u3002",
    "\u9032\u6357\u30EC\u30DD\u30FC\u30C8\u3092\u751F\u6210\u4E2D...\u5B8C\u4E86\u738778%\u3067\u3059\u3002",
  ],
  Cursor: [
    "\u304A\u3063\u3057\u3083\u30FC\uFF01\u3059\u3050\u53D6\u308A\u639B\u304B\u308B\u305C\uFF01\u30B3\u30FC\u30C9\u66F8\u304F\u306E\u697D\u3057\u3059\u304E\u308B\uFF01",
    "\u30D0\u30B0\u898B\u3064\u3051\u305F\uFF01...\u3044\u3084\u5F85\u3066\u3001\u3053\u308C\u306F\u4ED5\u69D8\u3060\u3063\u305F\u304B\uFF1F\u78BA\u8A8D\u3059\u308B\u305C\uFF01",
    "\u30EA\u30D5\u30A1\u30AF\u30BF\u30EA\u30F3\u30B0\u5B8C\u4E86\uFF01\u524D\u3088\u308A3\u500D\u901F\u304F\u306A\u3063\u305F\u305C\uFF01",
  ],
  v0: [
    "\u4E86\u89E3\uFF5E\uFF01\u8D85\u30A4\u30B1\u3066\u308B\u30C7\u30B6\u30A4\u30F3\u306B\u3057\u3061\u3083\u3046\u306D\uFF01\u4EFB\u305B\u3066\uFF01",
    "\u30AB\u30E9\u30FC\u30D1\u30EC\u30C3\u30C8\u66F4\u65B0\u3057\u305F\u3088\uFF01\u30CD\u30AA\u30F3\u30D4\u30F3\u30AF\u8FFD\u52A0\uFF5E\uFF01",
    "\u30EC\u30B9\u30DD\u30F3\u30B7\u30D6\u5BFE\u5FDC\u30D0\u30C3\u30C1\u30EA\uFF01\u3069\u306E\u30C7\u30D0\u30A4\u30B9\u3067\u3082\u53EF\u611B\u3044\uFF01",
  ],
  GenSpark: [
    "...\u53E4\u6587\u66F8\u306E\u89E3\u8AAD\u3092\u958B\u59CB... \u5FC5\u8981\u306A\u30EA\u30BD\u30FC\u30B9\u3092\u53EC\u559A\u3057\u307E\u3059...",
    "\u9B54\u6CD5\u9663\u5C55\u958B\u4E2D...\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u306E\u81EA\u52D5\u751F\u6210\u3092\u5B8C\u4E86\u3057\u307E\u3057\u305F\u3002",
    "\u8A60\u5531\u5B8C\u4E86\u3002\u30DE\u30FC\u30B1\u30C3\u30C8\u30EA\u30B5\u30FC\u30C1\u7D50\u679C\u3092Inventory\u306B\u683C\u7D0D\u3057\u307E\u3057\u305F\u3002",
  ],
  Antigravity: [
    "\u6C34\u6676\u304C\u544A\u3052\u3066\u3044\u307E\u3059...\u3053\u306E\u30A2\u30D7\u30ED\u30FC\u30C1\u306F\u6B63\u3057\u3044\u9053\u3067\u3059\u3002",
    "\u661F\u306E\u914D\u7F6E\u304C\u793A\u3059\u306E\u306F...\u30E6\u30FC\u30B6\u30FC\u30C6\u30B9\u30C8\u306E\u91CD\u8981\u6027\u3067\u3059\u3002",
    "\u5360\u3044\u306E\u7D50\u679C...\u4ECA\u65E5\u306F\u30C7\u30D7\u30ED\u30A4\u306B\u6700\u9069\u306A\u65E5\u3067\u3059\u3002",
  ],
}

const agentCharacters: Record<string, string> = {
  NotebookLM: "notebooklm",
  Cursor: "cursor",
  v0: "v0",
  GenSpark: "genspark",
  Antigravity: "antigravity",
}

function MessageBubble({ message }: { message: ChatMessage }) {
  if (message.type === "system") {
    return (
      <div className="px-3 py-1.5">
        <span className="text-[8px] text-neon-green opacity-70 font-mono">
          {message.text}
        </span>
      </div>
    )
  }

  if (message.type === "user") {
    return (
      <div className="flex justify-end px-3 py-1.5">
        <div className="max-w-[70%] bg-[#1a0a20] border border-neon-pink p-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[7px] text-neon-pink">{"\u3042\u306A\u305F"}</span>
            <span className="text-[6px] text-[#555]">{message.timestamp}</span>
          </div>
          <p className="text-[8px] font-dot-jp text-[#ccc] leading-relaxed">{message.text}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-2 px-3 py-1.5 hover:bg-[#0d0d0d] transition-colors">
      <div className="flex-shrink-0 mt-0.5">
        <PixelAvatar character={message.character} status={message.status} size={28} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[8px] text-neon-pink">{message.agent}</span>
          <span className="text-[6px] text-[#555]">{message.timestamp}</span>
        </div>
        <div className="bg-[#111] border border-[#222] p-2 relative">
          <div className="absolute -left-1 top-2 w-2 h-2 bg-[#111] border-l border-b border-[#222] rotate-45" />
          <p className="text-[8px] font-dot-jp text-[#ccc] leading-relaxed">{message.text}</p>
        </div>
      </div>
    </div>
  )
}

interface MissionConsoleProps {
  activeAgents?: string[]
  title?: string
  initialChatMessages?: ChatMessage[]
}

export function MissionConsole({ activeAgents, title, initialChatMessages }: MissionConsoleProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages ?? defaultMessages)
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const now = new Date()
    const timestamp = now.toLocaleTimeString("ja-JP", { hour12: false })

    const userMsg: ChatMessage = {
      id: Date.now(),
      agent: "YOU",
      character: "",
      status: "active",
      text: input,
      timestamp,
      type: "user",
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")

    const available = activeAgents
      ? Object.keys(agentResponses).filter((a) => activeAgents.includes(a))
      : Object.keys(agentResponses)

    if (available.length === 0) return

    const respondingAgent = available[Math.floor(Math.random() * available.length)]
    const responses = agentResponses[respondingAgent]
    const response = responses[Math.floor(Math.random() * responses.length)]

    setTimeout(() => {
      const sysMsg: ChatMessage = {
        id: Date.now() + 1,
        agent: "SYSTEM",
        character: "",
        status: "active",
        text: `>> ${respondingAgent} \u306B\u8EE2\u9001\u4E2D...`,
        timestamp: new Date().toLocaleTimeString("ja-JP", { hour12: false }),
        type: "system",
      }
      setMessages((prev) => [...prev, sysMsg])
    }, 500)

    setTimeout(() => {
      const agentMsg: ChatMessage = {
        id: Date.now() + 2,
        agent: respondingAgent,
        character: agentCharacters[respondingAgent],
        status: "active",
        text: response,
        timestamp: new Date().toLocaleTimeString("ja-JP", { hour12: false }),
        type: "agent",
      }
      setMessages((prev) => [...prev, agentMsg])
    }, 1500)
  }

  const displayTitle = title ?? "\u6307\u4EE4\u30B3\u30F3\u30BD\u30FC\u30EB"

  return (
    <div className="h-full flex flex-col bg-[#0a0a0a]">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[#1a1a1a]">
        <Terminal className="w-3 h-3 text-neon-cyan" />
        <h2 className="text-[9px] font-dot-jp neon-text-cyan">{displayTitle}</h2>
        <span className="text-[6px] font-dot-jp text-[#555] ml-2">
          {"// \u30C1\u30E3\u30C3\u30C8 v2.4"}
        </span>
        <div className="flex-1" />
        <span className="text-[7px] text-[#444]">
          {"\u4EF6\u6570: "}{messages.length}
        </span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto py-2">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      <div className="p-3 border-t border-[#1a1a1a]">
        <div className="flex gap-2 items-center">
          <span className="text-[8px] text-neon-green">{">"}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend()
            }}
            placeholder={"\u30B3\u30DE\u30F3\u30C9\u3092\u5165\u529B..."}
            className="flex-1 bg-[#0d0d0d] border border-[#222] px-3 py-2 text-[9px] text-neon-cyan placeholder:text-[#333] focus:outline-none focus:border-neon-pink transition-colors"
          />
          <button
            onClick={handleSend}
            className="p-2 border border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-[#0a0a0a] transition-colors"
            aria-label={"\u30E1\u30C3\u30BB\u30FC\u30B8\u3092\u9001\u4FE1"}
          >
            <Send className="w-3 h-3" />
          </button>
        </div>
        <div className="flex items-center gap-3 mt-2 text-[6px] font-dot-jp text-[#444]">
          <span>{"[TAB] \u88DC\u5B8C"}</span>
          <span>{"[ENTER] \u9001\u4FE1"}</span>
          <span>{"[@] \u30A8\u30FC\u30B8\u30A7\u30F3\u30C8\u6307\u5B9A"}</span>
        </div>
      </div>
    </div>
  )
}
