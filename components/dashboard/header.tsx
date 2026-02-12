"use client"

import { useEffect, useState } from "react"
import { Shield, Wifi, Cpu, Zap } from "lucide-react"

export function DashboardHeader() {
  const [timeStr, setTimeStr] = useState("")
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const update = () => {
      setTimeStr(new Date().toLocaleTimeString("ja-JP", { hour12: false }))
      setTick((t) => t + 1)
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="flex items-center justify-between px-4 py-2 border-b-2 neon-border-pink bg-[#0a0a0a]">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-neon-pink animate-pulse-glow" />
          <h1 className="text-sm neon-text-pink tracking-wider">
            {'なりたたせ屋本舗'}
          </h1>
        </div>
        <span className="text-[8px] text-neon-cyan opacity-60">
          {'// AI姉妹司令室'}
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-[8px]">
          <div className="flex items-center gap-1 text-neon-green">
            <Shield className="w-3 h-3" />
            <span>{'SEC: OK'}</span>
          </div>
          <div className="flex items-center gap-1 text-neon-cyan">
            <Wifi className="w-3 h-3" />
            <span>{'NET: 100%'}</span>
          </div>
          <div className="flex items-center gap-1 text-neon-pink">
            <Cpu className="w-3 h-3" />
            <span>{'CPU: 42%'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full bg-neon-green ${
              tick % 2 === 0 ? "opacity-100" : "opacity-40"
            }`}
          />
          <span className="text-[10px] neon-text-green animate-blink">
            {'ONLINE'}
          </span>
        </div>

        <span className="text-[10px] text-neon-cyan font-mono tabular-nums">
          {timeStr}
        </span>
      </div>
    </header>
  )
}
