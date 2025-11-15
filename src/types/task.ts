import { TaskType } from "./taskTypes";

export interface Task {
  id: string;
  title: string;
  description?: string;
  type: TaskType;
  completed: boolean;

  isRecurring: boolean;
  completions: Date[];
  currentGrowthDays: number;

  plantStage: PlantStage;
  plantedAt: Date;
  maturedAt?: Date;
  lastHarvestedAt?: Date;
  harvestableUntil?: Date;

  gardenPosition: number;

  createdAt: Date;
  completedAt?: Date;
  
}

export enum PlantStage {
  SEED = "seed", //Plantada
  GROWING = "growing", //Desarrollo
  MATURE = "mature", //Lista para recoger
  HARVESTED = "harvested", //Ya Recogida(Status de control)
  WITHERED = "withered", //Marchita
}
