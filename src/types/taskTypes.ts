export enum TaskType {
  ROUTINE = "routine",
  OCCASIONAL = "ocasional",
  URGENT = "urgent",
  GOAL = "goal",
}

export interface PlantVisuals {
  emoji: string;
  spriteSheet?: string;
  spriteCords?: {
    seed: { x: number; y: number };
    growing: { x: number; y: number };
    mature: { x: number; y: number };
    harvested: { x: number; y: number };
    withered: { x: number; y: number };
  };
  color:string
}

export interface PlantInfo {
  type: TaskType;
  name: string;
  growthTime: number;
  harvestWindow: number;
  fruitValue: number;
  urgentBonus?: number;
  visual: PlantVisuals;
  description: string;
}
