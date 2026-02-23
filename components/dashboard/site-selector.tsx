"use client"

import { useState } from "react"
import { Globe, Plus, FolderTree, ChevronRight, ChevronDown, FileCode, FileText, Image, X } from "lucide-react"

export interface SiteConfig {
  id: string
  name: string
  url?: string
  basePath?: string
}

const defaultSites: SiteConfig[] = [
  { id: "bodoge", name: "\u30DC\u30C9\u30B2\u4F1A\u5834", url: "http://localhost:3001", basePath: "/projects/bodoge" },
  { id: "naritatase", name: "\u6210\u7ACB\u305F\u305B\u5C4B\u672C\u8217", url: "http://localhost:3000", basePath: "/projects/naritatase" },
]

interface FileNode {
  name: string
  type: "file" | "folder"
  children?: FileNode[]
}

const mockFileTree: FileNode[] = [
  {
    name: "src", type: "folder", children: [
      {
        name: "app", type: "folder", children: [
          { name: "page.tsx", type: "file" },
          { name: "layout.tsx", type: "file" },
          { name: "globals.css", type: "file" },
        ]
      },
      {
        name: "components", type: "folder", children: [
          { name: "header.tsx", type: "file" },
          { name: "footer.tsx", type: "file" },
          { name: "card.tsx", type: "file" },
        ]
      },
      { name: "lib", type: "folder", children: [{ name: "utils.ts", type: "file" }] },
    ]
  },
  { name: "package.json", type: "file" },
  { name: "tsconfig.json", type: "file" },
  { name: "README.md", type: "file" },
]

function FileIcon({ name }: { name: string }) {
  if (name.endsWith(".tsx") || name.endsWith(".ts")) return <FileCode className="w-2.5 h-2.5 text-neon-cyan" />
  if (name.endsWith(".css")) return <FileCode className="w-2.5 h-2.5 text-neon-pink" />
  if (name.endsWith(".md")) return <FileText className="w-2.5 h-2.5 text-[#888]" />
  if (name.endsWith(".json")) return <FileText className="w-2.5 h-2.5 text-neon-green" />
  if (name.endsWith(".png") || name.endsWith(".jpg")) return <Image className="w-2.5 h-2.5 text-neon-pink" />
  return <FileText className="w-2.5 h-2.5 text-[#666]" />
}

function TreeNode({ node, depth = 0, selectedFile, onSelectFile }: { node: FileNode; depth?: number; selectedFile: string | null; onSelectFile: (name: string) => void }) {
  const [open, setOpen] = useState(depth < 2)

  if (node.type === "folder") {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1 w-full px-1 py-0.5 hover:bg-[#111] transition-colors text-left"
          style={{ paddingLeft: `${depth * 12 + 4}px` }}
        >
          {open ? <ChevronDown className="w-2.5 h-2.5 text-[#555]" /> : <ChevronRight className="w-2.5 h-2.5 text-[#555]" />}
          <FolderTree className="w-2.5 h-2.5 text-amber-400" />
          <span className="text-[7px] text-[#ccc]">{node.name}</span>
        </button>
        {open && node.children?.map((child, i) => (
          <TreeNode key={i} node={child} depth={depth + 1} selectedFile={selectedFile} onSelectFile={onSelectFile} />
        ))}
      </div>
    )
  }

  const isSelected = selectedFile === node.name
  return (
    <button
      onClick={() => onSelectFile(node.name)}
      className={`flex items-center gap-1 w-full px-1 py-0.5 transition-colors text-left ${isSelected ? "bg-[#1a1a2e] text-neon-cyan" : "hover:bg-[#111] text-[#888]"}`}
      style={{ paddingLeft: `${depth * 12 + 4}px` }}
    >
      <FileIcon name={node.name} />
      <span className="text-[7px]">{node.name}</span>
    </button>
  )
}

interface AddSiteModalProps {
  onClose: () => void
  onAdd: (site: SiteConfig) => void
}

function AddSiteModal({ onClose, onAdd }: AddSiteModalProps) {
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [basePath, setBasePath] = useState("")

  const handleSubmit = () => {
    if (!name.trim()) return
    onAdd({ id: name.toLowerCase().replace(/\s+/g, "-"), name, url: url || undefined, basePath: basePath || undefined })
    onClose()
  }

  return (
    <div className="absolute inset-0 z-50 bg-[#0a0a0a]/90 flex items-center justify-center p-4">
      <div className="border border-neon-cyan bg-[#0d0d0d] p-4 w-full max-w-xs">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[9px] neon-text-cyan font-dot-jp">{"\u30B5\u30A4\u30C8\u3092\u8FFD\u52A0"}</span>
          <button onClick={onClose} className="text-[#555] hover:text-neon-pink transition-colors">
            <X className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-[7px] font-dot-jp text-[#888] block mb-1">{"\u30B5\u30A4\u30C8\u540D"}</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#080808] border border-[#222] px-2 py-1.5 text-[8px] text-[#ccc] focus:outline-none focus:border-neon-cyan" placeholder="\u4F8B: \u30DC\u30C9\u30B2\u4F1A\u5834" />
          </div>
          <div>
            <label className="text-[7px] font-dot-jp text-[#888] block mb-1">{"URL (\u30D7\u30EC\u30D3\u30E5\u30FC\u7528)"}</label>
            <input value={url} onChange={(e) => setUrl(e.target.value)} className="w-full bg-[#080808] border border-[#222] px-2 py-1.5 text-[8px] text-[#ccc] focus:outline-none focus:border-neon-cyan" placeholder="http://localhost:3001" />
          </div>
          <div>
            <label className="text-[7px] font-dot-jp text-[#888] block mb-1">{"\u30B3\u30FC\u30C9\u30D9\u30FC\u30B9\u30D1\u30B9"}</label>
            <input value={basePath} onChange={(e) => setBasePath(e.target.value)} className="w-full bg-[#080808] border border-[#222] px-2 py-1.5 text-[8px] text-[#ccc] focus:outline-none focus:border-neon-cyan" placeholder="/projects/my-site" />
          </div>
          <button onClick={handleSubmit} className="w-full py-1.5 border border-neon-green text-neon-green text-[8px] font-dot-jp hover:bg-neon-green hover:text-[#0a0a0a] transition-colors">{"\u8FFD\u52A0"}</button>
        </div>
      </div>
    </div>
  )
}

interface SiteSelectorProps {
  onSelectFile?: (file: string) => void
  selectedFile?: string | null
  onSelectSite?: (site: SiteConfig) => void
}

export function SiteSelector({ onSelectFile, selectedFile = null, onSelectSite }: SiteSelectorProps) {
  const [sites, setSites] = useState<SiteConfig[]>(defaultSites)
  const [activeSiteId, setActiveSiteId] = useState(defaultSites[0].id)
  const [showAddModal, setShowAddModal] = useState(false)
  const [localSelectedFile, setLocalSelectedFile] = useState<string | null>(selectedFile)

  const activeSite = sites.find((s) => s.id === activeSiteId) ?? sites[0]
  const currentSelected = selectedFile ?? localSelectedFile

  const handleSelectSite = (site: SiteConfig) => {
    setActiveSiteId(site.id)
    onSelectSite?.(site)
  }

  const handleSelectFile = (file: string) => {
    setLocalSelectedFile(file)
    onSelectFile?.(file)
  }

  const handleAddSite = (site: SiteConfig) => {
    setSites((prev) => [...prev, site])
    setActiveSiteId(site.id)
    onSelectSite?.(site)
  }

  return (
    <div className="h-full flex flex-col bg-[#060606] relative">
      {showAddModal && <AddSiteModal onClose={() => setShowAddModal(false)} onAdd={handleAddSite} />}

      <div className="px-3 py-2 border-b border-[#1a1a1a]">
        <div className="flex items-center gap-1.5 mb-2">
          <Globe className="w-3 h-3 text-neon-cyan" />
          <span className="text-[8px] neon-text-cyan">SITES</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {sites.map((site) => (
            <button
              key={site.id}
              onClick={() => handleSelectSite(site)}
              className={`px-2 py-0.5 border text-[7px] font-dot-jp transition-colors ${activeSiteId === site.id ? "border-neon-cyan text-neon-cyan bg-[#0a1520]" : "border-[#333] text-[#666] hover:border-[#555]"}`}
            >
              {site.name}
            </button>
          ))}
          <button
            onClick={() => setShowAddModal(true)}
            className="px-2 py-0.5 border border-[#333] text-[7px] text-[#555] hover:border-neon-green hover:text-neon-green transition-colors flex items-center gap-0.5"
          >
            <Plus className="w-2 h-2" />
            <span className="font-dot-jp">{"\u8FFD\u52A0"}</span>
          </button>
        </div>
      </div>

      <div className="px-3 py-1.5 border-b border-[#1a1a1a] flex items-center gap-1.5">
        <FolderTree className="w-2.5 h-2.5 text-amber-400" />
        <span className="text-[7px] text-[#888] font-dot-jp">{activeSite.name}</span>
        {activeSite.basePath && <span className="text-[6px] text-[#444]">{activeSite.basePath}</span>}
      </div>

      <div className="flex-1 overflow-y-auto py-1">
        {mockFileTree.map((node, i) => (
          <TreeNode key={i} node={node} selectedFile={currentSelected} onSelectFile={handleSelectFile} />
        ))}
      </div>

      <div className="px-3 py-1.5 border-t border-[#1a1a1a] text-[6px] text-[#444]">
        <span className="font-dot-jp">{"\u30B5\u30A4\u30C8\u6570: "}{sites.length}</span>
      </div>
    </div>
  )
}
