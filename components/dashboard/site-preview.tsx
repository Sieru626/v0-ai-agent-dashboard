"use client"

import { useState } from "react"
import { Globe, Code, ExternalLink, RefreshCw } from "lucide-react"
import type { SiteConfig } from "./site-selector"

const mockCodeContent: Record<string, string> = {
  "page.tsx": `export default function Page() {
  return (
    <main className="min-h-screen">
      <h1>Welcome</h1>
      <p>This is the main page.</p>
    </main>
  )
}`,
  "layout.tsx": `import './globals.css'

export const metadata = {
  title: 'My Site',
}

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}`,
  "globals.css": `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground: #ededed;
  --background: #0a0a0a;
}`,
  "header.tsx": `export function Header() {
  return (
    <header className="border-b p-4">
      <nav>Navigation here</nav>
    </header>
  )
}`,
}

interface SitePreviewProps {
  site?: SiteConfig | null
  selectedFile?: string | null
}

export function SitePreview({ site, selectedFile }: SitePreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview")
  const codeContent = selectedFile ? mockCodeContent[selectedFile] ?? `// ${selectedFile}\n// No preview available` : null

  return (
    <div className="h-full flex flex-col bg-[#060606]">
      <div className="flex items-center gap-1 px-3 py-1.5 border-b border-[#1a1a1a]">
        <button
          onClick={() => setActiveTab("preview")}
          className={`flex items-center gap-1 px-2 py-0.5 border text-[7px] transition-colors ${activeTab === "preview" ? "border-neon-pink text-neon-pink bg-[#1a0a15]" : "border-[#333] text-[#666] hover:border-[#555]"}`}
        >
          <Globe className="w-2.5 h-2.5" />
          <span className="font-dot-jp">{"\u30D7\u30EC\u30D3\u30E5\u30FC"}</span>
        </button>
        <button
          onClick={() => setActiveTab("code")}
          className={`flex items-center gap-1 px-2 py-0.5 border text-[7px] transition-colors ${activeTab === "code" ? "border-neon-cyan text-neon-cyan bg-[#0a1520]" : "border-[#333] text-[#666] hover:border-[#555]"}`}
        >
          <Code className="w-2.5 h-2.5" />
          <span className="font-dot-jp">{"\u30B3\u30FC\u30C9"}</span>
        </button>
        <div className="flex-1" />
        {activeTab === "preview" && site?.url && (
          <div className="flex items-center gap-1.5">
            <span className="text-[6px] text-[#555]">{site.url}</span>
            <button className="text-[#555] hover:text-neon-cyan transition-colors">
              <RefreshCw className="w-2.5 h-2.5" />
            </button>
            <button className="text-[#555] hover:text-neon-cyan transition-colors">
              <ExternalLink className="w-2.5 h-2.5" />
            </button>
          </div>
        )}
        {activeTab === "code" && selectedFile && (
          <span className="text-[7px] text-neon-cyan">{selectedFile}</span>
        )}
      </div>

      <div className="flex-1 min-h-0">
        {activeTab === "preview" ? (
          site?.url ? (
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between px-3 py-1 bg-[#111] border-b border-[#222]">
                <span className="text-[7px] text-[#888]">{site.url}</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-neon-pink" />
                  <div className="w-2 h-2 rounded-full bg-neon-cyan" />
                  <div className="w-2 h-2 rounded-full bg-neon-green" />
                </div>
              </div>
              <div className="flex-1 bg-[#080808] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-center">
                  <Globe className="w-8 h-8 text-[#333]" />
                  <div>
                    <p className="text-[9px] font-dot-jp text-[#666]">{site.name}</p>
                    <p className="text-[7px] text-[#444] mt-1">{site.url}</p>
                  </div>
                  <p className="text-[7px] font-dot-jp text-[#555]">{"\u30ED\u30FC\u30AB\u30EB\u3067iframe\u8868\u793A\u3055\u308C\u307E\u3059"}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Globe className="w-6 h-6 text-[#333] mx-auto mb-2" />
                <p className="text-[8px] font-dot-jp text-[#555]">{"\u30B5\u30A4\u30C8\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044"}</p>
              </div>
            </div>
          )
        ) : (
          <div className="h-full overflow-auto p-3">
            {codeContent ? (
              <pre className="text-[8px] leading-relaxed font-mono">
                {codeContent.split("\n").map((line, i) => (
                  <div key={i} className="flex">
                    <span className="w-6 text-right pr-2 text-[#333] select-none">{i + 1}</span>
                    <span className={
                      line.trimStart().startsWith("//") || line.trimStart().startsWith("/*")
                        ? "text-[#666]"
                        : line.includes("import") || line.includes("export") || line.includes("return") || line.includes("function")
                          ? "text-neon-pink"
                          : line.includes("<") || line.includes("/>")
                            ? "text-neon-cyan"
                            : line.includes("const") || line.includes("let") || line.includes("var")
                              ? "text-neon-green"
                              : "text-[#ccc]"
                    }>
                      {line || "\u00a0"}
                    </span>
                  </div>
                ))}
              </pre>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-[8px] font-dot-jp text-[#555]">{"\u30D5\u30A1\u30A4\u30EB\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044"}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
