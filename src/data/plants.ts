import { TaskType, type PlantInfo } from "../types";

export const PLANT_DATABASE: Record<TaskType, PlantInfo> = {
  [TaskType.ROUTINE]: {
    type: TaskType.ROUTINE,
    name: "Albahaca",
    growthTime: 3,
    harvestWindow: 2,
    fruitValue: 10,
    visual: {
      emoji: "🌿",
      color: "#4CAF50",
    },
    description: "Hierba aromatica",
  },
  [TaskType.GOAL]: {
    type: TaskType.GOAL,
    name: "Manzano",
    growthTime: 14,
    harvestWindow: 7,
    fruitValue: 100,
    visual: {
      emoji: '🌳',
      color: '#8B4513'
    },
    description: "Arbol frutal",
  },
  [TaskType.OCCASIONAL]: {
    type: TaskType.OCCASIONAL,
    name: "Girasol",
    growthTime: 5,
    harvestWindow: 5,
    fruitValue: 25,
    visual: {
      emoji: '🌻',
      color: '#FFD700'
    },
    description: "Flor brillante",
  },
  [TaskType.URGENT]: {
    type: TaskType.URGENT,
    name: "Rábano",
    growthTime: 1,
    harvestWindow: 1,
    fruitValue: 15,
    urgentBonus: 10,
    visual: {
      emoji: '🥬',
      color: '#90EE90'
    },
    description: "Vegetal de crecimiento rapido",
  },
};

export const getPlantInfo = (taskType: TaskType): PlantInfo => {
  return PLANT_DATABASE[taskType];
};
