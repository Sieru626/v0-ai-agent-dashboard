"use client"

interface PixelAvatarProps {
  character: string
  status: "active" | "idle" | "error"
  size?: number
}

const characterPixels: Record<string, { grid: string[][]; baseColor: string }> = {
  notebooklm: {
    baseColor: "#00f0ff",
    grid: [
      ["", "", "#333", "#333", "#333", "#333", "", ""],
      ["", "#333", "#ffd1a4", "#ffd1a4", "#ffd1a4", "#ffd1a4", "#333", ""],
      ["#333", "#ffd1a4", "#00f0ff", "#ffd1a4", "#ffd1a4", "#00f0ff", "#ffd1a4", "#333"],
      ["#333", "#ffd1a4", "#00f0ff", "#222", "#222", "#00f0ff", "#ffd1a4", "#333"],
      ["", "#333", "#ffd1a4", "#ffd1a4", "#ffd1a4", "#ffd1a4", "#333", ""],
      ["", "#333", "#ffd1a4", "#c44", "#c44", "#ffd1a4", "#333", ""],
      ["", "", "#333", "#1a1a3a", "#1a1a3a", "#333", "", ""],
      ["", "#333", "#1a1a3a", "#1a1a3a", "#1a1a3a", "#1a1a3a", "#333", ""],
    ],
  },
  cursor: {
    baseColor: "#39ff14",
    grid: [
      ["", "", "#f90", "#f90", "#f90", "#f90", "", ""],
      ["", "#f90", "#ffd1a4", "#ffd1a4", "#ffd1a4", "#ffd1a4", "#f90", ""],
      ["#f90", "#ffd1a4", "#222", "#ffd1a4", "#ffd1a4", "#222", "#ffd1a4", "#f90"],
      ["", "#ffd1a4", "#ffd1a4", "#ffd1a4", "#ffd1a4", "#ffd1a4", "#ffd1a4", ""],
      ["", "", "#ffd1a4", "#c44", "#c44", "#ffd1a4", "", ""],
      ["", "#555", "#555", "#555", "#555", "#555", "#555", ""],
      ["", "#555", "#39ff14", "#555", "#555", "#39ff14", "#555", ""],
      ["", "", "#555", "#555", "#555", "#555", "", ""],
    ],
  },
  v0: {
    baseColor: "#ff2d78",
    grid: [
      ["", "#ff2d78", "#ff2d78", "#ff2d78", "#ff2d78", "#ff2d78", "#ff2d78", ""],
      ["#ff2d78", "#ffd1a4", "#ffd1a4", "#ffd1a4", "#ffd1a4", "#ffd1a4", "#ffd1a4", "#ff2d78"],
      ["#ffd1a4", "#ffd1a4", "#f0f", "#ffd1a4", "#ffd1a4", "#f0f", "#ffd1a4", "#ffd1a4"],
      ["", "#ffd1a4", "#ffd1a4", "#ffd1a4", "#ffd1a4", "#ffd1a4", "#ffd1a4", ""],
      ["", "", "#ffd1a4", "#f0f", "#f0f", "#ffd1a4", "", ""],
      ["", "#ff2d78", "#ff2d78", "#ff2d78", "#ff2d78", "#ff2d78", "#ff2d78", ""],
      ["", "#ff2d78", "#ffd1a4", "#ff2d78", "#ff2d78", "#ffd1a4", "#ff2d78", ""],
      ["", "", "#ff2d78", "#ff2d78", "#ff2d78", "#ff2d78", "", ""],
    ],
  },
  genspark: {
    baseColor: "#8b5cf6",
    grid: [
      ["", "", "#4a2d8a", "#4a2d8a", "#4a2d8a", "#4a2d8a", "", ""],
      ["", "#4a2d8a", "#4a2d8a", "#4a2d8a", "#4a2d8a", "#4a2d8a", "#4a2d8a", ""],
      ["#4a2d8a", "#4a2d8a", "#ff0", "#4a2d8a", "#4a2d8a", "#ff0", "#4a2d8a", "#4a2d8a"],
      ["#4a2d8a", "#ffd1a4", "#ffd1a4", "#ffd1a4", "#ffd1a4", "#ffd1a4", "#ffd1a4", "#4a2d8a"],
      ["", "#4a2d8a", "#ffd1a4", "#ffd1a4", "#ffd1a4", "#ffd1a4", "#4a2d8a", ""],
      ["", "", "#4a2d8a", "#4a2d8a", "#4a2d8a", "#4a2d8a", "", ""],
      ["", "#4a2d8a", "#4a2d8a", "#4a2d8a", "#4a2d8a", "#4a2d8a", "#4a2d8a", ""],
      ["", "#4a2d8a", "", "#4a2d8a", "#4a2d8a", "", "#4a2d8a", ""],
    ],
  },
  antigravity: {
    baseColor: "#a855f7",
    grid: [
      ["", "#222", "#222", "#222", "#222", "#222", "#222", ""],
      ["#222", "#222", "#222", "#222", "#222", "#222", "#222", "#222"],
      ["#222", "#ffd1a4", "#a855f7", "#ffd1a4", "#ffd1a4", "#a855f7", "#ffd1a4", "#222"],
      ["", "#ffd1a4", "#ffd1a4", "#ffd1a4", "#ffd1a4", "#ffd1a4", "#ffd1a4", ""],
      ["", "", "#ffd1a4", "#a855f7", "#a855f7", "#ffd1a4", "", ""],
      ["", "#222", "#222", "#222", "#222", "#222", "#222", ""],
      ["", "#222", "#ffd1a4", "#222", "#222", "#ffd1a4", "#222", ""],
      ["", "", "#222", "#222", "#222", "#222", "", ""],
    ],
  },
}

export function PixelAvatar({ character, status, size = 48 }: PixelAvatarProps) {
  const data = characterPixels[character]
  if (!data) return null

  const pixelSize = size / 8
  const borderColorClass =
    status === "active"
      ? "neon-border-green"
      : status === "error"
        ? "neon-border-pink"
        : "neon-border-cyan"

  return (
    <div
      className={`pixel-border ${borderColorClass} p-1 inline-block ${status === "active" ? "animate-status-pulse" : ""}`}
      style={{ lineHeight: 0 }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ imageRendering: "pixelated" }}
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
