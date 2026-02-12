"use client"

import Image from "next/image"

interface PixelAvatarProps {
  character: string
  status: "active" | "idle" | "error"
  size?: number
}

const avatarPaths: Record<string, string> = {
  notebooklm: "/avatars/notebooklm.jpg",
  cursor: "/avatars/cursor.jpg",
  v0: "/avatars/v0.jpg",
  genspark: "/avatars/genspark.jpg",
  antigravity: "/avatars/antigravity.jpg",
}

const characterNames: Record<string, string> = {
  notebooklm: "NotebookLM",
  cursor: "Cursor",
  v0: "v0",
  genspark: "GenSpark",
  antigravity: "Antigravity",
}

export function PixelAvatar({ character, status, size = 48 }: PixelAvatarProps) {
  const src = avatarPaths[character]
  if (!src) return null

  const borderColorClass =
    status === "active"
      ? "neon-border-green"
      : status === "error"
        ? "neon-border-pink"
        : "neon-border-cyan"

  return (
    <div
      className={`pixel-border ${borderColorClass} p-0.5 inline-block ${status === "active" ? "animate-float" : ""}`}
      style={{ lineHeight: 0 }}
    >
      <Image
        src={src}
        alt={`${characterNames[character] ?? character} avatar`}
        width={size}
        height={size}
        className="block"
        style={{ imageRendering: "pixelated" }}
        unoptimized
      />
    </div>
  )
}
