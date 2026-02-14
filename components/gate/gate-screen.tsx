"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Zap, Lock, ChevronRight } from "lucide-react"
import { PixelAvatar } from "@/components/dashboard/pixel-avatar"

type GatePhase = "idle" | "verifying" | "granted" | "transitioning"

const PASSCODE = "Sieru626"

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
      setDialogue("...ID\u3092\u78BA\u8A8D\u3057\u307E\u3059\u3002\u30D1\u30B9\u30B3\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002")
      setDialogueVisible(true)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (dialogueVisible && inputRef.current) inputRef.current.focus()
  }, [dialogueVisible])

  const handleSubmit = () => {
    if (!password.trim()) return
    setPhase("verifying")
    setDialogue("\u7167\u5408\u4E2D...")
    setError(false)
    setTimeout(() => {
      if (password === PASSCODE) {
        setPhase("granted")
        setDialogue("\u8A8D\u8A3C\u6210\u529F\u3002\u3088\u3046\u3053\u305D\u3001\u6210\u7ACB\u305F\u305B\u5C4B\u672C\u8217\u3078\u3002")
        setTimeout(() => { setPhase("transitioning"); setTimeout(() => router.push("/lobby"), 1200) }, 1800)
      } else {
        setPhase("idle")
        setError(true)
        setDialogue("\u8A8D\u8A3C\u5931\u6557\u3002\u30D1\u30B9\u30B3\u30FC\u30C9\u304C\u9055\u3044\u307E\u3059\u3002\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002")
        setPassword("")
      }
    }, 1500)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0a0a0a] relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.15) 2px, rgba(0,240,255,0.15) 4px)" }} />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(0,240,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.3) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {phase === "granted" && (
        <div className="absolute inset-0 z-40 flex items-center justify-center">
          <h2 className="text-lg neon-text-green animate-access-granted tracking-widest">{"ACCESS GRANTED"}</h2>
        </div>
      )}
      {phase === "transitioning" && <div className="absolute inset-0 z-50 bg-[#0a0a0a] animate-gate-open" />}

      <div className={`flex flex-col items-center gap-6 transition-opacity duration-500 ${phase === "granted" || phase === "transitioning" ? "opacity-0" : "opacity-100"}`}>
        <div className="flex items-center gap-3 animate-fade-up">
          <Zap className="w-6 h-6 text-neon-pink animate-pulse-glow" />
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-xl neon-text-pink tracking-[0.2em] animate-flicker" style={{ textShadow: "0 0 10px #ff2d78, 0 0 30px #ff2d78, 0 0 60px #ff2d78, 0 0 80px #ff2d78" }}>{"\u6210\u7ACB\u305F\u305B\u5C4B\u672C\u8217"}</h1>
            <span className="text-[7px] text-neon-cyan tracking-[0.5em] opacity-70">{"NARITATASE-YA"}</span>
          </div>
          <Zap className="w-6 h-6 text-neon-pink animate-pulse-glow" />
        </div>
        <p className="text-[8px] text-neon-cyan opacity-50 tracking-[0.3em] animate-fade-up" style={{ animationDelay: "0.2s" }}>{"AI AGENT INTEGRATION SYSTEM"}</p>

        {dialogueVisible && (
          <div className="flex items-start gap-3 mt-8 max-w-md animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex-shrink-0"><PixelAvatar character="notebooklm" status="active" size={40} /></div>
            <div className="bg-[#111] border border-[#222] p-3 relative flex-1">
              <div className="absolute -left-1.5 top-3 w-3 h-3 bg-[#111] border-l border-b border-[#222] rotate-45" />
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[8px] text-neon-pink">{"NotebookLM"}</span>
                <span className="text-[6px] text-[#555]">{"// \u79D8\u66F8"}</span>
              </div>
              <p className={`text-[9px] leading-relaxed ${error ? "text-neon-pink" : "text-[#ccc]"}`}>
                {dialogue}
                {phase === "verifying" && <span className="animate-blink">{"_"}</span>}
              </p>
            </div>
          </div>
        )}

        {dialogueVisible && phase !== "granted" && phase !== "transitioning" && (
          <div className="flex flex-col items-center gap-3 mt-4 animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <div className="flex items-center gap-2">
              <Lock className="w-3 h-3 text-neon-cyan" />
              <span className="text-[8px] text-neon-cyan">{"PASSCODE:"}</span>
            </div>
            <div className="flex items-center gap-2">
              <input ref={inputRef} type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(false) }} onKeyDown={(e) => { if (e.key === "Enter") handleSubmit() }} disabled={phase === "verifying"} placeholder="..." className={`bg-[#0d0d0d] border px-4 py-2 text-[10px] text-neon-cyan placeholder:text-[#333] focus:outline-none transition-colors w-48 tracking-widest ${error ? "border-neon-pink" : "border-[#333] focus:border-neon-pink"}`} />
              <button onClick={handleSubmit} disabled={phase === "verifying"} className="flex items-center gap-1 px-4 py-2 border border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-[#0a0a0a] transition-colors text-[10px] disabled:opacity-40 disabled:cursor-not-allowed">
                <span>{"ENTER"}</span><ChevronRight className="w-3 h-3" />
              </button>
            </div>
            {phase === "verifying" && (
              <div className="flex items-center gap-2 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                <span className="text-[7px] text-neon-cyan animate-blink">{"\u7167\u5408\u4E2D..."}</span>
              </div>
            )}
          </div>
        )}

        <p className="text-[6px] text-[#333] mt-8 animate-fade-up" style={{ animationDelay: "0.8s" }}>{"// THE 5 SISTERS SYSTEM"}</p>
      </div>
    </div>
  )
}
