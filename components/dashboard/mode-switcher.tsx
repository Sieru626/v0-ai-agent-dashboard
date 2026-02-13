"use client"

import { Monitor, Sparkles, PanelRight } from "lucide-react"

export type ViewMode = "windows" | "hologram" | "slide"

interface ModeOption {
  key: ViewMode
  label: string
  sublabel: string
  icon: typeof Monitor
}

function getModes(): ModeOption[] {
  return [
    { key: "windows", label: "A", sublabel: "\u30A6\u30A3\u30F3\u30C9\u30A6", icon: Monitor },
    { key: "hologram", label: "B", sublabel: "\u30DB\u30ED\u30B0\u30E9\u30E0", icon: Sparkles },
    { key: "slide", label: "C", sublabel: "\u30B9\u30E9\u30A4\u30C9", icon: PanelRight },
  ]
}

export function ModeSwitcher({
  current,
  onChange,
}: {
  current: ViewMode
  onChange: (mode: ViewMode) => void
}) {
  const modes = getModes()

  return (
    <div className="flex items-center gap-1">
      <span className="text-[7px] text-[#555] mr-1">{"\u8868\u793A:"}</span>
      {modes.map((mode) => {
        const Icon = mode.icon
        const isActive = current === mode.key
        return (
          <button
            key={mode.key}
            onClick={() => onChange(mode.key)}
            className={`flex items-center gap-1 px-2 py-1 border text-[7px] transition-all ${
              isActive
                ? "border-neon-pink text-neon-pink bg-[#1a0a15]"
                : "border-[#333] text-[#666] hover:border-neon-cyan hover:text-neon-cyan"
            }`}
          >
            <Icon className="w-2.5 h-2.5" />
            <span>{mode.label}</span>
            <span className={isActive ? "text-neon-pink" : "text-[#555]"}>{mode.sublabel}</span>
          </button>
        )
      })}
    </div>
  )
}
