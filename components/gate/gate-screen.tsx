"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Zap, Lock, ChevronRight } from "lucide-react"
import { PixelAvatar } from "@/components/dashboard/pixel-avatar"

type GatePhase = "idle" | "verifying" | "granted" | "transitioning"

const PASSCODE = "naritat"

export function GateScreen() {
  const [phase, setPhase] = useState<GatePhase>("idle")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [dialogue, setDialogue] = useState("")
  const [dialogueVisible, setDialogueVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setDialogue("...IDを確認します。パスコードを入力してください。")
      setDialogueVisible(true)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (dialogueVisible && inputRef.current) {
      inputRef.current.focus()
    }
  }, [dialogueVisible])

  const handleSubmit = () => {
    if (!password.trim()) return

    setPhase("verifying")
    setDialogue("照合中...")
    setError(false)

    setTimeout(() => {
      if (password === PASSCODE) {
        setPhase("granted")
        setDialogue("認証成功。ようこそ、なりたたせ屋本舗へ。")

        setTimeout(() => {
          setPhase("transitioning")
          setTimeout(() => {
            router.push("/lobby")
          }, 1200)
        }, 1800)
      } else {
        setPhase("idle")
        setError(true)
        setDialogue("認証失敗。パスコードが違います。もう一度お試しください。")
        setPassword("")
      }
    }, 1500)
  }

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

      {/* Background grid effect */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(0,240,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ACCESS GRANTED overlay */}
      {phase === "granted" && (
        <div className="absolute inset-0 z-40 flex items-center justify-center">
          <h2 className="text-lg neon-text-green animate-access-granted tracking-widest">
            {"ACCESS GRANTED"}
          </h2>
        </div>
      )}

      {/* Transition wipe */}
      {phase === "transitioning" && (
        <div className="absolute inset-0 z-50 bg-[#0a0a0a] animate-gate-open" />
      )}

      {/* Logo block */}
      <div className={`flex flex-col items-center gap-6 transition-opacity duration-500 ${phase === "granted" || phase === "transitioning" ? "opacity-0" : "opacity-100"}`}>
        <div className="flex items-center gap-3 animate-fade-up">
          <Zap className="w-6 h-6 text-neon-pink animate-pulse-glow" />
          <h1 className="text-lg neon-text-pink tracking-wider">
            {"なりたたせ屋本舗"}
          </h1>
          <Zap className="w-6 h-6 text-neon-pink animate-pulse-glow" />
        </div>

        <p className="text-[8px] text-neon-cyan opacity-50 tracking-[0.3em] animate-fade-up" style={{ animationDelay: "0.2s" }}>
          {"AI AGENT INTEGRATION SYSTEM"}
        </p>

        {/* NotebookLM dialogue box */}
        {dialogueVisible && (
          <div className="flex items-start gap-3 mt-8 max-w-md animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex-shrink-0">
              <PixelAvatar character="notebooklm" status="active" size={40} />
            </div>
            <div className="bg-[#111] border border-[#222] p-3 relative flex-1">
              <div className="absolute -left-1.5 top-3 w-3 h-3 bg-[#111] border-l border-b border-[#222] rotate-45" />
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[8px] text-neon-pink">{"NotebookLM"}</span>
                <span className="text-[6px] text-[#555]">{"// 秘書"}</span>
              </div>
              <p className={`text-[9px] leading-relaxed ${error ? "text-neon-pink" : "text-[#ccc]"}`}>
                {dialogue}
                {phase === "verifying" && <span className="animate-blink">{"_"}</span>}
              </p>
            </div>
          </div>
        )}

        {/* Password input */}
        {dialogueVisible && phase !== "granted" && phase !== "transitioning" && (
          <div className="flex flex-col items-center gap-3 mt-4 animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <div className="flex items-center gap-2">
              <Lock className="w-3 h-3 text-neon-cyan" />
              <span className="text-[8px] text-neon-cyan">{"PASSCODE:"}</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError(false)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit()
                }}
                disabled={phase === "verifying"}
                placeholder="..."
                className={`bg-[#0d0d0d] border px-4 py-2 text-[10px] text-neon-cyan placeholder:text-[#333] focus:outline-none transition-colors w-48 tracking-widest ${
                  error ? "border-neon-pink" : "border-[#333] focus:border-neon-pink"
                }`}
              />
              <button
                onClick={handleSubmit}
                disabled={phase === "verifying"}
                className="flex items-center gap-1 px-4 py-2 border border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-[#0a0a0a] transition-colors text-[10px] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>{"ENTER"}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            {phase === "verifying" && (
              <div className="flex items-center gap-2 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                <span className="text-[7px] text-neon-cyan animate-blink">{"照合中..."}</span>
              </div>
            )}
          </div>
        )}

        {/* Hint */}
        <p className="text-[6px] text-[#333] mt-8 animate-fade-up" style={{ animationDelay: "0.8s" }}>
          {"// hint: naritat"}
        </p>
      </div>
    </div>
  )
}
