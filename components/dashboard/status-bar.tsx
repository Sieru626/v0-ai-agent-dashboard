import { Activity, HardDrive, Clock, Flame } from "lucide-react"

export function StatusBar() {
  return (
    <footer className="flex items-center justify-between px-4 py-1.5 border-t border-[#1a1a1a] bg-[#060606] text-[7px]">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-neon-cyan">
          <Activity className="w-2.5 h-2.5" />
          <span>{"\u7A3C\u50CD\u7387: 99.97%"}</span>
        </div>
        <div className="flex items-center gap-1 text-[#555]">
          <HardDrive className="w-2.5 h-2.5" />
          <span>{"MEM: 4.2GB / 8GB"}</span>
        </div>
        <div className="flex items-center gap-1 text-[#555]">
          <Clock className="w-2.5 h-2.5" />
          <span>{"\u9045\u5EF6: 12ms"}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-neon-green">
          <Flame className="w-2.5 h-2.5" />
          <span>{"\u9023\u7D9A\u7A3C\u50CD: 7\u65E5"}</span>
        </div>
        <span className="text-[#444]">
          {"\u306A\u308A\u305F\u305F\u305B\u5C4B\u672C\u8217 v2.4.0 // AI\u59C9\u59B9\u304C\u52D5\u304B\u3057\u3066\u3044\u307E\u3059"}
        </span>
      </div>
    </footer>
  )
}
