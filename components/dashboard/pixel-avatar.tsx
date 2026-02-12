"use client"

interface PixelAvatarProps {
  character: string
  status: "active" | "idle" | "error"
  size?: number
}

// 16x16 anime-style bishoujo pixel art
// Each character has big shiny eyes, unique hairstyle, and cute features
const characterPixels: Record<string, { grid: string[][]; baseColor: string }> = {
  // NotebookLM - 司令塔 - Meganekko secretary with blue bob cut and glasses
  notebooklm: {
    baseColor: "#00f0ff",
    grid: [
      ["", "", "", "", "#1a3a5c", "#1a3a5c", "#1a3a5c", "#1a3a5c", "#1a3a5c", "#1a3a5c", "#1a3a5c", "#1a3a5c", "", "", "", ""],
      ["", "", "", "#1a3a5c", "#2a6e9e", "#2a6e9e", "#2a6e9e", "#2a6e9e", "#2a6e9e", "#2a6e9e", "#2a6e9e", "#2a6e9e", "#1a3a5c", "", "", ""],
      ["", "", "#1a3a5c", "#2a6e9e", "#2a6e9e", "#3a8ebe", "#3a8ebe", "#3a8ebe", "#3a8ebe", "#3a8ebe", "#3a8ebe", "#2a6e9e", "#2a6e9e", "#1a3a5c", "", ""],
      ["", "#1a3a5c", "#2a6e9e", "#3a8ebe", "#3a8ebe", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#3a8ebe", "#3a8ebe", "#2a6e9e", "#1a3a5c", ""],
      ["", "#1a3a5c", "#2a6e9e", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#2a6e9e", "#1a3a5c", ""],
      ["", "#1a3a5c", "#3a8ebe", "#ffdcb5", "#88ddff", "#88ddff", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#88ddff", "#88ddff", "#ffdcb5", "#3a8ebe", "#3a8ebe", "#1a3a5c", ""],
      ["", "", "#3a8ebe", "#ffdcb5", "#88ddff", "#003355", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#88ddff", "#003355", "#ffdcb5", "#3a8ebe", "", "", ""],
      ["", "", "#3a8ebe", "#ffdcb5", "#88ddff", "#003355", "#00eeff", "#ffdcb5", "#00eeff", "#88ddff", "#003355", "#ffdcb5", "#3a8ebe", "", "", ""],
      ["", "", "", "#ffdcb5", "#88ddff", "#88ddff", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#88ddff", "#88ddff", "#ffdcb5", "", "", "", ""],
      ["", "", "", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffaaaa", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "", "", "", ""],
      ["", "", "", "", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ff6688", "#ffdcb5", "#ffdcb5", "#ffdcb5", "", "", "", "", ""],
      ["", "", "", "", "", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "", "", "", "", "", ""],
      ["", "", "", "", "#1a1a3a", "#1a1a3a", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#1a1a3a", "#1a1a3a", "", "", "", "", ""],
      ["", "", "", "#1a1a3a", "#1a1a3a", "#ffffff", "#1a1a3a", "#1a1a3a", "#1a1a3a", "#ffffff", "#1a1a3a", "#1a1a3a", "", "", "", ""],
      ["", "", "#1a1a3a", "#1a1a3a", "#ffffff", "#ffffff", "#1a1a3a", "#1a1a3a", "#1a1a3a", "#ffffff", "#ffffff", "#1a1a3a", "#1a1a3a", "", "", ""],
      ["", "", "#1a1a3a", "#ffdcb5", "#1a1a3a", "#1a1a3a", "#1a1a3a", "", "#1a1a3a", "#1a1a3a", "#1a1a3a", "#ffdcb5", "#1a1a3a", "", "", ""],
    ],
  },
  // Cursor - 実装 - Energetic mechanic girl with orange twintails & goggles
  cursor: {
    baseColor: "#39ff14",
    grid: [
      ["", "", "", "#ff8800", "#ff8800", "", "", "", "", "", "", "#ff8800", "#ff8800", "", "", ""],
      ["", "", "#ff8800", "#ffaa33", "#ffaa33", "#ff8800", "", "", "", "", "#ff8800", "#ffaa33", "#ffaa33", "#ff8800", "", ""],
      ["", "", "#ff8800", "#ffaa33", "#ffaa33", "#ffaa33", "#ff8800", "#ff8800", "#ff8800", "#ff8800", "#ffaa33", "#ffaa33", "#ffaa33", "#ff8800", "", ""],
      ["", "", "", "#ff8800", "#ffaa33", "#ffaa33", "#ffaa33", "#ffaa33", "#ffaa33", "#ffaa33", "#ffaa33", "#ffaa33", "#ff8800", "", "", ""],
      ["", "", "#556655", "#556655", "#ffaa33", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffaa33", "#556655", "#556655", "", ""],
      ["", "", "#88ff88", "#556655", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#556655", "#88ff88", "", ""],
      ["", "", "", "#ffdcb5", "#ffdcb5", "#ffffff", "#223322", "#ffdcb5", "#ffdcb5", "#ffffff", "#223322", "#ffdcb5", "#ffdcb5", "", "", ""],
      ["", "", "", "#ffdcb5", "#ffdcb5", "#ffffff", "#223322", "#39ff14", "#39ff14", "#ffffff", "#223322", "#ffdcb5", "#ffdcb5", "", "", ""],
      ["", "", "", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "", "", ""],
      ["", "", "", "", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffaaaa", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "", "", "", ""],
      ["", "", "", "", "", "#ffdcb5", "#ffdcb5", "#ff6666", "#ffdcb5", "#ffdcb5", "#ffdcb5", "", "", "", "", ""],
      ["", "", "", "", "", "", "#ffdcb5", "#ffdcb5", "#ffdcb5", "", "", "", "", "", "", ""],
      ["", "", "", "", "#555555", "#555555", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#555555", "#555555", "", "", "", "", ""],
      ["", "", "", "#555555", "#39ff14", "#555555", "#555555", "#555555", "#555555", "#555555", "#39ff14", "#555555", "", "", "", ""],
      ["", "", "#555555", "#555555", "#555555", "#39ff14", "#555555", "#555555", "#555555", "#39ff14", "#555555", "#555555", "#555555", "", "", ""],
      ["", "", "#555555", "#ffdcb5", "#555555", "#555555", "#555555", "", "#555555", "#555555", "#555555", "#ffdcb5", "#555555", "", "", ""],
    ],
  },
  // v0 - デザイン - Flashy glamorous girl with pink long hair, sparkly
  v0: {
    baseColor: "#ff2d78",
    grid: [
      ["", "", "", "#ff2d78", "#ff2d78", "#ff2d78", "#ff2d78", "#ff2d78", "#ff2d78", "#ff2d78", "#ff2d78", "#ff2d78", "#ff2d78", "", "", ""],
      ["", "", "#ff2d78", "#ff69a8", "#ff69a8", "#ff69a8", "#ff69a8", "#ff69a8", "#ff69a8", "#ff69a8", "#ff69a8", "#ff69a8", "#ff69a8", "#ff2d78", "", ""],
      ["", "#ff2d78", "#ff69a8", "#ff99c8", "#ff99c8", "#ff69a8", "#ff69a8", "#ffffff", "#ff69a8", "#ff69a8", "#ff99c8", "#ff99c8", "#ff69a8", "#ff69a8", "#ff2d78", ""],
      ["", "#ff2d78", "#ff69a8", "#ff69a8", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ff69a8", "#ff69a8", "#ff2d78", ""],
      ["#ff2d78", "#ff69a8", "#ff69a8", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ff69a8", "#ff69a8", "#ff2d78"],
      ["#ff2d78", "#ff69a8", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ff88cc", "#440028", "#ffdcb5", "#ffdcb5", "#ff88cc", "#440028", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ff69a8", "#ff2d78"],
      ["#ff2d78", "#ff69a8", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ff88cc", "#440028", "#ffddee", "#ffddee", "#ff88cc", "#440028", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ff69a8", "#ff2d78"],
      ["", "#ff2d78", "#ff69a8", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ff69a8", "#ff2d78", ""],
      ["", "", "#ff69a8", "#ffdcb5", "#ffaaaa", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffaaaa", "#ffdcb5", "#ff69a8", "", ""],
      ["", "", "", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ff4488", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "", "", "", ""],
      ["", "", "", "", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "", "", "", "", ""],
      ["", "#ff2d78", "", "", "", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "", "", "", "#ff2d78", "", ""],
      ["", "#ff2d78", "#ff69a8", "", "#222", "#222", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#222", "#222", "", "#ff69a8", "#ff2d78", "", ""],
      ["", "#ff2d78", "#ff69a8", "#ff69a8", "#222", "#ff2d78", "#222", "#222", "#222", "#ff2d78", "#222", "#ff69a8", "#ff69a8", "#ff2d78", "", ""],
      ["", "", "#ff2d78", "#ff69a8", "#222", "#222", "#ff2d78", "#222", "#ff2d78", "#222", "#222", "#ff69a8", "#ff2d78", "", "", ""],
      ["", "", "#ff2d78", "#ff69a8", "#ffdcb5", "#222", "#222", "", "#222", "#222", "#ffdcb5", "#ff69a8", "#ff2d78", "", "", ""],
    ],
  },
  // GenSpark - 資料 - Mysterious mage girl with deep purple hood and golden eyes
  genspark: {
    baseColor: "#8b5cf6",
    grid: [
      ["", "", "", "", "#2d1a5e", "#2d1a5e", "#2d1a5e", "#2d1a5e", "#2d1a5e", "#2d1a5e", "#2d1a5e", "#2d1a5e", "", "", "", ""],
      ["", "", "", "#2d1a5e", "#4a2d8a", "#4a2d8a", "#4a2d8a", "#4a2d8a", "#4a2d8a", "#4a2d8a", "#4a2d8a", "#4a2d8a", "#2d1a5e", "", "", ""],
      ["", "", "#2d1a5e", "#4a2d8a", "#6b42c9", "#6b42c9", "#6b42c9", "#6b42c9", "#6b42c9", "#6b42c9", "#6b42c9", "#6b42c9", "#4a2d8a", "#2d1a5e", "", ""],
      ["", "#2d1a5e", "#4a2d8a", "#6b42c9", "#6b42c9", "#6b42c9", "#6b42c9", "#ffdd00", "#6b42c9", "#6b42c9", "#6b42c9", "#6b42c9", "#6b42c9", "#4a2d8a", "#2d1a5e", ""],
      ["", "#2d1a5e", "#4a2d8a", "#9966cc", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#9966cc", "#4a2d8a", "#2d1a5e", ""],
      ["", "#2d1a5e", "#9966cc", "#ffdcb5", "#ffdcb5", "#ffdd00", "#553300", "#ffdcb5", "#ffdcb5", "#ffdd00", "#553300", "#ffdcb5", "#ffdcb5", "#9966cc", "#2d1a5e", ""],
      ["", "", "#9966cc", "#ffdcb5", "#ffdcb5", "#ffdd00", "#553300", "#ffee88", "#ffee88", "#ffdd00", "#553300", "#ffdcb5", "#ffdcb5", "#9966cc", "", ""],
      ["", "", "#4a2d8a", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#4a2d8a", "", ""],
      ["", "", "", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "", "", ""],
      ["", "", "", "", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#cc88aa", "#ffdcb5", "#ffdcb5", "#ffdcb5", "", "", "", "", ""],
      ["", "", "", "", "", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "", "", "", "", "", ""],
      ["", "", "", "#2d1a5e", "#4a2d8a", "#4a2d8a", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#4a2d8a", "#4a2d8a", "#2d1a5e", "", "", "", ""],
      ["", "", "#2d1a5e", "#4a2d8a", "#6b42c9", "#4a2d8a", "#4a2d8a", "#4a2d8a", "#4a2d8a", "#4a2d8a", "#6b42c9", "#4a2d8a", "#2d1a5e", "", "", ""],
      ["", "#2d1a5e", "#4a2d8a", "#6b42c9", "#6b42c9", "#6b42c9", "#4a2d8a", "#4a2d8a", "#4a2d8a", "#6b42c9", "#6b42c9", "#6b42c9", "#4a2d8a", "#2d1a5e", "", ""],
      ["", "#2d1a5e", "#4a2d8a", "#6b42c9", "#6b42c9", "#6b42c9", "#4a2d8a", "", "#4a2d8a", "#6b42c9", "#6b42c9", "#6b42c9", "#4a2d8a", "#2d1a5e", "", ""],
      ["", "", "#2d1a5e", "#ffdcb5", "#4a2d8a", "#4a2d8a", "#2d1a5e", "", "#2d1a5e", "#4a2d8a", "#4a2d8a", "#ffdcb5", "#2d1a5e", "", "", ""],
    ],
  },
  // Antigravity - 相談 - Mysterious witch girl with black hair and purple highlights
  antigravity: {
    baseColor: "#a855f7",
    grid: [
      ["", "", "", "", "", "#1a1a2e", "#1a1a2e", "#1a1a2e", "#1a1a2e", "#1a1a2e", "#1a1a2e", "", "", "", "", ""],
      ["", "", "", "", "#1a1a2e", "#1a1a2e", "#2a1a3e", "#2a1a3e", "#2a1a3e", "#2a1a3e", "#1a1a2e", "#1a1a2e", "", "", "", ""],
      ["", "", "", "#1a1a2e", "#2a1a3e", "#333", "#333", "#a855f7", "#333", "#333", "#333", "#2a1a3e", "#1a1a2e", "", "", ""],
      ["", "", "#1a1a2e", "#333", "#333", "#333", "#333", "#333", "#333", "#333", "#333", "#333", "#333", "#1a1a2e", "", ""],
      ["", "", "#333", "#333", "#333", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#333", "#333", "#333", "", ""],
      ["", "#333", "#333", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#333", "#333", ""],
      ["", "#333", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#cc88ff", "#2a0044", "#ffdcb5", "#ffdcb5", "#cc88ff", "#2a0044", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#333", ""],
      ["", "", "#333", "#ffdcb5", "#ffdcb5", "#cc88ff", "#2a0044", "#dd99ff", "#dd99ff", "#cc88ff", "#2a0044", "#ffdcb5", "#ffdcb5", "#333", "", ""],
      ["", "", "#333", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#333", "", ""],
      ["", "", "", "#333", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffaaaa", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#333", "", "", ""],
      ["", "", "", "", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#bb6699", "#ffdcb5", "#ffdcb5", "#ffdcb5", "", "", "", "", ""],
      ["", "", "", "", "", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#ffdcb5", "", "", "", "", "", ""],
      ["", "#333", "#333", "", "#222", "#222", "#ffdcb5", "#ffdcb5", "#ffdcb5", "#222", "#222", "", "#333", "#333", "", ""],
      ["#333", "#333", "#a855f7", "#333", "#222", "#a855f7", "#222", "#222", "#222", "#a855f7", "#222", "#333", "#a855f7", "#333", "#333", ""],
      ["#333", "#a855f7", "#333", "#333", "#222", "#222", "#a855f7", "#222", "#a855f7", "#222", "#222", "#333", "#333", "#a855f7", "#333", ""],
      ["", "#333", "#333", "", "#ffdcb5", "#222", "#222", "", "#222", "#222", "#ffdcb5", "", "#333", "#333", "", ""],
    ],
  },
}

export function PixelAvatar({ character, status, size = 48 }: PixelAvatarProps) {
  const data = characterPixels[character]
  if (!data) return null

  const gridSize = 16
  const pixelSize = size / gridSize
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
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ imageRendering: "pixelated" }}
        role="img"
        aria-label={`${character} avatar`}
      >
        {data.grid.map((row, y) =>
          row.map((color, x) =>
            color ? (
              <rect
                key={`${x}-${y}`}
                x={x * pixelSize}
                y={y * pixelSize}
                width={pixelSize}
                height={pixelSize}
                fill={color}
              />
            ) : null
          )
        )}
      </svg>
    </div>
  )
}
