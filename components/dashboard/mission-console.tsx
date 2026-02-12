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

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    agent: "SYSTEM",
    character: "",
    status: "active",
    text: ">> 指令コンソール v2.4 起動完了。全エージェント接続済み。",
    timestamp: "09:00:00",
    type: "system",
  },
  {
    id: 2,
    agent: "NotebookLM",
    character: "notebooklm",
    status: "active",
    text: "仕様書セクション3.2を確認しました。全項目クリアです。次のフェーズに進行できます。",
    timestamp: "09:01:23",
    type: "agent",
  },
  {
    id: 3,
    agent: "Cursor",
    character: "cursor",
    status: "idle",
    text: "へへっ、バグ修正完了だぜ！確認してくれよな！コンパイルも通ったぜ！",
    timestamp: "09:02:45",
    type: "agent",
  },
  {
    id: 4,
    agent: "v0",
    character: "v0",
    status: "active",
    text: "UIコンポーネントのリデザイン完了〜！めっちゃ可愛くなったから見て見て！",
    timestamp: "09:04:12",
    type: "agent",
  },
  {
    id: 5,
    agent: "SYSTEM",
    character: "",
    status: "active",
    text: ">> Build #1042 成功。ステージング環境にデプロイ中...",
    timestamp: "09:05:00",
    type: "system",
  },
  {
    id: 6,
    agent: "GenSpark",
    character: "genspark",
    status: "active",
    text: "...古の文献を解読中... API ドキュメントの生成が完了しました。Inventoryに格納済みです。",
    timestamp: "09:06:33",
    type: "agent",
  },
  {
    id: 7,
    agent: "Antigravity",
    character: "antigravity",
    status: "idle",
    text: "水晶に映るのは...次のスプリントの成功...ただし、テストカバレッジを上げる必要があります。",
    timestamp: "09:08:01",
    type: "agent",
  },
  {
    id: 8,
    agent: "NotebookLM",
    character: "notebooklm",
    status: "active",
    text: "仕様書セクション3.2に準拠しています。承認。デプロイ準備完了です。",
    timestamp: "09:10:15",
    type: "agent",
  },
]

const agentResponses: Record<string, string[]> = {
  NotebookLM: [
    "了解。仕様を確認します...セクション4.1に該当項目を発見。対応を開始します。",
    "要件定義を更新しました。全エージェントに通達します。",
    "進捗レポートを生成中...完了率78%です。",
  ],
  Cursor: [
    "おっしゃー！すぐ取り掛かるぜ！コード書くの楽しすぎる！",
    "バグ見つけた！...いや待て、これは仕様だったか？確認するぜ！",
    "リファクタリング完了！前より3倍速くなったぜ！",
  ],
  v0: [
    "了解〜！超イケてるデザインにしちゃうね！任せて！",
    "カラーパレット更新したよ！ネオンピンク追加〜！",
    "レスポンシブ対応バッチリ！どのデバイスでも可愛い！",
  ],
  GenSpark: [
    "...古文書の解読を開始... 必要なリソースを召喚します...",
    "魔法陣展開中...ドキュメントの自動生成を完了しました。",
    "詠唱完了。マーケットリサーチ結果をInventoryに格納しました。",
  ],
  Antigravity: [
    "水晶が告げています...このアプローチは正しい道です。",
    "星の配置が示すのは...ユーザーテストの重要性です。",
    "占いの結果...今日はデプロイに最適な日です。",
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
            <span className="text-[7px] text-neon-pink">{'あなた'}</span>
            <span className="text-[6px] text-[#555]">{message.timestamp}</span>
          </div>
          <p className="text-[8px] text-[#ccc] leading-relaxed">{message.text}</p>
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
          <p className="text-[8px] text-[#ccc] leading-relaxed">{message.text}</p>
        </div>
      </div>
    </div>
  )
}

export function MissionConsole() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
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

    // Simulate agent responses
    const agentNames = Object.keys(agentResponses)
    const respondingAgent = agentNames[Math.floor(Math.random() * agentNames.length)]
    const responses = agentResponses[respondingAgent]
    const response = responses[Math.floor(Math.random() * responses.length)]

    setTimeout(() => {
      const sysMsg: ChatMessage = {
        id: Date.now() + 1,
        agent: "SYSTEM",
        character: "",
        status: "active",
        text: `>> ${respondingAgent} に転送中...`,
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

  return (
    <div className="h-full flex flex-col bg-[#0a0a0a]">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[#1a1a1a]">
        <Terminal className="w-3 h-3 text-neon-cyan" />
        <h2 className="text-[9px] neon-text-cyan">{'指令コンソール'}</h2>
        <span className="text-[6px] text-[#555] ml-2">
          {'// チャット v2.4'}
        </span>
        <div className="flex-1" />
        <span className="text-[7px] text-[#444]">
          {'件数: '}{messages.length}
        </span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto py-2">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      <div className="p-3 border-t border-[#1a1a1a]">
        <div className="flex gap-2 items-center">
          <span className="text-[8px] text-neon-green">{'>'}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend()
            }}
            placeholder="コマンドを入力..."
            className="flex-1 bg-[#0d0d0d] border border-[#222] px-3 py-2 text-[9px] text-neon-cyan placeholder:text-[#333] focus:outline-none focus:border-neon-pink transition-colors"
          />
          <button
            onClick={handleSend}
            className="p-2 border border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-[#0a0a0a] transition-colors"
            aria-label="メッセージを送信"
          >
            <Send className="w-3 h-3" />
          </button>
        </div>
        <div className="flex items-center gap-3 mt-2 text-[6px] text-[#444]">
          <span>{'[TAB] 補完'}</span>
          <span>{'[ENTER] 送信'}</span>
          <span>{'[@] エージェント指定'}</span>
        </div>
      </div>
    </div>
  )
}
