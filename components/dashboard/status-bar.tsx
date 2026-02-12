"use client"

import { Activity, HardDrive, Clock, Flame } from "lucide-react"

export function StatusBar() {
  return (
    <footer className="flex items-center justify-between px-4 py-1.5 border-t border-[#1a1a1a] bg-[#060606] text-[7px]">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-neon-cyan">
          <Activity className="w-2.5 h-2.5" />
          <span>{'UPTIME: 99.97%'}</span>
        </div>
        <div className="flex items-center gap-1 text-[#555]">
          <HardDrive className="w-2.5 h-2.5" />
          <span>{'MEM: 4.2GB / 8GB'}</span>
        </div>
        <div className="flex items-center gap-1 text-[#555]">
          <Clock className="w-2.5 h-2.5" />
          <span>{'LATENCY: 12ms'}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-neon-green">
          <Flame className="w-2.5 h-2.5" />
          <span>{'STREAK: 7 DAYS'}</span>
        </div>
        <span className="text-[#444]">
          {'なりたたせ屋本舗 v2.4.0 // Powered by AI Sisters'}
        </span>
      </div>
    </footer>
  )
}
