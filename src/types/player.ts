import type { PlayerInventory } from "./economy";

export interface Player {
  id: string;
  name: string;
  level: number;
  experience: number;
  inventory: PlayerInventory;
  gardenSize: number;
  createdAt: Date;
}
