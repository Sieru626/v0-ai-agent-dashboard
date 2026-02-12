export interface InventoryItem {
  id: number
  name: string
  type: "code" | "map" | "design" | "doc"
  agent: string
  rarity: "common" | "rare" | "epic" | "legendary"
  timestamp: string
}

export const inventoryItems: InventoryItem[] = [
  {
    id: 1,
    name: "auth-module.ts",
    type: "code",
    agent: "Cursor",
    rarity: "rare",
    timestamp: "09:02",
  },
  {
    id: 2,
    name: "dashboard-ui.fig",
    type: "design",
    agent: "v0",
    rarity: "epic",
    timestamp: "09:04",
  },
  {
    id: 3,
    name: "system-map.svg",
    type: "map",
    agent: "GenSpark",
    rarity: "rare",
    timestamp: "09:06",
  },
  {
    id: 4,
    name: "api-docs.md",
    type: "doc",
    agent: "GenSpark",
    rarity: "common",
    timestamp: "09:06",
  },
  {
    id: 5,
    name: "forecast.json",
    type: "doc",
    agent: "Antigravity",
    rarity: "legendary",
    timestamp: "09:08",
  },
  {
    id: 6,
    name: "spec-v3.2.pdf",
    type: "doc",
    agent: "NotebookLM",
    rarity: "epic",
    timestamp: "09:10",
  },
]
